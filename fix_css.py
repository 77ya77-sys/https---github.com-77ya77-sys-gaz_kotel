import re

with open('/Users/aleksey/Desktop/Работа/Проекты/Лендинги тестовые/gaz_kotel/style.css', 'r') as f:
    css = f.read()

# 1. Update variables
vars_old = """:root {
    /* Colors */
    --primary-color: #f4622b;
    /* Orange CTA */
    --primary-hover: #d95626;
    --text-main: #1e1e1e;
    --text-muted: #8f959e;
    --bg-main: #ffffff;
    --bg-secondary: #f8f9fa;
    /* Light gray areas */
    --border-color: #e9ecef;

    /* Safety Block Colors */
    --safety-bg: #111115;
    --safety-text: #ffffff;
    --safety-accent: #0acf6c;
    /* Bright green */

    /* Typography */
    --font-main: 'Inter', system-ui, -apple-system, sans-serif;

    /* Safe Area Paddings (Mobile-First) */
    --container-padding: 16px;
    --section-spacing: 40px;
}"""

vars_new = """@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

:root {
    /* Colors */
    --primary-color: #ff5a1f; 
    --primary-hover: #e04a15;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --bg-main: #eef2f6;
    --bg-secondary: transparent; 
    --card-bg: #ffffff;
    --border-color: rgba(226, 232, 240, 0.6);
    
    /* Shadows */
    --card-shadow: 0 8px 24px rgba(100, 116, 139, 0.08);

    /* Safety Block Colors */
    --safety-bg: #1e293b;
    --safety-text: #ffffff;
    --safety-accent: #0acf6c; 
    
    /* Typography */
    --font-main: 'Outfit', system-ui, -apple-system, sans-serif;
    
    /* Safe Area Paddings (Mobile-First) */
    --container-padding: 16px;
    --section-spacing: 40px;
}"""

css = css.replace(vars_old, vars_new)

# Update background: #ffffff; to use var(--card-bg) and add shadow for specific cards
def enhance_card(match):
    return "background: var(--card-bg);\n    border: 1px solid var(--border-color);\n    box-shadow: var(--card-shadow);"

# Cards to enhance: .breakdown-card, .portfolio-card, .trust-card, .price-list-card
css = re.sub(r'background:\s*#ffffff;\n\s*border:\s*1px solid var\(--border-color\);', enhance_card, css)

# Fix .header
css = css.replace("background-color: #ffffff;\n    border-bottom: 1px solid var(--border-color);", 
                  "background-color: rgba(255, 255, 255, 0.8);\n    backdrop-filter: blur(12px);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.3);")

# Fix text-review-card
css = css.replace("background: #f8fafc;\n    border-radius: 16px;", "background: var(--card-bg);\n    border: 1px solid var(--border-color);\n    box-shadow: var(--card-shadow);\n    border-radius: 16px;")

# Fix button radius
css = css.replace("border-radius: 8px;", "border-radius: 12px;")

# Fix shadows for btn-large
css = css.replace("box-shadow: 0 8px 16px rgba(244, 98, 43, 0.2);", "box-shadow: 0 8px 20px rgba(255, 90, 31, 0.3);")

# Change some hardcoded #ffffff or backgrounds where necessary
# feature-icon
css = css.replace("background-color: #ffffff;\n    border-radius: 12px;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);",
                  "background-color: var(--card-bg);\n    border-radius: 16px;\n    box-shadow: 0 6px 16px rgba(100, 116, 139, 0.1);")

with open('/Users/aleksey/Desktop/Работа/Проекты/Лендинги тестовые/gaz_kotel/style.css', 'w') as f:
    f.write(css)
print("Updated style.css")
