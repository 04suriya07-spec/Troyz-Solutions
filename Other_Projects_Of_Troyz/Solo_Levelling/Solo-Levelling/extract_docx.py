import os
import zipfile
import xml.etree.ElementTree as ET

def get_docx_text(path):
    try:
        with zipfile.ZipFile(path) as z:
            xml_content = z.read('word/document.xml')
            root = ET.fromstring(xml_content)
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            paragraphs = []
            for p in root.findall('.//w:p', ns):
                texts = [t.text for t in p.findall('.//w:t', ns) if t.text]
                if texts:
                    paragraphs.append(''.join(texts))
            return '\n'.join(paragraphs)
    except Exception as e:
        return f"Error reading {path}: {str(e)}"

def main():
    files = [f for f in os.listdir('.') if f.endswith('.docx')]
    print(f"Found {len(files)} docx files.")
    for f in sorted(files):
        # Let's write the text of each docx file to a corresponding txt file
        txt_name = f.replace('.docx', '.txt')
        if not os.path.exists(txt_name):
            print(f"Extracting {f} -> {txt_name}...")
            text = get_docx_text(f)
            with open(txt_name, 'w', encoding='utf-8') as out:
                out.write(text)
        else:
            print(f"{txt_name} already exists.")

if __name__ == '__main__':
    main()
