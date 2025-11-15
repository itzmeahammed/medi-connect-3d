import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageSquare,
  FileText,
  Share2,
  Send
} from 'lucide-react';

interface VideoCallProps {
  onStartCall?: (roomId: string) => void;
}

export function VideoCall({ onStartCall }: VideoCallProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [notes, setNotes] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && isCallActive) {
      // Simulate video feed
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.log('Video not available:', err));
    }
  }, [isCallActive]);

  const startCall = () => {
    const roomId = `consultation-${Date.now()}`;
    if (onStartCall) {
      onStartCall(roomId);
    } else {
      setIsCallActive(true);
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Teleconsultation</h2>
        <p className="text-gray-600">Secure video consultations with real-time collaboration tools</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden"
          >
            <div className="relative h-[500px] bg-gradient-to-br from-white to-[#0D9488]/10">
              {isCallActive ? (
                <div className="grid grid-cols-2 h-full">
                  <div className="relative bg-gray-900 flex items-center justify-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                      You
                    </div>
                  </div>
                  
                  <div className="relative bg-gray-800 flex items-center justify-center">
                    <img
                      src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Dr. Sarah Chen"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                      Dr. Sarah Chen
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center"
                  >
                    <Video className="w-16 h-16 text-[#0D9488] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Connect</h3>
                    <p className="text-gray-600 mb-6">Start your video consultation with Dr. Sarah Chen</p>
                    <motion.button
                      onClick={startCall}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#0D9488] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Start Call
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white/40 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full shadow-lg ${
                    isAudioOn ? 'bg-[#0D9488] text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </motion.button>

                <motion.button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full shadow-lg ${
                    isVideoOn ? 'bg-[#0D9488] text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </motion.button>

                <motion.button
                  onClick={isCallActive ? endCall : startCall}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full shadow-lg ${
                    isCallActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                  }`}
                >
                  {isCallActive ? <PhoneOff className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                </motion.button>

                <motion.button
                  onClick={() => setShowChat(!showChat)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-[#0D9488] text-white shadow-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-[#0D9488] text-white shadow-lg"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            animate={{ opacity: showChat ? 1 : 0.7 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-[#0D9488]" />
              <h3 className="text-lg font-semibold text-gray-900">Session Chat</h3>
            </div>
            
            <div className="h-40 overflow-y-auto mb-4 space-y-2">
              <div className="text-sm text-gray-600 bg-white/50 p-2 rounded-lg">
                <strong>Dr. Chen:</strong> How are you feeling today?
              </div>
              <div className="text-sm text-gray-600 bg-[#0D9488]/20 p-2 rounded-lg">
                <strong>You:</strong> Much better after the medication
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 text-sm border border-[#0D9488]/20 rounded-lg focus:ring-1 focus:ring-[#0D9488]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0D9488] text-white p-2 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-[#0D9488]" />
              <h3 className="text-lg font-semibold text-gray-900">Session Notes</h3>
            </div>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add consultation notes..."
              className="w-full h-32 p-3 text-sm border border-[#0D9488]/20 rounded-lg focus:ring-1 focus:ring-[#0D9488] resize-none"
            />
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-3 bg-[#0D9488] text-white py-2 rounded-lg text-sm font-medium"
            >
              Save Notes
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}