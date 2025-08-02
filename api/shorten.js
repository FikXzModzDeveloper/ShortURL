import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: 'URL wajib diisi' });

  const shortCode = nanoid(6);
  await kv.set(`url:${shortCode}`, longUrl);

  const shortUrl = `https://${req.headers.host}/${shortCode}`;
  res.json({ shortUrl });
}
