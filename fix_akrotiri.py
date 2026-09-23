import urllib.parse
import os

filepath = r"src\components\CipherQuestPages.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# I need to find the encoded string and replace it.
# Let's decode the whole thing, replace, and encode again.
# Wait, replacing just the substring in the file is easier if we know exactly what it is.
encoded_img = urllib.parse.quote('<img src="/on65nb.webp" alt="">')
encoded_comment = urllib.parse.quote('<!-- on65nb.webp -->')

if encoded_img in content:
    content = content.replace(encoded_img, encoded_comment)
    print("Replaced img with comment in CipherQuestPages.tsx")
else:
    print("Img not found!")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
