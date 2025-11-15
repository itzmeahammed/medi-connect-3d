# MediConnect - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Git (optional)

### Installation Steps

1. **Navigate to project directory**
   ```bash
   cd e:\my projects\mediConnect-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - You should see the MediConnect landing page

---

## 📖 User Guide

### First-Time Visit

1. **Landing Page**
   - You'll see the MediConnect landing page
   - Scroll through features, statistics, and testimonials
   - Click "Get Started" button

2. **Login/Register**
   - Enter your credentials
   - Select your role (Patient, Doctor, or Admin)
   - Click Login or Register

3. **Dashboard**
   - You'll see your personalized dashboard
   - View statistics and recent activities
   - Use quick action buttons for common tasks

### Navigation

**Main Navigation Tabs:**
- **Dashboard**: View overview and statistics
- **Appointments**: Book and manage appointments
- **AI Assistant**: Chat with healthcare AI
- **3D Map**: View hospital layout
- **Analytics**: View detailed analytics
- **Settings**: Manage preferences

### Admin Features

If logged in as admin:
- Access Admin Dashboard from the main dashboard
- Manage hospital floors, rooms, and beds
- Create new floors and rooms using modals
- View doctor and staff information

---

## 🎨 Customization Guide

### Changing Colors

Edit the color palette in your components:

```typescript
// Primary color
className="bg-[#D4A373]"  // Change to your color

// Secondary color
className="bg-[#B5838D]"  // Change to your color

// Text color
className="text-[#3D405B]"  // Change to your color
```

Or update in `tailwind.config.js` for global changes.

### Modifying Content

#### Landing Page
Edit `src/components/Landing/LandingPage.tsx`:
- Change hero text in the heading section
- Modify features array
- Update statistics
- Edit testimonials

#### Dashboard
Edit `src/components/Dashboard/DashboardOverview.tsx`:
- Change welcome message
- Update stat values
- Modify activity items
- Add/remove quick actions

#### Navigation
Edit `src/components/Layout/Navbar.tsx`:
- Add/remove navigation items
- Change logo
- Update styling

### Adding New Components

1. Create new folder in `src/components/`
2. Create component file (e.g., `MyComponent.tsx`)
3. Export component
4. Import in `App.tsx`
5. Add to navigation if needed

---

## 🔧 Development Commands

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Tips

1. **Hot Module Replacement (HMR)**
   - Changes automatically refresh in browser
   - State is preserved when possible

2. **TypeScript**
   - Full type checking enabled
   - Hover over variables for type info

3. **Tailwind CSS**
   - Use Tailwind classes for styling
   - IntelliSense available in VS Code

4. **Framer Motion**
   - Use `motion` components for animations
   - Check documentation for animation props

---

## 🐛 Troubleshooting

### Issue: Port 5173 already in use

**Solution:**
```bash
# Kill process on port 5173
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Then restart:
npm run dev
```

### Issue: Dependencies not installing

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -r node_modules package-lock.json

# Reinstall
npm install
```

### Issue: TypeScript errors

**Solution:**
- Check that all imports are correct
- Ensure component props match interface definitions
- Run `npm run lint` to see all errors

### Issue: Styles not applying

**Solution:**
- Check that Tailwind CSS is imported in `index.css`
- Verify class names are spelled correctly
- Check browser DevTools for CSS conflicts

### Issue: Animations not working

**Solution:**
- Ensure Framer Motion is installed: `npm list framer-motion`
- Check that `motion` components are imported from 'framer-motion'
- Verify animation props syntax

### Issue: Landing page not showing

**Solution:**
- Check `App.tsx` for landing page state
- Verify `LandingPage.tsx` is in correct location
- Check browser console for errors

---

## 📁 Project Structure Explanation

```
mediConnect-2/
├── src/
│   ├── components/          # React components
│   │   ├── Admin/          # Admin dashboard components
│   │   ├── Analytics/      # Analytics components
│   │   ├── Appointments/   # Appointment booking
│   │   ├── Auth/           # Login/Register
│   │   ├── BedAvailability/# Bed management
│   │   ├── Chatbot/        # AI chatbot
│   │   ├── Dashboard/      # Main dashboard
│   │   ├── Landing/        # Landing page ✨ NEW
│   │   ├── Layout/         # Navigation & layout
│   │   ├── Map3D/          # 3D hospital map
│   │   ├── Settings/       # Settings panel
│   │   ├── Teleconsultation/ # Video calls
│   │   └── WebRTC/         # WebRTC interface
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── store/              # Zustand stores
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main app component ✨ ENHANCED
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global styles
│   └── vite-env.d.ts       # Vite types
├── public/                 # Static assets
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
├── tailwind.config.js      # Tailwind config
├── postcss.config.js       # PostCSS config
├── PROJECT_SUMMARY.md      # Project overview ✨ NEW
├── FEATURES_AND_ENHANCEMENTS.md # Features guide ✨ NEW
└── QUICK_START_GUIDE.md    # This file ✨ NEW
```

---

## 🎯 Common Tasks

### Add a New Page

1. Create component in `src/components/YourFeature/YourPage.tsx`
2. Add to navigation in `Navbar.tsx`
3. Add case in `App.tsx` renderActiveComponent()
4. Add to navItems array

### Change Theme Colors

1. Open `src/components/Landing/LandingPage.tsx`
2. Find color codes like `#D4A373`
3. Replace with your colors
4. Update in other components similarly

### Add New Quick Action

Edit `src/components/Dashboard/DashboardOverview.tsx`:
```typescript
{ label: 'Your Action', color: 'bg-blue-500', icon: YourIcon }
```

### Modify Admin Dashboard

Edit `src/components/Admin/AdminDashboard.tsx`:
- Change stat values
- Add new sections
- Modify modals

---

## 📚 Learning Resources

### Framer Motion
- [Official Docs](https://www.framer.com/motion/)
- Animation examples in components
- Hover and tap gestures

### Tailwind CSS
- [Official Docs](https://tailwindcss.com/)
- Utility-first CSS framework
- Responsive design helpers

### React
- [Official Docs](https://react.dev/)
- Hooks and state management
- Component composition

### TypeScript
- [Official Docs](https://www.typescriptlang.org/)
- Type safety and interfaces
- Better IDE support

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Vite
4. Deploy!

---

## 💡 Tips & Tricks

### Debugging

1. **Browser DevTools**
   - Open with F12
   - Check Console for errors
   - Use React DevTools extension

2. **VS Code Debugging**
   - Install Debugger for Chrome
   - Set breakpoints
   - Run with debugger

### Performance

1. **Check Bundle Size**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

2. **Lighthouse Audit**
   - Open DevTools
   - Go to Lighthouse tab
   - Run audit

### Code Quality

1. **Run Linter**
   ```bash
   npm run lint
   ```

2. **Format Code**
   - Install Prettier extension
   - Format on save

---

## 🆘 Getting Help

### Check These First

1. **Browser Console** - Look for error messages
2. **Terminal Output** - Check for build errors
3. **Documentation** - Check component docs
4. **GitHub Issues** - Search for similar issues

### Debugging Steps

1. Clear browser cache
2. Restart dev server
3. Reinstall dependencies
4. Check TypeScript errors
5. Review recent changes

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Dev server running on localhost:5173
- [ ] Landing page displays correctly
- [ ] Can click "Get Started" button
- [ ] Navigation tabs work
- [ ] Dashboard shows stats
- [ ] Animations are smooth
- [ ] No console errors
- [ ] Responsive on mobile

---

## 📞 Support

For issues or questions:

1. Check this guide first
2. Review component documentation
3. Check browser console for errors
4. Restart dev server
5. Reinstall dependencies if needed

---

## 🎉 You're All Set!

MediConnect is ready to use. Start exploring the platform and customize it to your needs!

**Happy coding! 🚀**
