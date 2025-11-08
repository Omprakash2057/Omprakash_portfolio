# 🚀 Omprakash Portfolio - Real-time Interactive Portfolio

A modern, responsive portfolio website featuring **real-time updates**, **3D animations**, and **dark/light theme support**. Built with React, Node.js, Socket.io, and Three.js.

## ✨ Features

### 🎨 **Modern Design & Animations**
- **3D Interactive Scenes** powered by Three.js and React Three Fiber
- **Smooth animations** with Framer Motion
- **Responsive design** that works on all devices
- **Professional UI/UX** with modern CSS techniques

### 🌓 **Dark/Light Theme**
- **Automatic theme detection** based on system preferences
- **Manual theme toggle** with smooth transitions
- **Persistent theme** settings saved in localStorage
- **CSS variables** for consistent theming across components

### ⚡ **Real-time Features**
- **Live visitor counter** with Socket.io
- **Real-time project views and likes**
- **Online users tracking**
- **Live connection status indicator**
- **Real-time form submissions**

### 📱 **Sections & Components**
- **Hero Section** with 3D animated background
- **About Section** with service cards and statistics
- **Skills Section** with animated progress bars
- **Projects Section** with real-time metrics
- **Contact Section** with working contact form
- **Footer** with social links and quick navigation

### 🛠 **Technical Features**
- **Socket.io** for real-time communication
- **React Context** for theme management
- **Responsive navigation** with mobile menu
- **SEO optimized** structure
- **Fast loading** with optimized assets
- **Error handling** and fallbacks

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd omprakash_portfolio
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend (React): http://localhost:3000
   - Backend (Node.js): http://localhost:5000

### 📁 Project Structure

```
omprakash_portfolio/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── 3D/            # Three.js 3D components
│   │   │   ├── About.js       # About section
│   │   │   ├── Contact.js     # Contact form
│   │   │   ├── Header.js      # Navigation
│   │   │   ├── Hero.js        # Hero section
│   │   │   ├── Projects.js    # Projects showcase
│   │   │   ├── Skills.js      # Skills section
│   │   │   ├── ThemeToggle.js # Theme switcher
│   │   │   └── VisitorCounter.js # Real-time counter
│   │   ├── contexts/          # React contexts
│   │   │   └── ThemeContext.js # Theme management
│   │   ├── styles/            # CSS files
│   │   └── App.js             # Main app component
│   └── package.json
├── server/                     # Node.js backend
│   ├── server.js              # Express server with Socket.io
│   ├── .env                   # Environment variables
│   └── package.json
├── package.json               # Root package.json
└── README.md
```

## 🎮 Available Scripts

### Root Level Commands
```bash
npm run dev          # Start both client and server
npm run client       # Start only React frontend
npm run server       # Start only Node.js backend
npm run build        # Build for production
npm run install-all  # Install all dependencies
```

### Client Commands
```bash
cd client
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
```

### Server Commands
```bash
cd server
npm start           # Start production server
npm run dev         # Start development server with nodemon
```

## 🌟 Key Technologies

### Frontend
- **React 18** - UI framework
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js
- **Framer Motion** - Animation library
- **Socket.io Client** - Real-time communication
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting
- **dotenv** - Environment variables

### Development
- **Nodemon** - Development server
- **Concurrently** - Run multiple commands
- **React Scripts** - Build tools

## 🎨 Theme System

The portfolio includes a comprehensive theme system:

### CSS Variables
- Automatic color scheme switching
- Consistent design tokens
- Smooth transitions between themes

### Theme Features
- **Auto-detection** of system preference
- **Manual toggle** with animated button
- **Persistent storage** in localStorage
- **Real-time updates** across all components

## 🔥 Real-time Features

### Socket.io Integration
- **Visitor tracking** with live counter
- **Project interaction** tracking (views, likes)
- **Online users** count
- **Connection status** indicator
- **Real-time notifications**

### Live Updates
- Project views increment in real-time
- Like counts update across all connected users
- Visitor counter shows total site visits
- Online users count shows concurrent visitors

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### Mobile Features
- Collapsible navigation menu
- Touch-friendly interface
- Optimized 3D performance
- Adjusted layouts and spacing

## 🛡️ Security & Performance

### Security Features
- **Helmet.js** for security headers
- **Rate limiting** to prevent abuse
- **CORS** configuration
- **Input validation** on forms

### Performance Optimizations
- **Lazy loading** for 3D components
- **Optimized 3D scenes** with low poly models
- **Efficient re-renders** with React hooks
- **Compressed assets** and images

## 🚀 Deployment

### Frontend Deployment
1. Build the React app:
   ```bash
   cd client && npm run build
   ```

2. Deploy `build/` folder to your hosting service (Vercel, Netlify, etc.)

### Backend Deployment
1. Deploy server to cloud service (Heroku, DigitalOcean, AWS, etc.)
2. Set environment variables
3. Update frontend Socket.io connection URL

### Environment Variables
Create `.env` file in server directory:
```env
PORT=5000
NODE_ENV=production
CLIENT_URL=http://localhost:3000
```

## 📧 Contact Form

The contact form includes:
- **Real-time validation**
- **Loading states**
- **Success/error messages**
- **Email integration ready** (configure in server.js)

## 🎯 Browser Support

- **Modern browsers** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **WebGL support** required for 3D features
- **ES6+ features** used throughout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Three.js** team for the amazing 3D library
- **React** team for the excellent framework
- **Socket.io** for real-time capabilities
- **Framer Motion** for smooth animations

---

**🔗 Live Demo:** [Coming Soon]
**📧 Contact:** omprakash@example.com
**💼 LinkedIn:** [Your LinkedIn Profile]
**🐙 GitHub:** [Your GitHub Profile]
