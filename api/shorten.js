// simpan sebagai api/shorten.js
// endpoint: POST /api/shorten
// body: { "longUrl": "https://..." }

const store = new Map();            // memori sederhana
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: 'longUrl is required' });

  const code = Math.random().toString(36).slice(2, 8); // 6 karakter acak
  const shortUrl = `${req.headers.host}/${code}`;
  store.set(code, longUrl);

  res.json({ shortUrl });
}
