import re

with open("sites/NJ-09/index.html", "r") as f:
    html = f.read()

# 1. Add CSS
flip_css = """
    /* Flip Card Styles */
    .perspective-1000 { perspective: 1000px; }
    .preserve-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .flip-card-inner { transition: transform 0.6s; transform-style: preserve-3d; }
    .group:hover .flip-card-inner { transform: rotateY(180deg); }
"""
if ".perspective-1000" not in html:
    html = html.replace('.bg-gradient-red {', flip_css + '\n    .bg-gradient-red {')

# 2. Remove the onerror from the images to force them to show up
html = re.sub(r'onerror="this[^"]+"', '', html)
html = html.replace('<span class="font-bold text-white hidden">A</span>', '')
html = re.sub(r'<span class="text-xl font-bold text-white hidden">.</span>', '', html)

# 3. Rewrite the 4 cards. They all follow the pattern from `<a ... href="...linkedin...">` to `</a>`.
# It's easier to replace them with replace_string_in_file. I will write them to a temp file and replace.
with open("sites/NJ-09/index.html", "w") as f:
    f.write(html)

print("success")
