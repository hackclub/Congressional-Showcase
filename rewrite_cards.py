import re

with open("sites/NJ-09/index.html", "r") as f:
    html = f.read()

new_cards = """
          <!-- Sparsh Roy -->
          <div data-aos="fade-up" data-aos-delay="0" class="group perspective-1000 h-[350px] w-full">
            <div class="relative w-full h-full flip-card-inner rounded-3xl cursor-pointer">
              <!-- FRONT -->
              <div class="absolute inset-0 backface-hidden glass-card rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-lg border border-white/10">
                <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10"></div>
                <div class="relative z-10 flex justify-between items-start mb-8">
                  <div class="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/20">
                    <img src="./sparsh.png" alt="Sparsh Roy" class="w-full h-full object-cover">
                  </div>
                  <a href="https://www.linkedin.com/in/roysparsh/" target="_blank" class="p-2.5 rounded-full bg-white/5 text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-colors duration-300 shadow-md">
                    <i data-lucide="linkedin" class="w-5 h-5"></i>
                  </a>
                </div>
                <div class="relative z-10 mt-auto">
                  <h3 class="text-3xl font-bold mb-1 text-white">Sparsh Roy</h3>
                  <p class="text-red-400 text-sm font-semibold uppercase tracking-wider">Hopewell Valley Central High School</p>
                  <p class="text-gray-400 text-sm mt-3 animate-pulse flex items-center gap-2"><i data-lucide="mouse-pointer-click" class="w-4 h-4"></i> Hover to read bio</p>
                </div>
              </div>
              <!-- BACK -->
              <div class="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-3xl p-6 flex flex-col justify-center overflow-auto shadow-lg border border-white/10 bg-black/80">
                <p class="text-gray-200 text-sm leading-relaxed">Hey, my name is Sparsh Roy and I’m from Hopewell, New Jersey. (Member and Current President of the Hopewell Valley Class of 2028) I’m really interested in computer science and enjoy building apps and working on tech projects that can actually help people. I like exploring new ideas, solving problems, and being involved in things like debate and STEM activities. I’m always looking for ways to learn, create, and make an impact through what I build.</p>
              </div>
            </div>
          </div>

          <!-- Mohammed Gezzaz -->
          <div data-aos="fade-up" data-aos-delay="100" class="group perspective-1000 h-[350px] w-full">
            <div class="relative w-full h-full flip-card-inner rounded-3xl cursor-pointer">
              <!-- FRONT -->
              <div class="absolute inset-0 backface-hidden glass-card rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-lg border border-white/10">
                <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10"></div>
                <div class="relative z-10 flex justify-between items-start mb-8">
                  <div class="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/20">
                    <img src="./mohammed.png" alt="Mohammed Gezzaz" class="w-full h-full object-cover">
                  </div>
                  <a href="https://www.linkedin.com/in/mohammed-gezzaz-6638b9354/" target="_blank" class="p-2.5 rounded-full bg-white/5 text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-colors duration-300 shadow-md">
                    <i data-lucide="linkedin" class="w-5 h-5"></i>
                  </a>
                </div>
                <div class="relative z-10 mt-auto">
                  <h3 class="text-3xl font-bold mb-1 text-white">Mohammed Gezzaz</h3>
                  <p class="text-red-400 text-sm font-semibold uppercase tracking-wider">High Tech High School, NJ</p>
                  <p class="text-gray-400 text-sm mt-3 animate-pulse flex items-center gap-2"><i data-lucide="mouse-pointer-click" class="w-4 h-4"></i> Hover to read bio</p>
                </div>
              </div>
              <!-- BACK -->
              <div class="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-3xl p-6 flex flex-col justify-center overflow-auto shadow-lg border border-white/10 bg-black/80">
                <p class="text-gray-200 text-sm leading-relaxed">Hello my name is Mohammed Gezzaz and I am from New Jersey. I am currently a junior at High Tech High School. I am passionate about coding and helping out communities whether through volunteering or developing apps.</p>
              </div>
            </div>
          </div>

          <!-- Aarya Patel -->
          <div data-aos="fade-up" data-aos-delay="200" class="group perspective-1000 h-[350px] w-full">
            <div class="relative w-full h-full flip-card-inner rounded-3xl cursor-pointer">
              <!-- FRONT -->
              <div class="absolute inset-0 backface-hidden glass-card rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-lg border border-white/10">
                <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10"></div>
                <div class="relative z-10 flex justify-between items-start mb-8">
                  <div class="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/20">
                    <img src="./aarya.png" alt="Aarya Patel" class="w-full h-full object-cover">
                  </div>
                  <a href="https://www.linkedin.com/in/aarya-patel-8901262a5/" target="_blank" class="p-2.5 rounded-full bg-white/5 text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-colors duration-300 shadow-md">
                    <i data-lucide="linkedin" class="w-5 h-5"></i>
                  </a>
                </div>
                <div class="relative z-10 mt-auto">
                  <h3 class="text-3xl font-bold mb-1 text-white">Aarya Patel</h3>
                  <p class="text-red-400 text-sm font-semibold uppercase tracking-wider">High Tech High School, NJ</p>
                  <p class="text-gray-400 text-sm mt-3 animate-pulse flex items-center gap-2"><i data-lucide="mouse-pointer-click" class="w-4 h-4"></i> Hover to read bio</p>
                </div>
              </div>
              <!-- BACK -->
              <div class="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-3xl p-6 flex flex-col justify-center overflow-auto shadow-lg border border-white/10 bg-black/80">
                <p class="text-gray-200 text-sm leading-relaxed">Hello, my name is Aarya Patel and I am from New Jersey. I am currently a Junior in high school with a strong interest in engineering and computer science. I am passionate about using technology to create meaningful solutions and help others learn.</p>
              </div>
            </div>
          </div>

          <!-- Arhaan Shah -->
          <div data-aos="fade-up" data-aos-delay="300" class="group perspective-1000 h-[350px] w-full">
            <div class="relative w-full h-full flip-card-inner rounded-3xl cursor-pointer">
              <!-- FRONT -->
              <div class="absolute inset-0 backface-hidden glass-card rounded-3xl p-8 flex flex-col justify-between overflow-hidden shadow-lg border border-white/10">
                <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10"></div>
                <div class="relative z-10 flex justify-between items-start mb-8">
                  <div class="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/20">
                    <img src="./arhaan.png" alt="Arhaan Shah" class="w-full h-full object-cover">
                  </div>
                  <a href="https://www.linkedin.com/in/arhaan-shah/" target="_blank" class="p-2.5 rounded-full bg-white/5 text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-colors duration-300 shadow-md">
                    <i data-lucide="linkedin" class="w-5 h-5"></i>
                  </a>
                </div>
                <div class="relative z-10 mt-auto">
                  <h3 class="text-3xl font-bold mb-1 text-white">Arhaan Shah</h3>
                  <p class="text-red-400 text-sm font-semibold uppercase tracking-wider">Paradise Valley High School, AZ</p>
                  <p class="text-gray-400 text-sm mt-3 animate-pulse flex items-center gap-2"><i data-lucide="mouse-pointer-click" class="w-4 h-4"></i> Hover to read bio</p>
                </div>
              </div>
              <!-- BACK -->
              <div class="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-3xl p-6 flex flex-col justify-center overflow-auto shadow-lg border border-white/10 bg-black/80">
                <p class="text-gray-200 text-sm leading-relaxed">Hey, my name is Arhaan Shah and I'm from Phoenix, Arizona. I'm currently a freshman at Paradise Valley High School, and I am passionate about AI, machine learning, and data science, and interested in using it to solve real-world problems.</p>
              </div>
            </div>
          </div>
"""

start_marker = "<!-- Sparsh Roy -->"
end_marker = "        </div>\n      </div>\n    </section>\n\n    <!-- 7. FINAL CTA -->"

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_html = html[:start_idx] + new_cards + "\n" + html[end_idx:]
    with open("sites/NJ-09/index.html", "w") as f:
        f.write(new_html)
    print("Rewrote cards fully")
else:
    print("Could not find markers to rewrite cards")
