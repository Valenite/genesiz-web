const fs = require('fs');
let c = fs.readFileSync('src/components/RegistrationModal.tsx', 'utf8');

c = c.replace(
  '  return (\r\n    <div className="fixed inset-0',
  '  const isRegistrationClosed = Date.now() >= new Date(\'2026-10-04T00:00:00+05:30\').getTime();\n\n  return (\n    <div className="fixed inset-0'
);
if (!c.includes('isRegistrationClosed')) {
  c = c.replace(
    '  return (\n    <div className="fixed inset-0',
    '  const isRegistrationClosed = Date.now() >= new Date(\'2026-10-04T00:00:00+05:30\').getTime();\n\n  return (\n    <div className="fixed inset-0'
  );
}

c = c.replace(
  '        {/* Mode Switch Tabs */}',
  `        {isRegistrationClosed ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">REGISTRATIONS CLOSED</h3>
            <p className="text-sm sm:text-base text-zinc-400 max-w-sm">
              The official registration window for GENESIZ 2026 has concluded. Thank you to everyone who registered!
            </p>
          </div>
        ) : (
          <>
        {/* Mode Switch Tabs */}`
);

c = c.replace(
  '          </form>\r\n        )}\r\n\r\n      </div>\r\n    </div>\r\n  );\r\n};',
  '          </form>\r\n        )}\r\n        </>\r\n        )}\r\n\r\n      </div>\r\n    </div>\r\n  );\r\n};'
);

c = c.replace(
  '          </form>\n        )}\n\n      </div>\n    </div>\n  );\n};',
  '          </form>\n        )}\n        </>\n        )}\n\n      </div>\n    </div>\n  );\n};'
);


fs.writeFileSync('src/components/RegistrationModal.tsx', c);
console.log('Done');
