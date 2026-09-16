export function isCipherQuestPath() {
  const pathname = window.location.pathname.replace(/\/$/, '');
  return [
    '/posterchild',
    '/eastofjava',
    '/luwak',
    '/maude',
    '/mayqueen',
    '/underpressure',
    '/thelostmanifest',
    '/thebloodcargo',
    '/thesomertonman',
    '/matches-bryantandmay',
  ].includes(pathname);
}

function writeRawPage(html: string) {
  document.open();
  document.write(html);
  document.close();
}

function renderPosterchild() { writeRawPage(`<!DOCTYPE html><html><head><title>posterchild</title></head><body><!-- child support ended here --><!-- 1969 had confidence --><img src="https://file.garden/aqFpFUAG_0sBTo_p/itlies.jpg" /><br />not the child.<br />the poster lied.</body></html>`); }
function renderEastOfJava() { writeRawPage(`<!DOCTYPE html><html><head><title>eastofjava</title></head><body><!-- the map is gaslighting you --><!-- language people will overthink this --><!-- coffee people will not --><img src="https://file.garden/aqFpFUAG_0sBTo_p/eeee.jpg" /><br />EAST OF JAVA<br /><br />ok but what if it wasn't.<br /><br />one direction was enough.</body></html>`); }
function renderLuwak() { writeRawPage(`<!DOCTYPE html><html><head><title>luwak</title></head><body><!-- civet was framed --><!-- ask the loud box what the cat became --><!-- meow meow capitalism -->LUWAK<br /><br />expensive animal water.<br /><br />the cat changed names before the old film kept singing.</body></html>`); }
function renderMaude() { writeRawPage(`<!DOCTYPE html><html><head><title>maude</title></head><body><!-- harold did not stay on land --><!-- captain bait is still bait --><!-- covers are not originals --><!-- token A is the original, uppercase -->MAUDE<br /><br />wrong half.<br /><br />the boy went swimming with a captain.<br /><br />not the captain.<br />not the original.</body></html>`); }
function renderMayQueen() { writeRawPage(`<!DOCTYPE html><html><head><title>mayqueen</title></head><body><!-- may is acting like a title now --><!-- flowers are not always romantic --><!-- token B is the band, uppercase --><img src="https://file.garden/aqFpFUAG_0sBTo_p/dreamgoth.webp" /><br />MAY QUEEN<br /><br />not a wedding.<br />not a filter.<br />wrong festival.<br /><br />the crown became louder than the season.</body></html>`); }
function renderUnderPressure() { writeRawPage(`<!DOCTYPE html><html><head><title>underpressure</title></head><body><!-- two tokens opened the room --><!-- sample the pressure, don't worship it --><!-- final is the artist, lowercase, no space -->UNDER PRESSURE<br /><br />not them.<br />not the pressure.<br /><br />too cold.<br />too babyish.<br /><br />who made the borrowed pressure famous?</body></html>`); }

function renderLostManifest() {
  writeRawPage(`<!DOCTYPE html>
<html>
<head><title>the lost manifest</title></head>
<body>
<!-- she sailed from 40.7128 N 74.0060 W -->
<!-- her destination was 44.4056 N 8.9463 E -->
<!-- she never arrived -->
She was found with the table still set for dinner.<br />
The lifeboat was gone. Everything else remained.<br />
No one knows why.<br /><br />
<a href="https://file.garden/aqlE05Uj5RKrOkO_/manifest.jpg" download="manifest.jpg">[ manifest.jpg ]</a>
</body>
</html>`);
}

function renderTheBloodCargo() {
  writeRawPage(`<!DOCTYPE html>
<html>
<head><title>the blood cargo</title></head>
<body style="background:#0a0a0a;color:#b0a090;font-family:monospace;padding:40px;line-height:2;">
<!-- VII -->
<pre>
CARGO REGISTRY BRIGANTINE AMAZON NOVEMBER EIGHTEEN NAMED
SEVENTY TWO OUTBOUND FROM NEW YORK BY
BOUND FOR GENOA CARRYING OF COMMERCIAL THE
ONE THOUSAND SEVEN HUNDRED ONE BARRELS DOCTOR
ALCOHOL CERTIFIED PURE AND SEALED BY OF
PORT AUTHORITY CAPTAIN BENJAMIN BRIGGS COMMANDING BAKER
WIFE SARAH ELIZABETH ABOARD ALSO CHILD STREET
SOPHI PROVISIONS FOR NINETY DAYS LOGGED CREW

SIGNED AND WITNESSED UNDER SEAL OF THE
PORT OF NEW YORK NOVEMBER EIGHTEEN SEVENTY
TWO BY HARBOUR AUTHORITY AND CUSTOMS OFFICIAL
ALL GOODS ACCOUNTED FOR AND DUTY PAID
CARGO MANIFEST HOLDS LEGAL STANDING UNDER MARITIME
LAW OF THE UNITED STATES AND CARRIES
FULL INSURANCE DECLARATION ATTACHED ON SEPARATE DOCUMENT
</pre>
</body>
</html>`);
}

function renderTheSomertonMan() {
  writeRawPage(`<!DOCTYPE html>
<html>
<head><title>API Response</title></head>
<body style="background-color: #0d1117; color: #c9d1d9; font-family: monospace; padding: 20px;">
<pre>
{
  "case_id": "SA-1948-0312",
  "status": "unsolved",
  "victim": "unknown",
  "evidence_location": "DELETED",
  "system_note": "The evidence file was accidentally committed to this website's public GitHub repository, then immediately deleted.",
  "directive": "You must check the git commit history of the genesiz-web repository to find the deleted evidence_1948.txt file."
}
</pre>
</body>
</html>`);
}

function renderMatchesBryantAndMay() {
  writeRawPage(`<!DOCTYPE html>
<html>
<head><title>ShadowBoard 1999</title></head>
<body style="background-color: #000000; color: #00ff00; font-family: 'Courier New', Courier, monospace; padding: 40px;">
<div style="border: 1px solid #00ff00; padding: 20px; max-width: 800px; margin: 0 auto;">
  <h2 style="text-align: center; border-bottom: 1px dashed #00ff00; padding-bottom: 10px;">GHOST_NET FORUM v1.4</h2>
  <p><strong>POST #3239</strong> | AUTHOR: J.T. (1945)</p>
  <p><strong>SUBJECT: The Final Secret</strong></p>
  <p>They found the poetry book. I had to move the final piece of the puzzle somewhere permanent. Somewhere decentralized.</p>
  <p>Look at the very first block of the chain created by Nakamoto (Block 0).</p>
  <p>Buried in the raw hex data of the coinbase transaction is a newspaper headline.</p>
  <p>The flag is the fourth, fifth, and sixth words of that headline (lowercase, no spaces).</p>
  <br />
  <p style="text-align: right;"><em>// end of transmission</em></p>
</div>
</body>
</html>`);
}

export function CipherQuestPage() {
  const pathname = window.location.pathname.replace(/\/$/, '');

  switch (pathname) {
    case '/posterchild': renderPosterchild(); break;
    case '/eastofjava': renderEastOfJava(); break;
    case '/luwak': renderLuwak(); break;
    case '/maude': renderMaude(); break;
    case '/mayqueen': renderMayQueen(); break;
    case '/underpressure': renderUnderPressure(); break;
    case '/thelostmanifest': renderLostManifest(); break;
    case '/thebloodcargo': renderTheBloodCargo(); break;
    case '/thesomertonman': renderTheSomertonMan(); break;
    case '/matches-bryantandmay': renderMatchesBryantAndMay(); break;
  }

  return null;
}

