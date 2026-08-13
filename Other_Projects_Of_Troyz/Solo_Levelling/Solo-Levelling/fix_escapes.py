import os

files = [
    "s:/Solo-Levelling/src/components/RightPanel.tsx",
    "s:/Solo-Levelling/src/components/QuestSection.tsx",
    "s:/Solo-Levelling/src/components/HeroSection.tsx",
    "s:/Solo-Levelling/src/components/Sidebar.tsx"
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace escaped backticks and escaped dollar signs
    content = content.replace('\\`', '`').replace('\\$', '$')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed escapes in all files.")
