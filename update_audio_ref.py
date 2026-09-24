import os
filepath = r"src\components\Level4.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('src="/benthic_transmission.wav"', 'src="/a9f8b7c6d5e4f3.wav"')
# Also remove the text "BENTHIC_TRANSMISSION.WAV" to make it even more hidden
content = content.replace('<p style={{ color: \'#555\', fontSize: \'0.8em\', marginBottom: \'10px\' }}>BENTHIC_TRANSMISSION.WAV</p>', '<p style={{ color: \'#555\', fontSize: \'0.8em\', marginBottom: \'10px\' }}>[ AUDIO STREAM ]</p>')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Level4.tsx audio reference.")
