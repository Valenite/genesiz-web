import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  let number;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    number = body.number;
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // Server-side mapping logic - NOT exposed to client
  if (number === '73190426') {
    const filePath = path.join(process.cwd(), 'assets', 'call.wav');
    try {
      const stat = fs.statSync(filePath);
      res.writeHead(200, {
        'Content-Type': 'audio/wav',
        'Content-Length': stat.size
      });
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    } catch (err) {
      console.error('File read error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Generic failure
    res.status(404).json({ error: 'NUMBER NOT IN SERVICE' });
  }
}
