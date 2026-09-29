import re

with open('src/components/GenesizChatbot.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_str = "GENESIZ 2026 event dates:\\n• Valorant: Oct 5–7 (5 PM IST daily)\\n• Bedwarz: Oct 8–9 (5 PM IST daily)\\n• CipherQuest: Oct 10–12 (48-hour hunt)\\n• Brainbyte: Oct 10 (5 PM IST)\\n• AppForge & WebX: Oct 10–11\\n• AlgoArena: Oct 12–13 (6 PM IST)\\n• Surprise?!: Oct 14\\n\\nAll updates posted on Discord!"

new_str = "GENESIZ 2026 event dates:\\n• BrainByte: Oct 5 (5-6 PM)\\n• AlgoArena: Oct 6-7 (6-9 PM)\\n• WebX & AppForge: Oct 8-9 (5-8 PM)\\n• CipherQuest: Oct 10-12 (12 AM onwards)\\n• BedWarz: Oct 13-14 (5 PM onwards)\\n• Valorant: Oct 15-17 (5 PM onwards)\\n• Surprise Event: Oct 18 (6-8 PM)\\n• Results Out: Oct 20-22\\n\\nAll updates posted on Discord!"

# We will use regex to find the string starting with GENESIZ 2026 event dates and ending with Discord!
pattern = r"GENESIZ 2026 event dates:.*?All updates posted on Discord!"
content = re.sub(pattern, new_str, content, flags=re.DOTALL)

with open('src/components/GenesizChatbot.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated chatbot dates")
