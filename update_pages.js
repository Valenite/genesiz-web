const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'CipherQuestPages.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const transientHtml = encodeURIComponent(`<!DOCTYPE html>
<html>
<head>
<title>TRANSIENT</title>
</head>
<body>
TRANSIENT
<br><br>
9/8 8/8 7/8
<br><br>
987
<br><br>
the last one still calls.
<br><br>
<a href="/stationlog.txt">stationlog.txt</a>
</body>
</html>`);

const akrotiriHtml = encodeURIComponent(`<!DOCTYPE html>
<html>
<head>
<title>AKROTIRI</title>
</head>
<body>
AKROTIRI
<br><br>
299
<br><br>
the thing never said its name.
<br><br>
the bear kept one necessity.
<br><br>
oxfvd2
<br><br>
ajc0YM0z
<br><br>
<img src="/on65nb.webp" alt="">
<br><br>
two voices. no spaces.
<br><br>
NWTGRZWAOPSHBM
</body>
</html>`);

const insertString = `
      case '/transient': writeRawPage('${transientHtml}'); break;
      case '/akrotiri': writeRawPage('${akrotiriHtml}'); break;
`;

content = content.replace("case '/operationargus':", insertString + "\n      case '/operationargus':");

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Updated CipherQuestPages.tsx with /transient and /akrotiri");
