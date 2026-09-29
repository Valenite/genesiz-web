import re

with open('src/data/faqData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('taking place on October 5, 2026', 'taking place from October 5 - 22, 2026')
content = content.replace('4-day digital symposium via our secure Discord infrastructure (October 5 - 9)', '3-day digital symposium via our secure Discord infrastructure (October 10 - 12)')
content = content.replace('4-day online CipherQuest', '3-day online CipherQuest')
content = content.replace('4 days (96 consecutive hours), commencing on October 5, 2026 at 09:00 AM IST.', '3 days (72 consecutive hours), commencing on October 10, 2026 at 12:00 AM IST.')

with open('src/data/faqData.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated FAQ dates")
