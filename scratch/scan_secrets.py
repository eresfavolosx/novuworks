import os
import re
import subprocess
import sys

repos = [
    "/Users/fabianvelez/Documents/antigravity/jolly-rutherford",
    "/tmp/repos/jobhelper",
    "/tmp/repos/nfc",
    "/tmp/repos/bizpay",
    "/tmp/repos/picta",
    "/tmp/repos/hackeaporunacausa",
]

patterns = [
    (r"1//0[a-zA-Z0-9_\-]+", "Google OAuth Refresh Token"),
    (r"ya29\.[a-zA-Z0-9_\-]+", "Google OAuth Access Token"),
    (r"AIzaSy[a-zA-Z0-9_\-]{33}", "Google / Firebase API Key"),
    (r"gh[pousr]_[a-zA-Z0-9]{36,255}", "GitHub Token"),
    (r"sk-[a-zA-Z0-9]{20,}", "OpenAI API Key"),
    (r"AKIA[0-9A-Z]{16}", "AWS Access Key ID"),
    (r"-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----", "Private Key"),
    (r"eyJ[a-zA-Z0-9_\-]{20,}\.eyJ[a-zA-Z0-9_\-]{20,}\.[a-zA-Z0-9_\-]{20,}", "JWT Token"),
]

all_clean = True
for repo in repos:
    try:
        files = subprocess.check_output(["git", "ls-files"], cwd=repo, text=True).splitlines()
    except Exception as e:
        continue
    for f in files:
        if f.endswith(('.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.mp3', '.pdf')):
            continue
        filepath = os.path.join(repo, f)
        if not os.path.exists(filepath):
            continue
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
        except:
            continue
        for pat, desc in patterns:
            matches = re.findall(pat, content)
            if matches:
                real_matches = [m for m in matches if not any(x in m for x in ['mock', 'test', 'example', 'dummy', 'xxxx'])]
                if real_matches:
                    print(f"FAILED:{os.path.basename(repo)}:{f}:{desc}")
                    all_clean = False

if all_clean:
    print("ALL_CLEAN")
    sys.exit(0)
else:
    sys.exit(1)
