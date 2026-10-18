// Local dev server: node server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const { createApp } = require('./api/index');

(async () => {
  const app = await createApp();
  // Separate admin entry point: /admin serves the admin login/panel shell
  app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
  // Multi-tenant store pages: /s/:slug (booking) and /s/:slug/admin (manage).
  // (API routes /s/:slug/api/* are already mounted inside createApp.)
  app.get('/s/:slug/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
  app.get('/s/:slug', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
  // Serve the frontend (on Vercel, static files are served natively)
  app.use(express.static(path.join(__dirname, 'public')));
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log('BookEasy running on http://localhost:' + port));
})().catch(e => { console.error('Failed to start:', e.message); process.exit(1); });
