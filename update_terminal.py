import re

with open('src/components/TerminalConsole.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the schedule section in terminal
pattern = r"OCTOBER 5, 2026 SCHEDULE:.* Prize Ceremony & Closing"
new_schedule = """GENESIZ 2026 TIMELINE:
    OCT 05 (5 PM - 6 PM)   - BrainByte
    OCT 06-07 (6 PM-9 PM)  - AlgoArena
    OCT 08-09 (5 PM-8 PM)  - WebX & AppForge
    OCT 10-12 (12 AM ON)   - CipherQuest
    OCT 13-14 (5 PM ON)    - BedWarz
    OCT 15-17 (5 PM ON)    - Valorant Championship
    OCT 18 (6 PM - 8 PM)   - Surprise Event
    OCT 20-22              - Results Out"""

content = re.sub(pattern, new_schedule, content, flags=re.DOTALL)

with open('src/components/TerminalConsole.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated terminal schedule")
