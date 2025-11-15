# 🏥 MediConnect - AI Hospital Hub

A comprehensive, production-ready hospital management system with AI-powered features, real-time updates, and immersive 3D visualization.

## ✨ Features

### 🤖 AI-Powered Healthcare
- **Symptom Analysis**: OpenAI-powered triage system that analyzes patient symptoms and recommends appropriate specialists
- **Smart Appointment Booking**: AI suggests the best doctors based on symptoms and availability
- **Intelligent Chatbot**: 24/7 health assistant for patient guidance and support

### 🏥 Hospital Management
- **Real-Time Bed Tracking**: Live bed availability across all wards with instant status updates
- **3D Hospital Navigation**: Interactive Three.js-powered 3D map for exploring hospital floors and departments
- **Admin Dashboard**: Complete floor, room, and bed management system
- **Doctor Management**: Comprehensive doctor profiles, schedules, and availability management

### 📊 Analytics & Insights
- **Patient Flow Analytics**: Track admission patterns, discharge rates, and occupancy trends
- **Disease Statistics**: Monitor top conditions and health trends
- **Bed Occupancy Reports**: Real-time and historical bed utilization data

### 💬 Communication
- **WebRTC Video Consultations**: Secure, browser-based video calls between patients and doctors
- **Real-Time Chat**: Instant messaging during consultations
- **Session Notes**: Collaborative note-taking during appointments

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- OpenAI API Key

### Installation

1. **Clone and Install Dependencies**
```bash
git clone <repository-url>
cd mediconnect
npm install
cd server && npm install && cd ..
```

2. **Environment Setup**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration:
# - MongoDB connection string
# - OpenAI API key
# - JWT secrets
```

3. **Database Setup**
```bash
# Start MongoDB (if running locally)
mongod

# Seed the database with demo data
npm run server:seed
```

4. **Start Development Servers**
```bash
# Start both frontend and backend
npm run dev:full

# Or start individually:
npm run dev          # Frontend only
npm run server:dev   # Backend only
```

5. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 👥 Demo Accounts

After running the seed script, you can use these demo accounts:

- **Admin**: admin@mediconnect.com / admin123
- **Doctor**: sarah.chen@mediconnect.com / doctor123  
- **Patient**: john@example.com / patient123

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling with custom design system
- **Framer Motion** for smooth animations and transitions
- **Three.js** for 3D hospital visualization
- **Zustand** for state management
- **Socket.IO Client** for real-time updates
- **Recharts** for analytics and data visualization

### Backend Stack
- **Node.js** with Express and TypeScript
- **MongoDB** with Mongoose ODM
- **Socket.IO** for real-time communication
- **JWT** authentication with refresh tokens
- **OpenAI API** for AI-powered features
- **WebRTC** signaling for video consultations

### Key Features Implementation

#### Real-Time Updates
- Socket.IO channels for beds, appointments, and rooms
- Optimistic UI updates with server synchronization
- Live bed status changes across all connected clients

#### AI Integration
- OpenAI GPT-4 for symptom analysis and triage
- Intelligent doctor recommendations based on symptoms
- Medical chatbot with safety disclaimers

#### 3D Visualization
- Interactive hospital floor plans
- Real-time bed status visualization with color coding
- Smooth camera transitions and hover effects

#### Security
- JWT-based authentication with role-based access control
- Rate limiting and security headers
- Input validation and sanitization

## 📁 Project Structure

```
mediconnect/
├── src/                          # Frontend source
│   ├── components/              # React components
│   │   ├── Admin/              # Admin dashboard components
│   │   ├── Appointments/       # Booking and scheduling
│   │   ├── Auth/               # Authentication forms
│   │   ├── BedAvailability/    # Bed management
│   │   ├── Chatbot/            # AI chat interface
│   │   ├── Dashboard/          # Main dashboard
│   │   ├── Layout/             # Navigation and layout
│   │   ├── Map3D/              # 3D hospital map
│   │   ├── Settings/           # User preferences
│   │   ├── Teleconsultation/   # Video calling
│   │   └── WebRTC/             # Video call interface
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API services
│   ├── store/                  # Zustand state management
│   ├── types/                  # TypeScript definitions
│   └── utils/                  # Utility functions
├── server/                      # Backend source
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Auth and validation
│   │   ├── sockets/            # Socket.IO handlers
│   │   ├── scripts/            # Database seeding
│   │   └── config/             # Database configuration
│   └── package.json
└── package.json                # Frontend dependencies
```

## 🎨 Design System

### Color Palette (Minimal Desert Sand)
- **Background**: `#FAF3E0` (Sand White)
- **Primary**: `#D4A373` (Warm Clay)  
- **Secondary**: `#6D6875` (Muted Ash)
- **Accent**: `#B5838D` (Rose Mauve)
- **Text**: `#3D405B` (Deep Charcoal)

### UI Principles
- Glassmorphism design with subtle blur effects
- Consistent 8px spacing system
- Rounded corners (xl-2xl) for modern feel
- Micro-interactions and hover states
- WCAG AA accessibility compliance

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create new appointment
- `PATCH /api/appointments/:id/status` - Update appointment status
- `GET /api/appointments/doctors/:id/availability` - Get doctor availability

### Hospital Management
- `GET /api/hospital/floors` - Get all floors
- `GET /api/hospital/rooms` - Get rooms with filters
- `GET /api/hospital/map` - Get complete hospital map data
- `POST /api/hospital/floors` - Create new floor (admin)
- `POST /api/hospital/rooms` - Create new room (admin)

### Bed Management
- `GET /api/beds` - Get beds with filters
- `GET /api/beds/stats` - Get bed statistics
- `PATCH /api/beds/:id/status` - Update bed status
- `POST /api/beds` - Create new bed (admin)

### AI Services
- `POST /api/ai/triage` - Analyze symptoms with AI
- `POST /api/ai/chat` - Chat with AI assistant
- `GET /api/ai/chat/:conversationId?` - Get chat history

### Doctor Management
- `GET /api/doctors/search` - Search doctors with filters
- `GET /api/doctors/:id` - Get doctor profile
- `POST /api/doctors` - Create new doctor (admin)
- `PATCH /api/doctors/:id/slots` - Update doctor availability

## 🔄 Real-Time Events

### Socket.IO Events
- `beds:updated` - Bed status changes
- `beds:created` - New bed added
- `appointments:created` - New appointment booked
- `appointments:updated` - Appointment status changed
- `rooms:created` - New room added
- `floors:created` - New floor added
- `webrtc:*` - Video call signaling events

## 🧪 Development

### Available Scripts
- `npm run dev` - Start frontend development server
- `npm run server:dev` - Start backend development server  
- `npm run dev:full` - Start both frontend and backend
- `npm run server:seed` - Seed database with demo data
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Testing
- Unit tests for booking logic and AI services
- Integration tests for API endpoints
- E2E tests for critical user flows

## 🚀 Deployment

### Production Build
```bash
npm run build
cd server && npm run build
```

### Environment Variables
Ensure all production environment variables are set:
- `MONGODB_URI` - Production MongoDB connection
- `OPENAI_API_KEY` - OpenAI API key
- `JWT_SECRET` - Strong JWT secret
- `FRONTEND_URL` - Production frontend URL

## 🔒 Security Features

- JWT authentication with refresh tokens
- Role-based access control (RBAC)
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet.js

## 📱 Mobile Responsiveness

- Fully responsive design for all screen sizes
- Touch-optimized interactions
- Progressive Web App (PWA) ready
- Optimized 3D performance for mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Check the troubleshooting section below
- Open an issue on GitHub
- Contact the development team

## 🔧 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
- Ensure MongoDB is running
- Check connection string in .env
- Verify network connectivity

**OpenAI API Errors**
- Verify API key is correct
- Check API quota and billing
- Ensure proper environment variable setup

**WebRTC Connection Issues**
- Check browser permissions for camera/microphone
- Verify STUN server connectivity
- Test with different browsers

**3D Map Not Loading**
- Check browser WebGL support
- Clear browser cache
- Verify Three.js dependencies

### Performance Optimization
- Enable MongoDB indexes for better query performance
- Use Redis for session storage in production
- Implement CDN for static assets
- Enable gzip compression

---

Built with ❤️ by the MediConnect Team