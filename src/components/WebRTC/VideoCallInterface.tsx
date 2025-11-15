import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, MessageSquare } from 'lucide-react';
import { useSocket } from '../../hooks/useSocket';

interface VideoCallInterfaceProps {
  roomId: string;
  onEndCall: () => void;
}

export function VideoCallInterface({ roomId, onEndCall }: VideoCallInterfaceProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    initializeWebRTC();
    
    socket.emit('webrtc:join-room', roomId);

    // WebRTC signaling handlers
    socket.on('webrtc:user-joined', handleUserJoined);
    socket.on('webrtc:offer', handleOffer);
    socket.on('webrtc:answer', handleAnswer);
    socket.on('webrtc:ice-candidate', handleIceCandidate);
    socket.on('webrtc:user-left', handleUserLeft);

    return () => {
      cleanup();
      socket.off('webrtc:user-joined');
      socket.off('webrtc:offer');
      socket.off('webrtc:answer');
      socket.off('webrtc:ice-candidate');
      socket.off('webrtc:user-left');
    };
  }, [socket, roomId]);

  const initializeWebRTC = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ]
      };

      peerConnectionRef.current = new RTCPeerConnection(configuration);

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnectionRef.current!.addTrack(track, stream);
      });

      // Handle remote stream
      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
          setIsConnected(true);
        }
      };

      // Handle ICE candidates
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate && socket) {
          socket.emit('webrtc:ice-candidate', {
            roomId,
            candidate: event.candidate,
            targetUserId: 'remote'
          });
        }
      };

    } catch (error) {
      console.error('Failed to initialize WebRTC:', error);
    }
  };

  const handleUserJoined = async (data: { userId: string; socketId: string }) => {
    if (!peerConnectionRef.current || !socket) return;

    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      
      socket.emit('webrtc:offer', {
        roomId,
        offer,
        targetUserId: data.userId
      });
    } catch (error) {
      console.error('Failed to create offer:', error);
    }
  };

  const handleOffer = async (data: { offer: RTCSessionDescriptionInit; fromUserId: string }) => {
    if (!peerConnectionRef.current || !socket) return;

    try {
      await peerConnectionRef.current.setRemoteDescription(data.offer);
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      
      socket.emit('webrtc:answer', {
        roomId,
        answer,
        targetUserId: data.fromUserId
      });
    } catch (error) {
      console.error('Failed to handle offer:', error);
    }
  };

  const handleAnswer = async (data: { answer: RTCSessionDescriptionInit; fromUserId: string }) => {
    if (!peerConnectionRef.current) return;

    try {
      await peerConnectionRef.current.setRemoteDescription(data.answer);
    } catch (error) {
      console.error('Failed to handle answer:', error);
    }
  };

  const handleIceCandidate = async (data: { candidate: RTCIceCandidateInit; fromUserId: string }) => {
    if (!peerConnectionRef.current) return;

    try {
      await peerConnectionRef.current.addIceCandidate(data.candidate);
    } catch (error) {
      console.error('Failed to handle ICE candidate:', error);
    }
  };

  const handleUserLeft = () => {
    setIsConnected(false);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn;
        setIsVideoOn(!isVideoOn);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioOn;
        setIsAudioOn(!isAudioOn);
      }
    }
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (socket) {
      socket.emit('webrtc:leave-room', roomId);
    }
  };

  const handleEndCall = () => {
    cleanup();
    onEndCall();
  };

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[600px]">
      <div className="lg:col-span-3">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden h-full"
        >
          <div className="grid grid-cols-2 h-full">
            <div className="relative bg-gray-900">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                You
              </div>
              {!isVideoOn && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <VideoOff className="w-12 h-12 text-white" />
                </div>
              )}
            </div>
            
            <div className="relative bg-gray-800">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                {isConnected ? 'Doctor' : 'Connecting...'}
              </div>
              {!isConnected && (
                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-sm">Waiting for doctor...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-white/40 border-t border-white/20">
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                onClick={toggleAudio}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full shadow-lg ${
                  isAudioOn ? 'bg-[#D4A373] text-white' : 'bg-red-500 text-white'
                }`}
              >
                {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </motion.button>

              <motion.button
                onClick={toggleVideo}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full shadow-lg ${
                  isVideoOn ? 'bg-[#D4A373] text-white' : 'bg-red-500 text-white'
                }`}
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </motion.button>

              <motion.button
                onClick={handleEndCall}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-red-500 text-white shadow-lg"
              >
                <PhoneOff className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => setShowChat(!showChat)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-[#B5838D] text-white shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {showChat && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg"
        >
          <h4 className="font-semibold text-[#3D405B] mb-4">Session Chat</h4>
          <div className="h-80 overflow-y-auto mb-4 space-y-2">
            <div className="text-sm text-[#6D6875] bg-white/50 p-2 rounded-lg">
              <strong>Dr. Chen:</strong> How are you feeling today?
            </div>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 text-sm border border-[#D4A373]/20 rounded-lg focus:ring-1 focus:ring-[#D4A373]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[#D4A373] text-white p-2 rounded-lg"
            >
              Send
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}