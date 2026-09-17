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
    '/matchesbryantandmay',
    '/midnightportal',
    '/midnightvault',
    '/thesubnode',
    '/thearchitectsblueprint'
  ].includes(pathname);
}

function writeRawPage(html: string) {
  document.open();
  document.write(html);
  document.close();
}

function renderPosterchild() { writeRawPage(<!DOCTYPE html><html><head><title>posterchild</title></head><body><!-- child support ended here --><!-- 1969 had confidence --><img src="https://file.garden/aqFpFUAG_0sBTo_p/itlies.jpg" /><br />not the child.<br />the poster lied.</body></html>); }
function renderEastOfJava() { writeRawPage(<!DOCTYPE html><html><head><title>eastofjava</title></head><body><!-- the map is gaslighting you --><!-- language people will overthink this --><!-- coffee people will not --><img src="https://file.garden/aqFpFUAG_0sBTo_p/eeee.jpg" /><br />EAST OF JAVA<br /><br />ok but what if it wasn't.<br /><br />one direction was enough.</body></html>); }
function renderLuwak() { writeRawPage(<!DOCTYPE html><html><head><title>luwak</title></head><body><!-- civet was framed --><!-- ask the loud box what the cat became --><!-- meow meow capitalism -->LUWAK<br /><br />expensive animal water.<br /><br />the cat changed names before the old film kept singing.</body></html>); }
function renderMaude() { writeRawPage(<!DOCTYPE html><html><head><title>maude</title></head><body><!-- harold did not stay on land --><!-- captain bait is still bait --><!-- covers are not originals --><!-- token A is the original, uppercase -->MAUDE<br /><br />wrong half.<br /><br />the boy went swimming with a captain.<br /><br />not the captain.<br />not the original.</body></html>); }
function renderMayQueen() { writeRawPage(<!DOCTYPE html><html><head><title>mayqueen</title></head><body><!-- may is acting like a title now --><!-- flowers are not always romantic --><!-- token B is the band, uppercase --><img src="https://file.garden/aqFpFUAG_0sBTo_p/dreamgoth.webp" /><br />MAY QUEEN<br /><br />not a wedding.<br />not a filter.<br />wrong festival.<br /><br />the crown became louder than the season.</body></html>); }
function renderUnderPressure() { writeRawPage(<!DOCTYPE html><html><head><title>underpressure</title></head><body><!-- two tokens opened the room --><!-- sample the pressure, don't worship it --><!-- final is the artist, lowercase, no space -->UNDER PRESSURE<br /><br />not them.<br />not the pressure.<br /><br />too cold.<br />too babyish.<br /><br />who made the borrowed pressure famous?</body></html>); }

function renderLostManifest() { writeRawPage(<!DOCTYPE html><html><head><title>the lost manifest</title></head><body><!-- she sailed from 40.7128 N 74.0060 W --><!-- her destination was 44.4056 N 8.9463 E --><!-- she never arrived -->She was found with the table still set for dinner.<br />The lifeboat was gone. Everything else remained.<br />No one knows why.<br /><br /><a href="https://file.garden/aqlE05Uj5RKrOkO_/manifest.jpg" download="manifest.jpg">[ manifest.jpg ]</a></body></html>); }

function renderTheBloodCargo() { writeRawPage(<!DOCTYPE html><html><head><title>the blood cargo</title></head><body style="background:#0a0a0a;color:#b0a090;font-family:monospace;padding:40px;line-height:2;"><!-- VII --><pre>CARGO REGISTRY BRIGANTINE AMAZON NOVEMBER EIGHTEEN NAMED\nSEVENTY TWO OUTBOUND FROM NEW YORK BY\nBOUND FOR GENOA CARRYING OF COMMERCIAL THE\nONE THOUSAND SEVEN HUNDRED ONE BARRELS DOCTOR\nALCOHOL CERTIFIED PURE AND SEALED BY OF\nPORT AUTHORITY CAPTAIN BENJAMIN BRIGGS COMMANDING BAKER\nWIFE SARAH ELIZABETH ABOARD ALSO CHILD STREET\nSOPHI PROVISIONS FOR NINETY DAYS LOGGED CREW\n\nSIGNED AND WITNESSED UNDER SEAL OF THE\nPORT OF NEW YORK NOVEMBER EIGHTEEN SEVENTY\nTWO BY HARBOUR AUTHORITY AND CUSTOMS OFFICIAL\nALL GOODS ACCOUNTED FOR AND DUTY PAID\nCARGO MANIFEST HOLDS LEGAL STANDING UNDER MARITIME\nLAW OF THE UNITED STATES AND CARRIES\nFULL INSURANCE DECLARATION ATTACHED ON SEPARATE DOCUMENT</pre></body></html>); }

function renderTheSomertonMan() { writeRawPage(<!DOCTYPE html><html><head><title>API Response</title></head><body style="background-color: #0d1117; color: #c9d1d9; font-family: monospace; padding: 20px;"><pre>{\n  "case_id": "SA-1948-0312",\n  "status": "unsolved",\n  "victim": "unknown",\n  "evidence_status": "CORRUPTED",\n  "system_note": "The evidence file was damaged during database migration. A fragmented buffer was recovered.",\n  "deleted_buffer": "UkVTVFJJQ1RFRCBBQ0NFU1MgLSBTT1VUSCBBVVNUUkFMSUFOIFBPTElDRQpUaGUgcG9ldHJ5IGJvb2sgd2Fzbid0IHRoZSBvbmx5IHRoaW5nIHRoZSBTb21lcnRvbiBNYW4gY2FycmllZC4KSGUgaGFkIGEgaGFsZi1lbXB0eSBib3ggb2YgbWF0Y2hlcyBpbiBoaXMgcG9ja2V0LgpXaGF0IHdhcyB0aGUgZXhhY3QgYnJhbmQgbmFtZSBvZiB0aG9zZSBtYXRjaGVzPwpOYXZpZ2F0ZSB0byB0aGUgc2hhZG93IGZvcnVtOiAvbWF0Y2hlc2JyeWFudGFuZG1heQoobG93ZXJjYXNlLCBubyBzcGFjZXMsIHVzZSAnYW5kJyBpbnN0ZWFkIG9mICcmJyk="\n}</pre></body></html>); }

function renderMatchesBryantAndMay() { writeRawPage(<!DOCTYPE html><html><head><title>ShadowBoard 1999</title></head><body style="background-color: #000000; color: #00ff00; font-family: 'Courier New', Courier, monospace; padding: 40px;"><div style="border: 1px solid #00ff00; padding: 20px; max-width: 800px; margin: 0 auto;"><h2 style="text-align: center; border-bottom: 1px dashed #00ff00; padding-bottom: 10px;">GHOST_NET FORUM v1.4</h2><p><strong>POST #3239</strong> | AUTHOR: J.T. (1945)</p><p><strong>SUBJECT: The Final Secret</strong></p><p>They found the poetry book. I had to move the final piece of the puzzle somewhere permanent. Somewhere decentralized.</p><p>Look at the very first block of the chain created by Nakamoto (Block 0).</p><p>Buried in the raw hex data of the coinbase transaction is a newspaper headline.</p><p>The flag is the fourth, fifth, and sixth words of that headline (lowercase, no spaces).</p><br /><p style="text-align: right;"><em>// end of transmission</em></p></div></body></html>); }

function renderMidnightPortal() {
  writeRawPage(<!DOCTYPE html>
<html>
<head><title>Midnight Portal</title></head>
<body style="background:#050505; color:#00ff00; font-family:monospace; padding:50px;">
<script>
  if (!document.cookie.includes('session_token=')) {
    document.cookie = "session_token=eyJyb2xlIjoiZ3Vlc3QifQ==; path=/";
  }
  window.onload = function() {
    let msg = "<h2>ACCESS DENIED</h2><p>Parsing session_token... Role verified as <b>GUEST</b>.</p><p>Admin privileges required.</p>";
    if (document.cookie.includes('eyJyb2xlIjoiYWRtaW4ifQ==')) {
       msg = "<h2>AUTH ACCEPTED</h2><p>Welcome, Administrator.</p><a href='/midnightvault' style='color:#000; background:#00ff00; padding:10px; text-decoration:none;'>ENTER VAULT</a>";
    }
    document.getElementById('content').innerHTML = msg;
  }
</script>
<div id="content">Verifying...</div>
</body>
</html>);
}

function renderMidnightVault() {
  writeRawPage(<!DOCTYPE html>
<html>
<head><title>Midnight Vault</title></head>
<body style="background:#1a0000; color:#ff4444; font-family:monospace; padding:50px;">
<script>
  window.bypassVault = function(token) {
     if(token === btoa(navigator.userAgent)) {
         document.getElementById('vault-door').innerHTML = "BIOMETRIC ACCEPTED. <a href='/thesubnode' style='color:#fff;'>PROCEED TO SUBNODE</a>";
         return "Success";
     } else {
         console.error("Biometric mismatch. Token invalid.");
         return "Failed";
     }
  }
</script>
<h1 style="text-align:center;">VAULT LOCKED</h1>
<div id="vault-door" style="text-align:center;">
  <p>Biometric override required.</p>
  <p>Invoke global function <b>bypassVault(token)</b> via console.</p>
  <p><i>System Note: The token is the Base64 encoded string of your browser's exact User-Agent.</i></p>
</div>
</body>
</html>);
}

function renderTheSubnode() {
  writeRawPage(<!DOCTYPE html>
<html>
<head>
  <title>The Subnode</title>
  <meta name="pin-md5" content="02860d5b7fc4ba2f4dd17c0921dc8bfa">
</head>
<body style="background:#111; color:#eee; font-family:monospace; padding:40px;">
  <h2>DATABASE TERMINAL</h2>
  <p>Enter 5-digit PIN to decrypt sector location:</p>
  <input type="text" id="pin" />
  <button onclick="check()">SUBMIT</button>
  <div id="hidden-route" style="color:transparent; selection-background:transparent; margin-top:40px;">/thearchitectsblueprint</div>
  <script>
    function check() {
      if(document.getElementById('pin').value === '84921') {
        document.getElementById('hidden-route').style.color = '#111'; // Still hidden unless highlighted
        alert("Decrypted successfully. Highlight the space below this box to reveal the route.");
      } else {
        alert("INVALID PIN");
      }
    }
  </script>
</body>
</html>);
}

function renderTheArchitectsBlueprint() {
  writeRawPage(<!DOCTYPE html>
<html>
<head><title>The Blueprint</title></head>
<body style="background:#000; color:#0f0; font-family:monospace; padding:50px;">
  <h2>THE ARCHITECT'S TERMINAL</h2>
  <p>The final asset is locked in secure memory.</p>
  <p>To extract it, you must invoke the global function <b>extractFlag(param1, param2)</b> via your terminal console.</p>
  <ul>
    <li><b>Param 1:</b> A 5-letter string. The clearance code associated with the end of all things.</li>
    <li><b>Param 2:</b> An integer. The exact POST number from J.T. on the Ghost_Net Forum.</li>
  </ul>
  <script>
    window.extractFlag = function(p1, p2) {
      if (p1 === 'OMEGA' && p2 === 3239) {
          return "FLAG: thegrandarchitect";
      } else {
          return "CORRUPTION DETECTED. INVALID PARAMETERS.";
      }
    }
  </script>
</body>
</html>);
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
    case '/matchesbryantandmay': renderMatchesBryantAndMay(); break;
    case '/midnightportal': renderMidnightPortal(); break;
    case '/midnightvault': renderMidnightVault(); break;
    case '/thesubnode': renderTheSubnode(); break;
    case '/thearchitectsblueprint': renderTheArchitectsBlueprint(); break;
  }

  return null;
}
