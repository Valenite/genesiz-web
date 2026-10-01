const fs = require('fs');

// ── 1. Add /bean, /gambino, /hobie to CipherQuestPages.tsx ──────────────────
let cqp = fs.readFileSync('src/components/CipherQuestPages.tsx', 'utf8');

const beanEnc  = '%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3Ctitle%3Ebean%3C%2Ftitle%3E%3C%2Fhead%3E%3Cbody%3E1994%0A%0A2019%0A%0A6%20%2B%201%0A%0Athe%20king%20replaced%20one%20bird.%0A%0Athe%20child%20kept%20another%20name.%0A%3C%2Fbody%3E%3C%2Fhtml%3E';
const gambEnc  = '%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3Ctitle%3Egambino%3C%2Ftitle%3E%3C%2Fhead%3E%3Cbody%3E2017%0A%0A15M%0A%0Abone%20opened%20the%20door.%0A%0Athe%20place%20sank.%0A%0Atell%20the%20loud%20box%20who%20fell.%0A%3C%2Fbody%3E%3C%2Fhtml%3E';
const hobEnc   = '%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3Ctitle%3Ehobie%3C%2Ftitle%3E%3C%2Fhead%3E%3Cbody%3E2018%0A%0Anot%20this%20prowler.%0A%0Athe%20moon%20got%20the%20picture%20after%20the%20wrong%20land.%0A%0Astone%20made%20the%20letter%20easy.%0A%3C%2Fbody%3E%3C%2Fhtml%3E';

// Add routes to the isCipherQuestPath array (find the last route before closing bracket)
cqp = cqp.replace(
  "'/moriarty',",
  "'/moriarty',\n      '/bean',\n      '/gambino',\n      '/hobie',"
);

// Add switch cases (before the closing of the switch)
cqp = cqp.replace(
  "case '/moriarty': writeRawPage('",
  "case '/bean': writeRawPage('" + beanEnc + "'); break;\n      case '/gambino': writeRawPage('" + gambEnc + "'); break;\n      case '/hobie': writeRawPage('" + hobEnc + "'); break;\n      case '/moriarty': writeRawPage('"
);

fs.writeFileSync('src/components/CipherQuestPages.tsx', cqp);
console.log('CipherQuestPages.tsx updated');

// ── 2. Add daniel kaluuya trigger to GenesizChatbot.tsx ─────────────────────
let bot = fs.readFileSync('src/components/GenesizChatbot.tsx', 'utf8');

// Find the ChatMessage type or the getBotReply function signature to locate where to inject
// We inject BEFORE the "Register" block — first meaningful handler
const downloadTrigger = `
  // FALSE REFLECTION — daniel kaluuya trigger (do not expose context)
  {
    const dk = normalized.replace(/[^a-z]/g, '');
    if (dk === 'danielkaluuya') {
      return {
        reply: '__DK_MERITS__',
        newHintCount: hintCount,
      };
    }
  }

`;

// Inject before the Register block
bot = bot.replace(
  "  // Register\n  if (normalized.includes('register')",
  downloadTrigger + "  // Register\n  if (normalized.includes('register')"
);

fs.writeFileSync('src/components/GenesizChatbot.tsx', bot);
console.log('GenesizChatbot.tsx updated');
