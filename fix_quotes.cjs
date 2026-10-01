const fs = require('fs');
let c = fs.readFileSync('src/components/CipherQuestPages.tsx', 'utf8');
c = c.replace(/Lockheed's/g, "Lockheed%27s");
c = c.replace(/wasn't/g, "wasn%27t");
c = c.replace(/ussnortonsound/g, "ussnortonsound");
fs.writeFileSync('src/components/CipherQuestPages.tsx', c);
