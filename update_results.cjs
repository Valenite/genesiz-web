const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let code = fs.readFileSync(filePath, 'utf8');

if (!code.includes('ResultsPage')) {
  // Add import
  code = code.replace(
    "import { DialerPage } from './components/DialerPage';",
    "import { DialerPage } from './components/DialerPage';\nimport { ResultsPage } from './components/ResultsPage';"
  );

  // Add route handling
  const target = "const p = window.location.pathname.replace(/\\/$/, '');";
  const replacement = `const p = window.location.pathname.replace(/\\/$/, '');
  const normalizedP = p.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (
    normalizedP === '/results' || 
    normalizedP === '/results-2026' || 
    normalizedP === '/results-2k26' || 
    normalizedP === '/winners' || 
    hash === '#/results' || 
    hash === '#results'
  ) {
    return <ResultsPage />;
  }`;

  code = code.replace(target, replacement);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('App.tsx updated successfully!');
} else {
  console.log('App.tsx already has ResultsPage.');
}
