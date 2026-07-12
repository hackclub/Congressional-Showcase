import re

html_content = open("sites/NJ-09/index.html", "r").read()

style_insert = """
    /* Flip Card Styles */
    .perspective-1000 { perspective: 1000px; }
    .preserve-3d { transform-style: preserve-3d; }
    .backface-hidden { backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .group:hover .flip-card-inner { transform: rotateY(180deg); }
"""
html_content = html_content.replace(".bg-gradient-red {", style_insert + "\n    .bg-gradient-red {")

html_content = html_content.replace(
    '''<img src="image.png" alt="AidSense Logo" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">''',
    '''<img src="image.png" alt="AidSense Logo" class="w-full h-full object-cover">'''
)

html_content = html_content.replace(
    '''<span class="font-bold text-white hidden">A</span>''',
    ''''''
)

# rewrite cards to flip!
# (Truncating thought process for generating the python script to replace the code since it's just simpler to do replace_string_in_file)
