const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { nanoid } = require('nanoid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', container: 'ecs-fargate', time: new Date() });
});

const LinkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
const Link = mongoose.model('Link', LinkSchema);

app.post('/api/shorten', async (req, res) => {
  try {
    const { originalUrl, customSlug } = req.body;
    const slug = customSlug ? customSlug.trim() : nanoid(6);
    
    const existing = await Link.findOne({ slug });
    if (existing) return res.status(409).json({ error: 'Slug already in use' });

    const link = new Link({ originalUrl, slug });
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/links', async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 }).limit(50);
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/s/:slug', async (req, res) => {
  try {
    const link = await Link.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (!link) return res.status(404).send('Short URL not found');
    res.redirect(302, link.originalUrl);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/snaplink')
    .then(() => app.listen(PORT, '0.0.0.0', () => console.log(`SnapLink ECS listening on port ${PORT}`)))
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = app;

