export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { longUrl } = req.body;
  if (!longUrl)
    return res.status(400).json({ error: 'longUrl is required' });

  const code = Math.random().toString(36).substring(2, 8);
  const shortUrl = `https://${req.headers.host}/${code}`;

  // In-memory store, survives per-invocation
  global.store = global.store || {};
  global.store[code] = longUrl;

  res.json({ shortUrl });
}
