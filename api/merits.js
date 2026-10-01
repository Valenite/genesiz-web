import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const token = req.query.t || '';
  // simple token check — chatbot passes ?t=mk when trigger fires
  if (token !== 'mk') {
    res.status(404).send('NOT FOUND');
    return;
  }
  try {
    const filePath = path.join(process.cwd(), 'api', 'merits_file.xlsx');
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="merits.xlsx"',
      'Content-Length': stat.size,
      'Cache-Control': 'no-store',
    });
    fs.createReadStream(filePath).pipe(res);
  } catch (e) {
    res.status(500).send('SERVER ERROR');
  }
}
