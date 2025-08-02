export default function handler(req, res) {
  const { code } = req.query;
  global.store = global.store || {};
  const longUrl = global.store[code];

  if (!longUrl) return res.status(404).send('Not found');
  res.redirect(301, longUrl);
}
