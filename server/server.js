const express = require('express');
const path = require('path');
const app = express();

// 📁 Path to React build
const buildPath = path.join(__dirname, '../client/build');
console.log('📁 Build path:', buildPath);

// Serve static files with caching & MIME types
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
    } else if (/\.(png|jpg|jpeg)$/.test(filePath)) {
      res.setHeader('Content-Type', 'image/' + path.extname(filePath).slice(1));
    } else if (filePath.endsWith('.ico')) {
      res.setHeader('Content-Type', 'image/x-icon');
    }
  }
}));

// Explicit routes for debugging JS and CSS files
app.get('/static/js/:filename', (req, res) => {
  const filePath = path.join(buildPath, 'static/js', req.params.filename);
  console.log('🔍 Requested JS file:', filePath);
  res.set('Content-Type', 'application/javascript; charset=utf-8');
  res.sendFile(filePath, err => {
    if (err) {
      console.error('❌ Error serving JS file:', err);
      res.status(404).send('File not found');
    }
  });
});

app.get('/static/css/:filename', (req, res) => {
  const filePath = path.join(buildPath, 'static/css', req.params.filename);
  console.log('🎨 Requested CSS file:', filePath);
  res.set('Content-Type', 'text/css; charset=utf-8');
  res.sendFile(filePath, err => {
    if (err) {
      console.error('❌ Error serving CSS file:', err);
      res.status(404).send('File not found');
    }
  });
});

// Catch-all handler for React Router (non-API routes)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
