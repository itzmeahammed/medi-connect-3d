import { motion } from 'framer-motion';
import { 
  Heart, 
  Stethoscope, 
  Clock, 
  Shield,
  ArrowRight,
  Star,
  Video,
  MapPin
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Heart,
      title: 'Patient Care',
      description: 'Comprehensive health monitoring and personalized care plans'
    },
    {
      icon: Stethoscope,
      title: 'Expert Doctors',
      description: 'Access to qualified medical professionals 24/7'
    },
    {
      icon: Clock,
      title: 'Quick Appointments',
      description: 'Book appointments in minutes with instant confirmation'
    },
    {
      icon: Video,
      title: 'Teleconsultation',
      description: 'Video consultations from the comfort of your home'
    },
    {
      icon: MapPin,
      title: '3D Hospital Map',
      description: 'Navigate hospital facilities with interactive 3D mapping'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and protected'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Patients' },
    { number: '500+', label: 'Medical Professionals' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Cardiologist',
      text: 'MediConnect has revolutionized how I manage patient care. The platform is intuitive and efficient.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'John Doe',
      role: 'Patient',
      text: 'Finally, a healthcare platform that puts patients first. Easy to use and very responsive.',
      avatar: '👤'
    },
    {
      name: 'Dr. Emily Chen',
      role: 'Hospital Administrator',
      text: 'The admin dashboard has streamlined our operations significantly. Highly recommended!',
      avatar: '👩‍⚕️'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/70 backdrop-blur-lg border-b border-[#0D9488]/20 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-[#0D9488] rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">MediConnect</h1>
            </motion.div>
            
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0D9488] text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <motion.h2 
                  className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight"
                  variants={itemVariants}
                >
                  Your Health,
                  <span className="text-[#0D9488]"> Our Priority</span>
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-600 leading-relaxed"
                  variants={itemVariants}
                >
                  Experience the future of healthcare with MediConnect. Connect with expert doctors, manage your health records, and access quality care anytime, anywhere.
                </motion.p>
              </div>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                <motion.button
                  onClick={onGetStarted}
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(13, 148, 136, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0D9488] text-white px-8 py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center space-x-2 group"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#0D9488] text-[#0D9488] px-8 py-4 rounded-xl font-semibold hover:bg-[#0D9488]/10 transition-colors"
                >
                  Learn More
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div className="flex items-center space-x-4 pt-4" variants={itemVariants}>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-[#0D9488]/20 border-2 border-white flex items-center justify-center text-sm font-semibold text-[#0D9488]"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">50K+ Happy Patients</p>
                  <p className="text-sm text-gray-600">Trusted by healthcare professionals</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div 
              variants={itemVariants}
              className="relative h-96 lg:h-full"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-br from-[#0D9488]/20 to-[#0D9488]/10 rounded-3xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-4 bg-white/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8 flex items-center justify-center"
              >
                <div className="text-center">
                  <Stethoscope className="w-24 h-24 text-[#0D9488] mx-auto mb-4" />
                  <p className="text-gray-900 font-semibold">Healthcare Excellence</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <motion.p 
                  className="text-4xl md:text-5xl font-bold text-[#0D9488] mb-2"
                  whileInView={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose MediConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed for modern patients and medical professionals
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <motion.div
                    className="w-14 h-14 bg-[#0D9488]/20 rounded-xl flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-7 h-7 text-[#0D9488]" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What People Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied patients and healthcare professionals
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#0D9488] text-[#0D9488]" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#0D9488]/20 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#0D9488] to-[#0F766E] rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              Ready to Transform Your Healthcare?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 opacity-90"
              variants={itemVariants}
            >
              Join thousands of patients and healthcare professionals using MediConnect
            </motion.p>
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#0D9488] px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
              variants={itemVariants}
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white/40 backdrop-blur-lg border-t border-[#0D9488]/20 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6 text-[#0D9488]" />
                <h3 className="font-bold text-gray-900">MediConnect</h3>
              </div>
              <p className="text-gray-600 text-sm">Your trusted healthcare companion</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#0D9488]">Features</a></li>
                <li><a href="#" className="hover:text-[#0D9488]">Pricing</a></li>
                <li><a href="#" className="hover:text-[#0D9488]">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#0D9488]">About</a></li>
                <li><a href="#" className="hover:text-[#0D9488]">Blog</a></li>
                <li><a href="#" className="hover:text-[#0D9488]">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#0D9488]">Privacy</a></li>
                <li><a href="#" className="hover:text-[#0D9488]">Terms</a></li>
                <li><a href="#" className="hover:text-[#0D9488]">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#0D9488]/20 pt-8 text-center text-gray-600 text-sm">
            <p>&copy; 2024 MediConnect. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>

      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#0D9488]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#0D9488]/3 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}
