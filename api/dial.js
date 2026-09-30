import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const n = req.query.n || '';
  if (n === '48270613') {
    try {
      const filePath = path.join(process.cwd(), 'api', 'call2V.wav');
      const stat = fs.statSync(filePath);
      res.writeHead(200, {
        'Content-Type': 'audio/wav',
        'Content-Length': stat.size
      });
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    } catch (e) {
      res.status(500).send('SERVER ERROR');
    }
  } else {
    res.status(404).send('NUMBER NOT IN SERVICE');
  }
}

