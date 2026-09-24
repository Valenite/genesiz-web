import os
filepath = r"src\components\CipherQuestPages.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add to allowed routes array
allowed_routes = "'/icaruslogistics', '/chironmedical', '/chirondatabase', '/tartarus', '/clementine6895baronblood', "

if "'/icaruslogistics'" not in content[:1000]:
    content = content.replace("const cipherQuestPaths = [", "const cipherQuestPaths = [\n  " + allowed_routes)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated isCipherQuestPath array.")
