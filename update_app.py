import os

filepath = r"src\App.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
import_statement = "import { DialerPage } from './components/DialerPage';\n"
content = content.replace("import type { EventDetail }", import_statement + "import type { EventDetail }")

# Add route
route_statement = """
  if (p === '/dialer') {
    return <DialerPage />;
  }
"""
content = content.replace("if (p === '/surprise') {", route_statement.strip() + "\n\n  if (p === '/surprise') {")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated App.tsx")
