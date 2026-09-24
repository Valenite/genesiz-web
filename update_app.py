import os

filepath = r"src\App.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

import_statement = "import { IcarusLogistics, ChironMedical, ChironDatabase, Tartarus, Clementine } from './components/Level4';\n"
if "import { IcarusLogistics" not in content:
    content = content.replace("import { SurprisePage }", import_statement + "import { SurprisePage }")

routing_logic = """
  if (p === '/icaruslogistics') return <IcarusLogistics />;
  if (p === '/chironmedical') return <ChironMedical />;
  if (p === '/c5d909a55dd35e1f') return <ChironDatabase />;
  if (p === '/tartarus') return <Tartarus />;
  if (p === '/clementine6895baronblood') return <Clementine />;
"""

if "if (p === '/icaruslogistics')" not in content:
    content = content.replace("  if (p === '/surprise') {\n    return <SurprisePage />;\n  }", "  if (p === '/surprise') {\n    return <SurprisePage />;\n  }\n" + routing_logic)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated App.tsx")
