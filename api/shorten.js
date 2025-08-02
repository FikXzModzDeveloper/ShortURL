import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('./db.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: 'longUrl is required' });

  const code = Math.random().toString(36).substring(2, 8);
  const shortUrl = `https://${req.headers.host}/${code}`;

  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  db[code] = longUrl;
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

  res.json({ shortUrl });
}
