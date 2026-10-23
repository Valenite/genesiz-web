const fs = require('fs');
const filePath = 'C:\\Users\\user\\.gemini\\antigravity\\scratch\\genesiz-web\\src\\components\\ResultsPage.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Remove unused Medal import
code = code.replace('  Medal, \n', '');

// 2. Replace 🥇🥈🥉 emojis everywhere with 🏆
code = code.replace(/🥇/g, '🏆');
code = code.replace(/🥈/g, '🏆');
code = code.replace(/🥉/g, '🏆');

// 3. Rename Medal Tally section
code = code.replace('2K26 Medal Tally Overview', '2K26 Trophy Standings');
code = code.replace('OFFICIAL PODIUM STANDINGS', 'OFFICIAL TROPHY STANDINGS');
code = code.replace('Ranked by Gold Medals, Silver, then Total Podiums', 'Ranked by 1st, 2nd, then 3rd Place Trophies');

// 4. Rename table column headers
code = code.replace('\uD83C\uDFC5 Gold', '\uD83C\uDFC6 1st');
code = code.replace('\uD83C\uDFC5 Silver', '\uD83C\uDFC6 2nd');
code = code.replace('\uD83C\uDFC5 Bronze', '\uD83C\uDFC6 3rd');

// 5. Fix MVP spotlight grid labels
code = code.replace('Gold Podiums', '1st Place Trophies');
code = code.replace('Silver Medal', '2nd Place Trophy');

// 6. Fix description text
code = code.replace('5 Gold First-Place Titles', '5 First-Place Trophies');
code = code.replace('1 Silver Medal', '1 Runner-Up Trophy');

// 7. Replace Medal icon with Trophy for the 2nd place badge (if still present)
code = code.replace(/<Medal className="w-3\.5 h-3\.5 text-zinc-300" \/>/g, '<Trophy className="w-3.5 h-3.5 text-zinc-300" />');

// 8. Fix overall tally table header that still says 🥇 🥈 🥉
code = code.replace('🏆 Gold', '🏆 1st');
code = code.replace('🏆 Silver', '🏆 2nd');
code = code.replace('🏆 Bronze', '🏆 3rd');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Done - all medals replaced with trophies!');
