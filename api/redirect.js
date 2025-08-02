// simpan sebagai [code].js atau pages/[code].js
// menangani redirect dari short code ke URL asli

import { store } from './shorten';   // impor store yang sama
export default function handler(req, res) {
  const { code } = req.query;
  const longUrl = store.get(code);
  if (!longUrl) return res.status(404).send('Not found');
  res.redirect(301, longUrl);
}
