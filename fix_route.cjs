const fs = require('fs');
let c = fs.readFileSync('src/components/CipherQuestPages.tsx', 'utf8');
c = c.replace(/'\/clementine6895baronblood'/g, "'/poseidon'");
fs.writeFileSync('src/components/CipherQuestPages.tsx', c);
