import { useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Search, Stethoscope, CheckCircle } from 'lucide-react';
import { useAIStore } from '../../store/aiStore';
import { useAppointmentStore } from '../../store/appointmentStore';

export function AppointmentBooking() {
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    medicalHistory: ''
  });
  
  const { analyzeSymptoms, lastAnalysis, isAnalyzing } = useAIStore();
  const { createAppointment, getDoctorAvailability, availableSlots } = useAppointmentStore();

  const handleSymptomsAnalysis = async () => {
    try {
      await analyzeSymptoms(symptoms, parseInt(patientInfo.age), patientInfo.medicalHistory);
      setStep(2);
    } catch (error) {
      console.error('AI analysis failed:', error);
    }
  };

  const handleDoctorSelection = async (doctor: any) => {
    setSelectedDoctor(doctor);
    
    // Get doctor availability for next 7 days
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await getDoctorAvailability(doctor.id, tomorrow.toISOString().split('T')[0]);
    
    setStep(3);
  };

  const handleBookingConfirmation = async () => {
    try {
      await createAppointment({
        doctorId: selectedDoctor.id,
        date: selectedDate,
        time: selectedTime,
        symptoms,
        type: selectedDoctor.department === 'Emergency' ? 'in-person' : 'teleconsultation'
      });
      
      setStep(4);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSymptoms('');
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setPatientInfo({ age: '', medicalHistory: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Appointment Booking</h2>
        <p className="text-gray-600">Describe your symptoms and let AI find the perfect doctor for you</p>
      </div>

      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <React.Fragment key={stepNumber}>
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNumber ? 'bg-[#0D9488] text-white' : 'bg-gray-200 text-gray-500'
              }`}
              animate={{ scale: step === stepNumber ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {stepNumber === 4 && step >= 4 ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                stepNumber
              )}
            </motion.div>
            {stepNumber < 4 && (
              <motion.div 
                className={`w-16 h-1 ${step > stepNumber ? 'bg-[#0D9488]' : 'bg-gray-200'}`}
                animate={{ scaleX: step > stepNumber ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-2xl p-8 border border-white shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Search className="w-6 h-6 text-[#0D9488]" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Describe Your Symptoms</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Age (optional)</label>
                <input
                  type="number"
                  value={patientInfo.age}
                  onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                  placeholder="Enter your age"
                  className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Medical History (optional)</label>
                <input
                  type="text"
                  value={patientInfo.medicalHistory}
                  onChange={(e) => setPatientInfo({...patientInfo, medicalHistory: e.target.value})}
                  placeholder="Any relevant medical history"
                  className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">Symptoms</label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Please describe your symptoms in detail... (e.g., 'I have been experiencing chest pain and shortness of breath for the past two days')"
                className="w-full h-32 p-4 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent resize-none"
              />
            </div>
            
            <motion.button
              onClick={handleSymptomsAnalysis}
              disabled={!symptoms.trim() || isAnalyzing}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#0D9488] text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>AI is analyzing your symptoms...</span>
                </div>
              ) : (
                'Analyze Symptoms with AI'
              )}
            </motion.button>
          </motion.div>
        )}

        {step === 2 && lastAnalysis && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 border border-white shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Analysis Results</h3>
              
              <div className={`p-4 rounded-xl mb-4 ${
                lastAnalysis.urgencyLevel === 'high' ? 'bg-red-100 border border-red-200' :
                lastAnalysis.urgencyLevel === 'medium' ? 'bg-yellow-100 border border-yellow-200' :
                'bg-green-100 border border-green-200'
              }`}>
                <p className="font-medium">
                  Urgency Level: <span className="capitalize">{lastAnalysis.urgencyLevel}</span>
                </p>
                <p className="text-sm mt-1">{lastAnalysis.nextSteps}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Possible Conditions:</h4>
                <ul className="space-y-1">
                  {lastAnalysis.probableConditions.map((condition, index) => (
                    <li key={index} className="text-gray-600 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-[#0D9488] rounded-full" />
                      <span>{condition.name} ({condition.confidence})</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#0D9488]/10 rounded-lg">
                <p className="text-xs text-[#0D9488]">{lastAnalysis.disclaimer}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-white shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Doctors</h3>
              <div className="grid gap-4">
                {lastAnalysis.recommendedDoctors?.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    onClick={() => handleDoctorSelection(doctor)}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-white/20 cursor-pointer hover:bg-[#0D9488]/10 transition-colors"
                  >
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">Dr. {doctor.name}</p>
                      <p className="text-gray-600 text-sm">{doctor.specialization}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(doctor.rating))}
                        </div>
                        <span className="text-sm text-gray-600">{doctor.rating} • {doctor.experience} years</span>
                      </div>
                    </div>
                    <Stethoscope className="w-5 h-5 text-[#0D9488]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && selectedDoctor && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-2xl p-8 border border-white shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Schedule with {selectedDoctor.name}</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Available Times</label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {availableSlots.map((time) => (
                    <motion.button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === time
                          ? 'bg-[#0D9488] text-white'
                          : 'bg-white/50 text-gray-900 hover:bg-[#0D9488]/20'
                      }`}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#0D9488]/10 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Appointment Summary</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
                <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
                <p><strong>Department:</strong> {selectedDoctor.department}</p>
                <p><strong>Type:</strong> {selectedDoctor.department === 'Emergency' ? 'In-Person' : 'Teleconsultation'}</p>
                {selectedDate && selectedTime && (
                  <p><strong>Date & Time:</strong> {selectedDate} at {selectedTime}</p>
                )}
              </div>
            </div>

            <motion.button
              onClick={handleBookingConfirmation}
              disabled={!selectedDate || !selectedTime}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 bg-[#0D9488] text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
            >
              Confirm Appointment
            </motion.button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 border border-white shadow-lg text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">Your appointment with {selectedDoctor?.name} is scheduled for {selectedDate} at {selectedTime}</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#0D9488]/10 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Next Steps</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Check your email for confirmation</li>
                  <li>• Arrive 15 minutes early</li>
                  <li>• Bring your ID and insurance</li>
                  <li>• Prepare your medical history</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#0D9488]/10 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-2">Contact Info</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📞 Hospital: (555) 123-4567</p>
                  <p>📧 Email: appointments@mediconnect.com</p>
                  <p>🏥 Address: 123 Medical Center Dr</p>
                </div>
              </div>
            </div>
            
            <motion.button
              onClick={resetBooking}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0D9488] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Book Another Appointment
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}