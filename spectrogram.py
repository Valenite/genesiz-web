import numpy as np
import scipy.io.wavfile as wavfile
from PIL import Image, ImageDraw, ImageFont
import scipy.signal

text = "TARTARUS"
# nperseg=256 means 129 frequency bins.
# So height of image must be 129.
width, height = 400, 129
img = Image.new('L', (width, height), color=0)
d = ImageDraw.Draw(img)
try:
    font = ImageFont.truetype("arial.ttf", 80)
    d.text((10, 10), text, fill=255, font=font)
except:
    d.text((10, 10), text, fill=255)

img_array = np.array(img)
# Flip so text is right-side up in spectrogram (high freq at top)
img_array = np.flipud(img_array)

magnitude = img_array / 255.0
# Add a little noise so it sounds like static
magnitude += 0.05
# Enhance contrast
magnitude = np.clip(magnitude * 5, 0, 1)

# Generate random phase
phase = np.random.uniform(0, 2*np.pi, magnitude.shape)
complex_spec = magnitude * np.exp(1j * phase)

sample_rate = 22050
_, audio = scipy.signal.istft(complex_spec, fs=sample_rate, nperseg=256)

# Normalize
audio = audio / np.max(np.abs(audio))
audio_16 = np.int16(audio * 32767)

wavfile.write("public/benthic_transmission.wav", sample_rate, audio_16)
print("Wrote public/benthic_transmission.wav")
