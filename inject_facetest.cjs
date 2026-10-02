const fs = require('fs');

// ── 1. Add /shhhdontsharethis to CipherQuestPages.tsx ──────────────────
let cqp = fs.readFileSync('src/components/CipherQuestPages.tsx', 'utf8');

const shhhEnc  = '%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3Ctitle%3Eshhhdontsharethis%3C%2Ftitle%3E%3C%2Fhead%3E%3Cbody%3E1995%0A%3Cbr%3Eseven%0A%3Cbr%3E%3Cbr%3E1999%0A%3Cbr%3Eclub%0A%3Cbr%3E%3Cbr%3E2008%0A%3Cbr%3Ebutton%0A%3Cbr%3E%3Cbr%3Esame%20face.%0A%3Cbr%3E%3Cbr%3Ewrong%20answer.%0A%3Cbr%3E%3Cbr%3Efind%20the%20eye%20behind%20all%20three.%0A%3Cbr%3E%3Cbr%3E%3Cbr%3E%3Cbr%3E%3Cbr%3E2010%0A%3Cbr%3E%3Cbr%3Eno%20friends.%0A%3Cbr%3E%3Cbr%3E2011%0A%3Cbr%3E%3Cbr%3Ethe%20dragon%20chose%20the%20same%20girl.%0A%3Cbr%3E%3Cbr%3Enot%20the%20director.%0A%3C%2Fbody%3E%3C%2Fhtml%3E';

cqp = cqp.replace(
  "'/hobie'\r\n  ].includes(p);",
  "'/hobie',\n    '/shhhdontsharethis'\n  ].includes(p);"
);
cqp = cqp.replace(
  "'/hobie'\n  ].includes(p);",
  "'/hobie',\n    '/shhhdontsharethis'\n  ].includes(p);"
);

cqp = cqp.replace(
  "case '/hobie': writeRawPage('%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3Ctitle%3Ehobie%3C%2Ftitle%3E%3C%2Fhead%3E%3Cbody%3E2018%0A%0Anot%20this%20prowler.%0A%0Athe%20moon%20got%20the%20picture%20after%20the%20wrong%20land.%0A%0Astone%20made%20the%20letter%20easy.%0A%3C%2Fbody%3E%3C%2Fhtml%3E'); break;",
  "case '/hobie': writeRawPage('%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3Ctitle%3Ehobie%3C%2Ftitle%3E%3C%2Fhead%3E%3Cbody%3E2018%0A%0Anot%20this%20prowler.%0A%0Athe%20moon%20got%20the%20picture%20after%20the%20wrong%20land.%0A%0Astone%20made%20the%20letter%20easy.%0A%3C%2Fbody%3E%3C%2Fhtml%3E'); break;\n      case '/shhhdontsharethis': writeRawPage('" + shhhEnc + "'); break;"
);

fs.writeFileSync('src/components/CipherQuestPages.tsx', cqp);
console.log('CipherQuestPages.tsx updated');

// ── 2. Add cadiz klemack trigger to GenesizChatbot.tsx ─────────────────────
let bot = fs.readFileSync('src/components/GenesizChatbot.tsx', 'utf8');

const cadizTrigger = `
  // FACE TEST — cadiz klemack trigger (do not expose context)
  {
    const ck = normalized.replace(/[^a-z]/g, '');
    if (ck === 'cadizklemack') {
      return {
        reply: 'QjhFZHVLdGJWVA==\\n\\nvoices have rooms.',
        newHintCount: hintCount,
      };
    }
  }

`;

bot = bot.replace(
  "  // Register\n  if (normalized.includes('register')",
  cadizTrigger + "  // Register\n  if (normalized.includes('register')"
);

fs.writeFileSync('src/components/GenesizChatbot.tsx', bot);
console.log('GenesizChatbot.tsx updated');
