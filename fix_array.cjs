const fs = require('fs');
let c = fs.readFileSync('src/components/CipherQuestPages.tsx', 'utf8');
c = c.replace(/'\/moriarty'\r?\n  \]\.includes\(p\);/g, "'/moriarty',\n    '/bean',\n    '/gambino',\n    '/hobie'\n  ].includes(p);");
fs.writeFileSync('src/components/CipherQuestPages.tsx', c);
console.log('Fixed');
