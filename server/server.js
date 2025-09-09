const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const appointmentRoutes = require('./routes/appointment');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const { generalLimiter } = require('./middleware/rateLimit');

const app = express();

// Apply middleware
app.use(logger);
app.use(generalLimiter);
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
(async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
})();

// API routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Debug endpoint to check build files
app.get('/api/debug/files', (req, res) => {
  const fs = require('fs');
  const buildPath = path.join(__dirname, '../client/build');
  
  try {
    const result = {
      buildPath,
      buildExists: fs.existsSync(buildPath),
      files: {}
    };
    
    if (result.buildExists) {
      // Check static directory
      const staticPath = path.join(buildPath, 'static');
      result.files.staticExists = fs.existsSync(staticPath);
      
      if (result.files.staticExists) {
        const jsPath = path.join(staticPath, 'js');
        const cssPath = path.join(staticPath, 'css');
        
        result.files.jsFiles = fs.existsSync(jsPath) ? fs.readdirSync(jsPath) : [];
        result.files.cssFiles = fs.existsSync(cssPath) ? fs.readdirSync(cssPath) : [];
      }
    }
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static files from React build
const buildPath = path.join(__dirname, '../client/build');
console.log('📁 Build path:', buildPath);

// Debug: Check if build directory exists and list files
const fs = require('fs');
try {
  const buildExists = fs.existsSync(buildPath);
  console.log('📁 Build directory exists:', buildExists);
  
  if (buildExists) {
    const staticPath = path.join(buildPath, 'static');
    if (fs.existsSync(staticPath)) {
      console.log('📁 Static directory exists');
      const jsPath = path.join(staticPath, 'js');
      const cssPath = path.join(staticPath, 'css');
      
      if (fs.existsSync(jsPath)) {
        const jsFiles = fs.readdirSync(jsPath);
        console.log('📄 JS files available:', jsFiles);
      }
      
      if (fs.existsSync(cssPath)) {
        const cssFiles = fs.readdirSync(cssPath);
        console.log('🎨 CSS files available:', cssFiles);
      }
    } else {
      console.log('❌ Static directory not found');
    }
  }
} catch (err) {
  console.error('❌ Error checking build files:', err);
}

// Serve static files with proper MIME types
app.use(express.static(buildPath, {
  maxAge: '1y',
  setHeaders: (res, filePath) => {
    console.log('📄 Serving file:', filePath);
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    } else if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    } else if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/' + path.extname(filePath).slice(1));
    } else if (filePath.endsWith('.ico')) {
      res.setHeader('Content-Type', 'image/x-icon');
    }
  }
}));

// Explicit static file routes for better debugging
app.get('/static/js/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../client/build/static/js', filename);
  console.log('🔍 Requested JS file:', filePath);
  res.set('Content-Type', 'application/javascript; charset=utf-8');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('❌ Error serving JS file:', err);
      res.status(404).send('File not found');
    }
  });
});

app.get('/static/css/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../client/build/static/css', filename);
  console.log('🎨 Requested CSS file:', filePath);
  res.set('Content-Type', 'text/css; charset=utf-8');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('❌ Error serving CSS file:', err);
      res.status(404).send('File not found');
    }
  });
});

// Catch-all handler for React Router
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'production'}`);
});
