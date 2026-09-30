export default function handler(req, res) {
  const country = req.headers['x-vercel-ip-country'] || '';
  if (country.toUpperCase() === 'BE') {
    res.status(200).setHeader('Content-Type', 'text/html').send(`<!DOCTYPE html>
<html>
<head>
<title>Blue Army</title>
<style>
  body { background: black; color: white; font-family: monospace; padding: 2rem; white-space: pre-wrap; font-size: 1.2rem; }
  img { max-width: 100%; display: block; margin-top: 2rem; }
</style>
</head>
<body>300

11

1 ≠ WINNER

///

<img src="https://file.garden/aqFpFUAG_0sBTo_p/lilac.jpg" alt="" /></body>
</html>`);
  } else {
    res.status(200).setHeader('Content-Type', 'text/html').send(`<!DOCTYPE html>
<html>
<head><title></title></head>
<body style="background: white; margin: 0; padding: 0;"></body>
</html>`);
  }
}
