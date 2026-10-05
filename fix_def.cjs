const fs = require('fs');
let c = fs.readFileSync('src/components/RegistrationModal.tsx', 'utf8');

c = c.replace(
  '  return (\r\n    <div className="fixed inset-0',
  '  const isRegistrationClosed = Date.now() >= new Date(\'2026-10-04T00:00:00+05:30\').getTime();\n\n  return (\n    <div className="fixed inset-0'
);

c = c.replace(
  '  return (\n    <div className="fixed inset-0',
  '  const isRegistrationClosed = Date.now() >= new Date(\'2026-10-04T00:00:00+05:30\').getTime();\n\n  return (\n    <div className="fixed inset-0'
);

fs.writeFileSync('src/components/RegistrationModal.tsx', c);
console.log('Done');
