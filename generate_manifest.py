import json
import random

manifests = []
destinations = ["Site-Alpha", "Port Royal", "Omega-Station", "Mariana-Trench-Base", "Aegis Blacksite", "Gorgon-Facility", "Icarus-HQ"]
statuses = ["DELIVERED", "PENDING", "LOST", "IN TRANSIT"]

# Generate 999 fake entries
for i in range(999):
    manifests.append({
        "cargo_id": f"ICR-{random.randint(10, 99)}X-{random.randint(100, 999)}",
        "weight_lbs": random.randint(1000, 50000),
        "destination": random.choice([d for d in destinations if d != "Aegis Blacksite"]),
        "status": random.choice(statuses),
        "priority": random.choice(["LOW", "MEDIUM", "HIGH"])
    })

# The needle
manifests.append({
    "cargo_id": "ICR-77X-901",
    "weight_lbs": 21200,
    "destination": "Aegis Blacksite",
    "status": "IN TRANSIT",
    "priority": "OMEGA"
})

random.shuffle(manifests)

with open("public/cargo_manifest.json", "w") as f:
    json.dump(manifests, f, indent=2)

print("Generated cargo_manifest.json")
