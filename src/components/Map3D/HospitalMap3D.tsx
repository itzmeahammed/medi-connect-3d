import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Info, Eye, EyeOff, Home, Bed } from 'lucide-react';
import { useHospitalStore } from '../../store/hospitalStore';

interface RoomProps {
  room: any;
  floor: any;
  isSelected: boolean;
  onSelect: (room: any) => void;
}

function Room({ room, isSelected, onSelect }: RoomProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      if (isSelected) {
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
      } else if (hovered) {
        meshRef.current.scale.setScalar(1.05);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const getRoomColor = () => {
    const occupancyRate = Math.random(); // Simulate occupancy
    if (occupancyRate < 0.3) return '#10B981'; // Green - Available
    if (occupancyRate < 0.7) return '#F59E0B'; // Yellow - Partial
    return '#EF4444'; // Red - Full
  };

  const getRoomSize = (): [number, number, number] => {
    switch (room.type) {
      case 'ICU': return [1.5, 0.8, 1.2];
      case 'Surgery': return [2, 0.8, 1.5];
      case 'Emergency': return [2.5, 0.8, 2];
      case 'General': return [3, 0.8, 2];
      default: return [1.8, 0.8, 1.4];
    }
  };

  return (
    <group position={[room.position.x, room.position.y, room.position.z]}>
      <RoundedBox
        ref={meshRef}
        args={getRoomSize()}
        radius={0.1}
        smoothness={4}
        onClick={() => onSelect(room)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={getRoomColor()}
          transparent
          opacity={isSelected ? 0.9 : hovered ? 0.8 : 0.7}
          emissive={isSelected ? '#444444' : hovered ? '#222222' : '#000000'}
        />
      </RoundedBox>
      
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.3}
        color="#111827"
        anchorX="center"
        anchorY="middle"
      >
        {room.name}
      </Text>
      
      <Text
        position={[0, 0.9, 0]}
        fontSize={0.2}
        color="#4B5563"
        anchorX="center"
        anchorY="middle"
      >
        {room.beds} beds
      </Text>
    </group>
  );
}

interface FloorProps {
  floor: any;
  isVisible: boolean;
  selectedRoom: any;
  onRoomSelect: (room: any) => void;
}

function Floor({ floor, isVisible, selectedRoom, onRoomSelect }: FloorProps) {
  if (!isVisible) return null;

  return (
    <group>
      {/* Floor Base */}
      <RoundedBox
        args={[16, 0.2, 12]}
        position={[0, floor.floor * 3, 0]}
        radius={0.2}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#FFFFFF"
          transparent
          opacity={0.3}
        />
      </RoundedBox>

      {/* Floor Label */}
      <Text
        position={[0, floor.floor * 3 + 1.5, -6.5]}
        fontSize={0.8}
        color="#0D9488"
        anchorX="center"
        anchorY="middle"
      >
        {floor.name}
      </Text>

      {/* Rooms */}
      {floor.rooms?.map((room: any) => (
        <Room
          key={room.id}
          room={room}
          floor={floor}
          isSelected={selectedRoom?.id === room.id}
          onSelect={onRoomSelect}
        />
      ))}
    </group>
  );
}

function Scene({ floors, visibleFloors, selectedRoom, onRoomSelect }: any) {
  const { camera } = useThree();

  useEffect(() => {
    if (selectedRoom) {
      const targetPosition = new THREE.Vector3(
        selectedRoom.position.x + 5,
        selectedRoom.position.y + 2,
        selectedRoom.position.z + 5
      );
      
      camera.position.lerp(targetPosition, 0.1);
      camera.lookAt(selectedRoom.position.x, selectedRoom.position.y, selectedRoom.position.z);
    }
  }, [selectedRoom, camera]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 15, 0]} intensity={0.5} color="#0D9488" />

      {floors.map((floor: any) => (
        <Floor
          key={floor.id}
          floor={floor}
          isVisible={visibleFloors[floor.floor]}
          selectedRoom={selectedRoom}
          onRoomSelect={onRoomSelect}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={30}
      />
    </>
  );
}

export function HospitalMap3D() {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [visibleFloors, setVisibleFloors] = useState<{ [key: number]: boolean }>({
    0: true, 1: true, 2: true, 3: true, 4: true
  });
  const [mapData, setMapData] = useState<any[]>([]);
  
  const { fetchHospitalMap } = useHospitalStore();

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const data = await fetchHospitalMap();
        setMapData(data);
      } catch (error) {
        console.error('Failed to load map data:', error);
      }
    };
    
    loadMapData();
  }, []);

  const toggleFloorVisibility = (floorNumber: number) => {
    setVisibleFloors(prev => ({
      ...prev,
      [floorNumber]: !prev[floorNumber]
    }));
  };

  const resetView = () => {
    setSelectedRoom(null);
    setVisibleFloors({ 0: true, 1: true, 2: true, 3: true, 4: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">3D Hospital Navigation</h2>
        <p className="text-gray-600">Explore our hospital floors and departments interactively</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden"
          >
            <div className="h-[600px]">
              <Canvas
                camera={{ position: [15, 12, 15], fov: 60 }}
                shadows
              >
                <Suspense fallback={null}>
                  <Scene
                    floors={mapData}
                    visibleFloors={visibleFloors}
                    selectedRoom={selectedRoom}
                    onRoomSelect={setSelectedRoom}
                  />
                </Suspense>
              </Canvas>
            </div>
            
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-sm text-[#6D6875]">Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="text-sm text-[#6D6875]">Partial</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-sm text-[#6D6875]">Full</span>
                  </div>
                </div>
                
                <motion.button
                  onClick={resetView}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0D9488] text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Reset View
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="w-5 h-5 text-[#0D9488]" />
              <h3 className="text-lg font-semibold text-gray-900">Floor Visibility</h3>
            </div>
            
            <div className="space-y-3">
              {mapData.map((floor) => (
                <motion.div
                  key={floor.id}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#0D9488]/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-[#0D9488]">{floor.floor}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{floor.name}</p>
                      <p className="text-xs text-gray-600">{floor.departments.join(', ')}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => toggleFloorVisibility(floor.floor)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg ${
                      visibleFloors[floor.floor] 
                        ? 'bg-[#0D9488] text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {visibleFloors[floor.floor] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {selectedRoom && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Info className="w-5 h-5 text-[#0D9488]" />
                  <h3 className="text-lg font-semibold text-gray-900">Room Details</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedRoom.name}</h4>
                    <p className="text-sm text-gray-600">Type: {selectedRoom.type}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Bed className="w-4 h-4 text-[#0D9488]" />
                    <span className="text-sm text-gray-600">{selectedRoom.beds} beds available</span>
                  </div>
                  
                  <div className="pt-3 border-t border-white/20">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-green-100 p-2 rounded text-center">
                        <p className="font-medium text-green-800">Available</p>
                        <p className="text-green-600">{Math.floor(selectedRoom.beds * 0.4)}</p>
                      </div>
                      <div className="bg-red-100 p-2 rounded text-center">
                        <p className="font-medium text-red-800">Occupied</p>
                        <p className="text-red-600">{Math.floor(selectedRoom.beds * 0.6)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#0D9488] text-white py-2 rounded-lg text-sm font-medium"
                  >
                    Book Room
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation Tips</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• <strong>Click</strong> on rooms to view details</p>
              <p>• <strong>Drag</strong> to rotate the view</p>
              <p>• <strong>Scroll</strong> to zoom in/out</p>
              <p>• <strong>Toggle</strong> floor visibility</p>
              <p>• <strong>Colors</strong> indicate bed availability</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hospital Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Floors:</span>
                <span className="font-medium text-gray-900">{mapData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Rooms:</span>
                <span className="font-medium text-gray-900">
                  {mapData.reduce((acc, floor) => acc + (floor.rooms?.length || 0), 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Beds:</span>
                <span className="font-medium text-gray-900">
                  {mapData.reduce((acc, floor) => acc + floor.bedCount, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Occupancy Rate:</span>
                <span className="font-medium text-[#0D9488]">
                  {Math.round((mapData.reduce((acc, floor) => acc + floor.occupancy, 0) / 
                    mapData.reduce((acc, floor) => acc + floor.bedCount, 0)) * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}