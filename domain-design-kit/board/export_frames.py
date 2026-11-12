"""Exports board frames through the page helper window.__exportFrame and saves them as PNG files.
usage: export_frames.py <browserPageId> <outDir> <file=frameName>...   (an empty frameName exports what is outside frames)
"""
import base64, json, subprocess, sys, os
ORCA = "/Applications/Orca.app/Contents/Resources/bin/orca"
page, out_dir, pairs = sys.argv[1], sys.argv[2], sys.argv[3:]
os.makedirs(out_dir, exist_ok=True)

def ev(expr):
    r = subprocess.run([ORCA, "eval", "--page", page, "--expression", expr, "--json"], capture_output=True, text=True)
    d = json.loads(r.stdout)
    if not d.get("ok"):
        raise SystemExit(f"eval failed: {str(d)[:400]}")
    return d["result"]["result"]

for pair in pairs:
    file, _, frame = pair.partition("=")
    arg = json.dumps(frame, ensure_ascii=False) if frame else "undefined"
    size = int(ev(f"(async () => {{ window.__b64 = await window.__exportFrame({arg}); return String(window.__b64.length); }})()"))
    data = ""
    step = 400000
    for a in range(0, size, step):
        data += ev(f"window.__b64.slice({a}, {a + step})")
    raw = base64.b64decode(data)
    assert raw[:8] == b"\x89PNG\r\n\x1a\n", "not a PNG"
    path = os.path.join(out_dir, file)
    open(path, "wb").write(raw)
    print(f"{file}  {len(raw) // 1024} KB  embedded={b'application/vnd.excalidraw+json' in raw}")
