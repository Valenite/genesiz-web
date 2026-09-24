import urllib.parse
import os

filepath = r"src\components\CipherQuestPages.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure we don't duplicate
if "'/icaruslogistics'" not in content:
    content = content.replace("'/operationargus',", "'/operationargus',\n    '/icaruslogistics',\n    '/chironmedical',\n    '/chirondatabase',\n    '/tartarus',\n    '/clementine6895baronblood',")

def encode_html(html_str):
    return urllib.parse.quote(html_str)

pages = {
    '/icaruslogistics': """<!DOCTYPE html>
<html>
<head><title>ICARUS LOGISTICS</title></head>
<body style="background:#000; color:#fff; font-family:monospace; padding:40px;">
ICARUS LOGISTICS - ROUTING DIRECTIVE<br><br>
[1-1-2] // [1-6-2] // [1-1-1] // [2-3-4] // [3-1-5] // [4-2-1] // [5-6-7] // [1-8-2] // [2-9-1] // [4-4-4] // [5-1-2] // [6-2-3] // [7-7-7]<br><br>
Protocol: Paragraph. Word. Letter.
</body>
</html>""",

    '/chironmedical': """<!DOCTYPE html>
<html>
<head><title>Chiron Medical</title></head>
<body style="background:#000; color:#0f0; font-family:monospace; padding:40px; display:flex; flex-direction:column; align-items:center; margin-top:100px;">
  <h2>CHIRON MEDICAL - SECURE PORTAL</h2>
  <p style="max-width: 600px; text-align:center;">Authentication Protocol: Biometric resilience marker (radiation) + Maximum oceanic depth (2010 UNH-CCOM / meters).</p>
  <input type="password" id="pwd" style="background:#111; color:#0f0; border:1px solid #0f0; padding:10px; margin:20px; font-family:monospace; width:300px;" autocomplete="off" />
  <button onclick="if(document.getElementById('pwd').value.toLowerCase().replace(/\s/g,'')==='dsup10994'){window.location.href='/chirondatabase'}else{alert('ACCESS DENIED')}" style="background:#0f0; color:#000; border:none; padding:10px 20px; font-family:monospace; font-weight:bold; cursor:pointer;">LOGIN</button>
</body>
</html>""",

    '/chirondatabase': """<!DOCTYPE html>
<html>
<head><title>Chiron Database</title></head>
<body style="background:#000; color:#0f0; font-family:monospace; padding:40px;">
CHIRON DATABASE - ACCESS GRANTED<br><br>
Log Entry 002: ...Active key: The ferryman of the river Styx.<br><br>
Log Entry 004: ...Multi-layer encryption detected: 16-symbol outer shell, 64-symbol transport layer, Styx cipher core.<br><br>
<div style="word-wrap: break-word; max-width: 800px; color:#fff;">
51317054566b6767525564545431525052307457546942555130464955464a4555314575494652575655745851556b675155386753315a5349456c5a52565a5a49453545526c4e4b4c694249565563675331564656564a5256534250567942495655636751556c4c5430465649456858556c64485653343d
</div>
</body>
</html>""",

    '/tartarus': """<!DOCTYPE html>
<html>
<head><title>TARTARUS</title></head>
<body style="background:#000; color:#fff; font-family:monospace; padding:40px;">
TARTARUS<br><br>
1. Project Azorian. The capture vehicle. Lockheed's nickname for the claw.<br><br>
2. Battle off Samar. The deepest shipwreck discovered in 2022. The exact depth in meters.<br><br>
3. Kola Superdeep Borehole hoax. The 1972 cinematic source of the screaming souls.
</body>
</html>""",

    '/clementine6895baronblood': """<!DOCTYPE html>
<html>
<head><title>CLEARANCE</title></head>
<body style="background:#000; color:#fff; font-family:monospace; padding:40px;">
1958. Task Force 88. High-altitude nuclear detonations over the South Atlantic. Identify the operation.
</body>
</html>"""
}

insert_cases = ""
for route, html in pages.items():
    if f"case '{route}':" not in content:
        insert_cases += f"      case '{route}': writeRawPage('{encode_html(html)}'); break;\n"

if insert_cases:
    content = content.replace("case '/operationargus':", insert_cases + "      case '/operationargus':")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated CipherQuestPages.tsx with Level 4 routes.")
