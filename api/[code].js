import fs from 'fs';
import path from 'path';

const DB = path.join(process.cwd(), 'db.json');

function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB, 'utf8'));
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  const { code } = req.query;
  const db = readDB();
  const longUrl = db[code];

  if (!longUrl) return res.status(404).send('URL tidak ditemukan');
  res.redirect(longUrl);
}
