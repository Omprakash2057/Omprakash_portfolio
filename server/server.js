const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Enable compression
app.use(require('compression')());

const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Rate limiting - more strict
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Stricter rate limit for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.'
});

// In-memory storage (in production, use a database)
let visitorCount = 1247; // Starting count
let onlineUsers = 0;
const projects = [
  {
    id: 1,
    views: 245,
    likes: 34
  },
  {
    id: 2,
    views: 189,
    likes: 28
  },
  {
    id: 3,
    views: 167,
    likes: 22
  },
  {
    id: 4,
    views: 134,
    likes: 19
  },
  {
    id: 5,
    views: 98,
    likes: 15
  },
  {
    id: 6,
    views: 312,
    likes: 45
  }
];

// Helper function for input validation
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, 500); // Limit length and trim whitespace
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    let { name, email, subject, message } = req.body;
    
    // Sanitize inputs
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    subject = sanitizeInput(subject);
    message = sanitizeInput(message);
    
    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    // Check minimum lengths
    if (name.length < 2 || subject.length < 3 || message.length < 10) {
      return res.status(400).json({ 
        success: false, 
        message: 'Input fields are too short' 
      });
    }
    
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      messageLength: message.length,
      timestamp: new Date().toISOString()
    });

    // Simulate async processing
    await new Promise(resolve => setTimeout(resolve, 500));

    res.json({ 
      success: true, 
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

app.get('/api/projects', (req, res) => {
  res.json({ success: true, projects });
});

app.get('/api/visitor-count', (req, res) => {
  res.json({ count: visitorCount });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  onlineUsers++;
  
  // Increment visitor count for new visitors
  visitorCount++;
  
  // Send current counts to the new user
  socket.emit('visitorCount', visitorCount);
  socket.emit('onlineUsers', onlineUsers);
  
  // Broadcast updated online users count to all clients
  io.emit('onlineUsers', onlineUsers);

  // Handle visitor count requests
  socket.on('getVisitorCount', () => {
    socket.emit('visitorCount', visitorCount);
  });

  // Handle online users requests
  socket.on('getOnlineUsers', () => {
    socket.emit('onlineUsers', onlineUsers);
  });

  // Handle project views
  socket.on('viewProject', (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      project.views++;
      socket.emit('projectViewed', { projectId, views: project.views });
      // Optionally broadcast to all users
      socket.broadcast.emit('projectViewed', { projectId, views: project.views });
    }
  });

  // Handle project likes
  socket.on('likeProject', (projectId) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      project.likes++;
      io.emit('projectLiked', { projectId, likes: project.likes });
    }
  });

  // Handle real-time project updates (for admin)
  socket.on('updateProject', (updatedProject) => {
    const projectIndex = projects.findIndex(p => p.id === updatedProject.id);
    if (projectIndex !== -1) {
      projects[projectIndex] = { ...projects[projectIndex], ...updatedProject };
      io.emit('projectUpdate', projects[projectIndex]);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    onlineUsers--;
    if (onlineUsers < 0) onlineUsers = 0;
    
    // Broadcast updated online users count
    io.emit('onlineUsers', onlineUsers);
  });
});

// Simulate some real-time updates (for demo purposes)
setInterval(() => {
  // Randomly update project views
  const randomProject = projects[Math.floor(Math.random() * projects.length)];
  if (Math.random() > 0.7) { // 30% chance every 30 seconds
    randomProject.views++;
    io.emit('projectViewed', { 
      projectId: randomProject.id, 
      views: randomProject.views 
    });
  }
}, 30000);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Real-time features enabled`);
  console.log(`🔗 Socket.io listening for connections`);
});
