import { nanoid } from 'nanoid';
import fs   from 'fs';
import path from 'path';

const DB = path.join(process.cwd(), 'db.json');

function read() {
  try { return JSON.parse(fs.readFileSync(DB, 'utf8')); } catch { return {}; }
}
function write(data) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: 'URL wajib diisi' });

  const code = nanoid(6);
  const db = read();
  db[code] = longUrl;
  write(db);

  const shortUrl = `https://${req.headers.host}/${code}`;
  res.json({ shortUrl });
}
