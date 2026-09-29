import re

with open('src/data/eventsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# AlgoArena
content = content.replace('Oct 12 - 13 (6:00 PM IST)', 'Oct 6 - 7 (6:00 PM - 9:00 PM)')
content = content.replace('October 12 - 13, 2026', 'October 6 - 7, 2026')
content = content.replace('Evening from 6:00 PM IST', 'Evening 6:00 PM - 9:00 PM IST')
content = content.replace('Oct 12 @ 6:00 PM', 'Oct 6 @ 6:00 PM')
content = content.replace('Oct 13 @ 6:00 PM', 'Oct 7 @ 6:00 PM')

# Valorant
content = content.replace('Oct 5 - 7 (5:00 PM IST)', 'Oct 15 - 17 (5:00 PM ONWARDS)')
content = content.replace('October 5 - 7, 2026', 'October 15 - 17, 2026')
content = content.replace('from Oct 5 to Oct 7.', 'from Oct 15 to Oct 17.')
content = content.replace('Oct 5 @ 5:00 PM', 'Oct 15 @ 5:00 PM')
content = content.replace('Oct 6 @ 5:00 PM', 'Oct 16 @ 5:00 PM')
content = content.replace('Oct 7 @ 5:00 PM', 'Oct 17 @ 5:00 PM')

# Bedwarz
content = content.replace('Oct 8 - 9 (5:00 PM IST)', 'Oct 13 - 14 (5:00 PM ONWARDS)')
content = content.replace('October 8 - 9, 2026', 'October 13 - 14, 2026')
content = content.replace('from Oct 8 to Oct 9.', 'from Oct 13 to Oct 14.')
content = content.replace('Oct 8 @ 5:00 PM', 'Oct 13 @ 5:00 PM')
content = content.replace('Oct 9 @ 5:00 PM', 'Oct 14 @ 5:00 PM')

# Brainbyte
content = content.replace('Oct 10 (5:00 PM IST)', 'Oct 5 (5:00 PM - 6:00 PM)')
content = content.replace('October 10, 2026', 'October 5, 2026')
content = content.replace('Commences Oct 10 in the evening at 5:00 PM IST.', 'Commences Oct 5 in the evening at 5:00 PM IST.')

# AppForge and WebX
content = content.replace('Oct 10 Eve - Oct 11 Night', 'Oct 8 - 9 (5:00 PM - 8:00 PM)')
content = content.replace('October 10 - 11, 2026', 'October 8 - 9, 2026')
content = content.replace('Prompt released Oct 10 Eve (Discord) | Deadline Oct 11 Night', 'Prompt released Oct 8 (Discord) | Deadline Oct 9')
content = content.replace('Oct 10 in the evening', 'Oct 8 in the evening')
content = content.replace('Oct 11 at night', 'Oct 9 at night')
content = content.replace('Oct 10 Evening', 'Oct 8 Evening')
content = content.replace('Oct 10 Eve', 'Oct 8 Eve')
content = content.replace('Full Day Oct 11', 'Full Day Oct 9')
content = content.replace('Oct 11 Night', 'Oct 9 Night')
content = content.replace('(Oct 11)', '(Oct 9)')
content = content.replace('Oct 10 evening', 'Oct 8 evening')

# Surprise Event
content = content.replace('Commences Oct 14', 'Commences Oct 18 (6:00 PM - 8:00 PM)')
content = content.replace('Commences October 14, 2026', 'October 18, 2026')
content = content.replace('Commences on October 14, 2026.', 'Commences on October 18, 2026.')
content = content.replace('Oct 14', 'Oct 18')

with open('src/data/eventsData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated eventsData dates")
