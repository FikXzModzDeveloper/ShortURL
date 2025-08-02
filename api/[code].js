import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('./db.json');

export default function handler(req, res) {
  const { code } = req.query;
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  const longUrl = db[code];

  if (!longUrl) return res.status(404).send('Not found');
  res.redirect(301, longUrl);
}
