import base64
import binascii

# --- BOOK CIPHER GENERATOR ---
text_paragraphs = [
    "Icarus Logistics was founded on the principle of unparalleled global reach. We deliver where others cannot. Our specialized fleets are equipped for extreme environments, ensuring your assets remain completely secure.",
    "Innovation drives our core infrastructure. By acquiring cutting edge subsidiaries, we maintain a technological monopoly over the transport sector. The future is built on highly encrypted, decentralized logistics networks.",
    "Security is our absolute highest priority. We employ advanced cryptographic protocols and ex-military personnel. When you entrust us with your cargo, it disappears from the public grid until it reaches its final destination."
]

target_word = "chironmedical"
cipher_coords = []

# Build a map of letter -> list of (para_idx, word_idx, char_idx)
letter_map = {}
for p_idx, para in enumerate(text_paragraphs):
    words = para.split()
    for w_idx, word in enumerate(words):
        clean_word = "".join(c for c in word if c.isalpha()).lower()
        for c_idx, char in enumerate(clean_word):
            if char not in letter_map:
                letter_map[char] = []
            letter_map[char].append(f"[{p_idx+1}-{w_idx+1}-{c_idx+1}]")

# Pick first available for each
for char in target_word:
    cipher_coords.append(letter_map[char][0])

cipher_string = " // ".join(cipher_coords)

# --- VIGENERE GENERATOR ---
def encrypt_vigenere(plaintext, key):
    key = key.upper()
    ciphertext = ""
    key_idx = 0
    for char in plaintext:
        if char.isalpha():
            shift = ord(key[key_idx % len(key)]) - 65
            if char.islower():
                ciphertext += chr((ord(char) - 97 + shift) % 26 + 97)
            else:
                ciphertext += chr((ord(char) - 65 + shift) % 26 + 65)
            key_idx += 1
        else:
            ciphertext += char
    return ciphertext

vig_plain = "Aegis blacksite access requires the name of the nineteen fifty eight operation that detonated nuclear weapons high in the atmosphere. No spaces."
vig_cipher = encrypt_vigenere(vig_plain, "CHARON")
b64_cipher = base64.b64encode(vig_cipher.encode()).decode()
hex_cipher = binascii.hexlify(b64_cipher.encode()).decode()

# --- HTML TEMPLATES ---
html_icarus = f'''<!DOCTYPE html>
<html>
<head><title>Icarus Logistics | Global Supply</title></head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f9; color: #333;">
    <header style="background-color: #002244; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 2.5em; letter-spacing: 2px;">ICARUS LOGISTICS</h1>
        <p style="margin: 5px 0 0 0; font-style: italic;">We deliver where others cannot.</p>
    </header>
    <nav style="background-color: #003366; padding: 10px; text-align: center;">
        <a href="#" style="color: white; margin: 0 15px; text-decoration: none; font-weight: bold;">Home</a>
        <a href="#" style="color: white; margin: 0 15px; text-decoration: none; font-weight: bold;">About Us</a>
        <a href="#" style="color: white; margin: 0 15px; text-decoration: none; font-weight: bold;">Investors</a>
        <a href="#" style="color: white; margin: 0 15px; text-decoration: none; font-weight: bold;">Contact</a>
    </nav>
    <div style="max-width: 1000px; margin: 40px auto; padding: 20px; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h2>Corporate History & Mission</h2>
        <p>{text_paragraphs[0]}</p>
        <p>{text_paragraphs[1]}</p>
        <p>{text_paragraphs[2]}</p>
        
        <hr style="margin: 40px 0;">
        
        <h2>Investor Relations</h2>
        <p>Following our successful Series C funding round, we are proud to announce the silent acquisition of a leading bio-research firm. This integration allows us to transport Class-4 biological assets with unprecedented stability.</p>
        
        <div style="background-color: #eef; padding: 15px; border-left: 4px solid #002244; margin-top: 30px;">
            <p><strong>ENCRYPTED ROUTING DIRECTIVE (INTERNAL USE ONLY):</strong></p>
            <p style="font-family: monospace; letter-spacing: 1px; word-break: break-all;">{cipher_string}</p>
            <p style="font-size: 0.8em; color: #666;">* Route coordinates format: [Paragraph - Word - Letter]. Access requires manual decoding.</p>
        </div>
    </div>
    <footer style="text-align: center; padding: 20px; background-color: #002244; color: white; margin-top: 40px;">
        &copy; 2024 Icarus Logistics Corp. All rights reserved. | <a href="#" style="color:#aaa;">Employee Login</a>
    </footer>
</body>
</html>'''

html_chiron = '''<!DOCTYPE html>
<html>
<head><title>Chiron Medical | Secure Portal</title></head>
<body style="background-color: #0d1b2a; color: #e0e1dd; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
    <div style="background-color: #1b263b; padding: 40px; border-radius: 8px; box-shadow: 0 10px 20px rgba(0,0,0,0.5); width: 400px;">
        <h2 style="text-align: center; border-bottom: 2px solid #415a77; padding-bottom: 10px; margin-bottom: 30px;">CHIRON MEDICAL DATABASE</h2>
        
        <div id="login-form">
            <p style="font-size: 0.9em; color: #778da9; text-align: justify; margin-bottom: 20px;">
                <i>Security Notice: Passwords have been reset. Your new password is the name of the protein that allows tardigrades to survive extreme radiation, followed immediately by the exact depth (in meters) of the Challenger Deep as measured by the 2010 UNH-CCOM survey. (Lowercase, no spaces).</i>
            </p>
            <input type="text" id="usr" placeholder="Username (Employee ID)" style="width: 100%; padding: 10px; margin-bottom: 15px; border: none; border-radius: 4px; background: #e0e1dd; box-sizing: border-box;">
            <input type="password" id="pwd" placeholder="Password" style="width: 100%; padding: 10px; margin-bottom: 20px; border: none; border-radius: 4px; background: #e0e1dd; box-sizing: border-box;">
            <button onclick="checkAuth()" style="width: 100%; padding: 10px; background-color: #415a77; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">AUTHENTICATE</button>
            <p id="err" style="color: #ef233c; text-align: center; margin-top: 15px; font-weight: bold;"></p>
        </div>
    </div>

    <script>
        function checkAuth() {
            var u = document.getElementById('usr').value.toLowerCase().trim();
            var p = document.getElementById('pwd').value.toLowerCase().trim();
            if (p === "dsup10994") {
                window.location.href = "/chirondatabase";
            } else {
                document.getElementById('err').innerText = "ERROR: INVALID CREDENTIALS.";
            }
        }
    </script>
</body>
</html>'''

html_chirondb = f'''<!DOCTYPE html>
<html>
<head><title>Chiron DB | Asset Logs</title></head>
<body style="background-color: #000; color: #0f0; font-family: 'Courier New', Courier, monospace; padding: 20px;">
    <h1>CHIRON MEDICAL - DEEP STORAGE LOGS</h1>
    <hr style="border-color: #0f0;">
    
    <h3>LOG ENTRY #001 - ANOMALY CONTAINMENT</h3>
    <p>The asset recovered from the Amazon Brigantine (1872) remains stable. Cellular regeneration exceeds 400%.</p>
    
    <h3>LOG ENTRY #002 - SECURITY PROTOCOL UPDATE</h3>
    <p>All Vigenere encryption keys have been updated. The current active key is the surname of the mythological figure who ferried souls across the river Styx.</p>
    
    <h3>LOG ENTRY #003 - TRANSPORT LOG</h3>
    <p>Icarus Logistics has confirmed receipt of the asset. It is being moved to the Aegis facility for permanent cold storage.</p>
    
    <h3>LOG ENTRY #004 - CORRUPTED TRANSMISSION</h3>
    <p>The following intercepted packet was heavily encrypted prior to database failure. Analysis indicates Hexadecimal wrapping around Base64, enclosing a Vigenere ciphertext.</p>
    <div style="background-color: #111; padding: 15px; border: 1px solid #0f0; word-break: break-all;">
        {hex_cipher}
    </div>
</body>
</html>'''

html_aegis = '''<!DOCTYPE html>
<html>
<head><title>AEGIS BLACKSITE TERMINAL</title></head>
<body style="background-color: #2b0000; color: #ff4d4d; font-family: monospace; text-align: center; padding-top: 100px;">
    <h1 style="font-size: 3em; margin-bottom: 10px;">AEGIS COMMAND TERMINAL</h1>
    <h3 style="margin-top: 0;">RESTRICTED MILITARY NETWORK</h3>
    
    <div style="margin: 50px auto; max-width: 600px; background-color: #1a0000; padding: 30px; border: 2px solid #ff4d4d;">
        <p style="font-size: 1.2em; margin-bottom: 30px;">AUTHORIZATION REQUIRED.</p>
        <p>Enter the name of the ship that served as the command vessel for Task Force 88 during this operation (lowercase, no spaces):</p>
        <input type="text" id="flag" style="padding: 10px; width: 80%; background: #000; color: #ff4d4d; border: 1px solid #ff4d4d; margin-bottom: 20px; font-size: 1.2em; text-align: center;">
        <br>
        <button onclick="verify()" style="padding: 10px 30px; background: #ff4d4d; color: #000; border: none; font-size: 1.2em; cursor: pointer; font-weight: bold;">SUBMIT</button>
        <p id="res" style="margin-top: 20px; font-weight: bold; font-size: 1.5em;"></p>
    </div>

    <script>
        function verify() {
            var v = document.getElementById('flag').value.toLowerCase().replace(/\\s/g, '');
            if (v === 'ussnortonsound') {
                document.getElementById('res').style.color = '#00ff00';
                document.getElementById('res').innerText = "ACCESS GRANTED. FLAG: ussnortonsound";
            } else {
                document.getElementById('res').style.color = '#ff4d4d';
                document.getElementById('res').innerText = "ACCESS DENIED. LETHAL COUNTERMEASURES ENGAGED.";
            }
        }
    </script>
</body>
</html>'''

# --- GENERATE REACT COMPONENT ---
react_code = f"""export function isCipherQuestPath() {{
  const pathname = window.location.pathname.replace(/\\/$/, '');
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
    '/icaruslogistics',
    '/chironmedical',
    '/chirondatabase',
    '/operationargus'
  ].includes(pathname);
}}

function writeRawPage(html: string) {{
  document.open();
  document.write(html);
  document.close();
}}

function renderPosterchild() {{ writeRawPage(<!DOCTYPE html><html><head><title>posterchild</title></head><body><!-- child support ended here --><!-- 1969 had confidence --><img src="https://file.garden/aqFpFUAG_0sBTo_p/itlies.jpg" /><br />not the child.<br />the poster lied.</body></html>); }}
function renderEastOfJava() {{ writeRawPage(<!DOCTYPE html><html><head><title>eastofjava</title></head><body><!-- the map is gaslighting you --><!-- language people will overthink this --><!-- coffee people will not --><img src="https://file.garden/aqFpFUAG_0sBTo_p/eeee.jpg" /><br />EAST OF JAVA<br /><br />ok but what if it wasn't.<br /><br />one direction was enough.</body></html>); }}
function renderLuwak() {{ writeRawPage(<!DOCTYPE html><html><head><title>luwak</title></head><body><!-- civet was framed --><!-- ask the loud box what the cat became --><!-- meow meow capitalism -->LUWAK<br /><br />expensive animal water.<br /><br />the cat changed names before the old film kept singing.</body></html>); }}
function renderMaude() {{ writeRawPage(<!DOCTYPE html><html><head><title>maude</title></head><body><!-- harold did not stay on land --><!-- captain bait is still bait --><!-- covers are not originals --><!-- token A is the original, uppercase -->MAUDE<br /><br />wrong half.<br /><br />the boy went swimming with a captain.<br /><br />not the captain.<br />not the original.</body></html>); }}
function renderMayQueen() {{ writeRawPage(<!DOCTYPE html><html><head><title>mayqueen</title></head><body><!-- may is acting like a title now --><!-- flowers are not always romantic --><!-- token B is the band, uppercase --><img src="https://file.garden/aqFpFUAG_0sBTo_p/dreamgoth.webp" /><br />MAY QUEEN<br /><br />not a wedding.<br />not a filter.<br />wrong festival.<br /><br />the crown became louder than the season.</body></html>); }}
function renderUnderPressure() {{ writeRawPage(<!DOCTYPE html><html><head><title>underpressure</title></head><body><!-- two tokens opened the room --><!-- sample the pressure, don't worship it --><!-- final is the artist, lowercase, no space -->UNDER PRESSURE<br /><br />not them.<br />not the pressure.<br /><br />too cold.<br />too babyish.<br /><br />who made the borrowed pressure famous?</body></html>); }}
function renderLostManifest() {{ writeRawPage(<!DOCTYPE html><html><head><title>the lost manifest</title></head><body><!-- she sailed from 40.7128 N 74.0060 W --><!-- her destination was 44.4056 N 8.9463 E --><!-- she never arrived -->She was found with the table still set for dinner.<br />The lifeboat was gone. Everything else remained.<br />No one knows why.<br /><br /><a href="https://file.garden/aqlE05Uj5RKrOkO_/manifest.jpg" download="manifest.jpg">[ manifest.jpg ]</a></body></html>); }}
function renderTheBloodCargo() {{ writeRawPage(<!DOCTYPE html><html><head><title>the blood cargo</title></head><body style="background:#0a0a0a;color:#b0a090;font-family:monospace;padding:40px;line-height:2;"><!-- VII --><pre>CARGO REGISTRY BRIGANTINE AMAZON NOVEMBER EIGHTEEN NAMED\\nSEVENTY TWO OUTBOUND FROM NEW YORK BY\\nBOUND FOR GENOA CARRYING OF COMMERCIAL THE\\nONE THOUSAND SEVEN HUNDRED ONE BARRELS DOCTOR\\nALCOHOL CERTIFIED PURE AND SEALED BY OF\\nPORT AUTHORITY CAPTAIN BENJAMIN BRIGGS COMMANDING BAKER\\nWIFE SARAH ELIZABETH ABOARD ALSO CHILD STREET\\nSOPHI PROVISIONS FOR NINETY DAYS LOGGED CREW\\n\\nSIGNED AND WITNESSED UNDER SEAL OF THE\\nPORT OF NEW YORK NOVEMBER EIGHTEEN SEVENTY\\nTWO BY HARBOUR AUTHORITY AND CUSTOMS OFFICIAL\\nALL GOODS ACCOUNTED FOR AND DUTY PAID\\nCARGO MANIFEST HOLDS LEGAL STANDING UNDER MARITIME\\nLAW OF THE UNITED STATES AND CARRIES\\nFULL INSURANCE DECLARATION ATTACHED ON SEPARATE DOCUMENT</pre></body></html>); }}
function renderTheSomertonMan() {{ writeRawPage(<!DOCTYPE html><html><head><title>API Response</title></head><body style="background-color: #0d1117; color: #c9d1d9; font-family: monospace; padding: 20px;"><pre>{{\\n  "case_id": "SA-1948-0312",\\n  "status": "unsolved",\\n  "victim": "unknown",\\n  "evidence_status": "CORRUPTED",\\n  "system_note": "The evidence file was damaged during database migration. A fragmented buffer was recovered.",\\n  "deleted_buffer": "UkVTVFJJQ1RFRCBBQ0NFU1MgLSBTT1VUSCBBVVNUUkFMSUFOIFBPTElDRQpUaGUgcG9ldHJ5IGJvb2sgd2Fzbid0IHRoZSBvbmx5IHRoaW5nIHRoZSBTb21lcnRvbiBNYW4gY2FycmllZC4KSGUgaGFkIGEgaGFsZi1lbXB0eSBib3ggb2YgbWF0Y2hlcyBpbiBoaXMgcG9ja2V0LgpXaGF0IHdhcyB0aGUgZXhhY3QgYnJhbmQgbmFtZSBvZiB0aG9zZSBtYXRjaGVzPwpOYXZpZ2F0ZSB0byB0aGUgc2hhZG93IGZvcnVtOiAvbWF0Y2hlc2JyeWFudGFuZG1heQoobG93ZXJjYXNlLCBubyBzcGFjZXMsIHVzZSAnYW5kJyBpbnN0ZWFkIG9mICcmJyk="\\n}}</pre></body></html>); }}
function renderMatchesBryantAndMay() {{ writeRawPage(<!DOCTYPE html><html><head><title>ShadowBoard 1999</title></head><body style="background-color: #000000; color: #00ff00; font-family: 'Courier New', Courier, monospace; padding: 40px;"><div style="border: 1px solid #00ff00; padding: 20px; max-width: 800px; margin: 0 auto;"><h2 style="text-align: center; border-bottom: 1px dashed #00ff00; padding-bottom: 10px;">GHOST_NET FORUM v1.4</h2><p><strong>POST #3239</strong> | AUTHOR: J.T. (1945)</p><p><strong>SUBJECT: The Final Secret</strong></p><p>They found the poetry book. I had to move the final piece of the puzzle somewhere permanent. Somewhere decentralized.</p><p>Look at the very first block of the chain created by Nakamoto (Block 0).</p><p>Buried in the raw hex data of the coinbase transaction is a newspaper headline.</p><p>The flag is the fourth, fifth, and sixth words of that headline (lowercase, no spaces).</p><br /><p style="text-align: right;"><em>// end of transmission</em></p></div></body></html>); }}

function renderIcarusLogistics() {{
  writeRawPage({html_icarus});
}}

function renderChironMedical() {{
  writeRawPage({html_chiron});
}}

function renderChironDatabase() {{
  writeRawPage({html_chirondb});
}}

function renderOperationArgus() {{
  writeRawPage({html_aegis});
}}

export function CipherQuestPage() {{
  const pathname = window.location.pathname.replace(/\\/$/, '');
  switch (pathname) {{
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
    case '/icaruslogistics': renderIcarusLogistics(); break;
    case '/chironmedical': renderChironMedical(); break;
    case '/chirondatabase': renderChironDatabase(); break;
    case '/operationargus': renderOperationArgus(); break;
  }}
  return null;
}}
"""

with open(r'C:\Users\user\.gemini\antigravity\scratch\genesiz-web\src\components\CipherQuestPages.tsx', 'w', encoding='utf8') as f:
    f.write(react_code)
print("Files generated and overwritten successfully.")
