import base64
import binascii

plaintext = "ASSET RELOCATION CONFIRMED. ROUTING TO THE GREEK ABYSS. THE DUNGEON OF THE TITANS AWAITS."
key = "CHARON"

# Vigenere encryption
def vigenere_encrypt(text, key):
    encrypted = []
    key_idx = 0
    for char in text:
        if char.isalpha():
            shift = ord(key[key_idx % len(key)].upper()) - ord('A')
            base = ord('A') if char.isupper() else ord('a')
            encrypted_char = chr((ord(char) - base + shift) % 26 + base)
            encrypted.append(encrypted_char)
            key_idx += 1
        else:
            encrypted.append(char)
    return "".join(encrypted)

vig = vigenere_encrypt(plaintext, key)
print("Vigenere:", vig)

b64 = base64.b64encode(vig.encode('utf-8')).decode('utf-8')
print("Base64:", b64)

hex_str = binascii.hexlify(b64.encode('utf-8')).decode('utf-8')
print("Hex:", hex_str)
