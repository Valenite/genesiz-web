import urllib.parse
import os

filepath = r"src\components\CipherQuestPages.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

transient_html = """<!DOCTYPE html>
<html>
<head>
<title>TRANSIENT</title>
</head>
<body>
TRANSIENT<br><br>
9/8 8/8 7/8<br><br>
987<br><br>
the last one still calls.<br><br>
<a href="/stationlog.txt">stationlog.txt</a>
</body>
</html>"""

akrotiri_html = """<!DOCTYPE html>
<html>
<head>
<title>AKROTIRI</title>
</head>
<body>
AKROTIRI<br><br>
299<br><br>
the thing never said its name.<br><br>
the bear kept one necessity.<br><br>
oxfvd2<br><br>
ajc0YM0z<br><br>
<img src="/on65nb.webp" alt=""><br><br>
two voices. no spaces.<br><br>
NWTGRZWAOPSHBM
</body>
</html>"""

t_encoded = urllib.parse.quote(transient_html)
a_encoded = urllib.parse.quote(akrotiri_html)

insert_string = f"      case '/transient': writeRawPage('{t_encoded}'); break;\n      case '/akrotiri': writeRawPage('{a_encoded}'); break;\n"

content = content.replace("case '/operationargus':", insert_string + "      case '/operationargus':")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated CipherQuestPages.tsx")
