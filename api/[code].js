import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { code } = req.query;
  const longUrl = await kv.get(`url:${code}`);

  if (!longUrl) return res.status(404).send('URL tidak ditemukan');
  res.redirect(longUrl);
}
