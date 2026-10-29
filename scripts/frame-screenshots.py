"""Habille les captures projets dans un cadre de navigateur.

Usage : python3 scripts/frame-screenshots.py
Sources : .playwright-mcp/shots/hd-*.png  ->  public/assets/images/projects/*.webp
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont

SRC = ".playwright-mcp/shots"
DST = "public/assets/images/projects"
W, H = 1600, 1000  # 16:10, même ratio que la zone image des cartes

# Les outils internes affichent le nom du client, jamais leur adresse
PROJECTS = {
    "click-cadyst": ("hd-click-web.png", "click.cadyst-app.com", "#0b3a6e", "#4f8fd6"),
    "mycimencam-backoffice": ("hd-mycimencam.png", "MyCimencam · back-office", "#0d6b3a", "#e0393e"),
    "cimencam-sfa": ("hd-sfa-login.png", "Cimencam · SFA", "#0d6b3a", "#7cc79a"),
    "bci-agency-banking": ("hd-bci.png", "BCI Congo · Agency Banking", "#c2410c", "#fdba74"),
    "cadyst-logistique": ("hd-cadyst-logistic.png", "logistic.cadyst-app.com", "#1e3a8a", "#60a5fa"),
    "bcinet": ("hd-bcinet.png", "bcinet.bcicongo.com", "#3b2314", "#f97316"),
    "bci-mobile": ("hd-bcionline.png", "bcionline.bcicongo.com", "#9a3412", "#fdba74"),
    "ecobank-flybanking": ("hd-ecobank-flybanking.png", "Ecobank · Fly Banking", "#0a3d62", "#5fb4d9"),
}

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def hex_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def gradient(c1, c2):
    a, b = hex_rgb(c1), hex_rgb(c2)
    base = Image.new("RGB", (W, H))
    px = base.load()
    for y in range(H):
        for x in range(0, W):
            t = (x / W) * 0.6 + (y / H) * 0.4
            px[x, y] = tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))
    return base


def frame(name, src, domain, c1, c2):
    canvas = gradient(c1, c2)
    shot = Image.open(f"{SRC}/{src}").convert("RGB")

    # Fenêtre : décalée en bas à droite, coupée par le bord pour un rendu « hero »
    win_x, win_y = 120, 110
    win_w = W - win_x - 60
    bar_h = 64
    scale = win_w / shot.width
    shot = shot.resize((win_w, int(shot.height * scale)), Image.LANCZOS)
    body_h = H - win_y - bar_h + 40
    shot = shot.crop((0, 0, win_w, min(body_h, shot.height)))
    win_h = bar_h + shot.height

    # Ombre portée
    shadow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(shadow).rounded_rectangle(
        (win_x + 10, win_y + 30, win_x + win_w - 10, win_y + win_h + 30), 22, fill=150)
    shadow = shadow.filter(ImageFilter.GaussianBlur(40))
    canvas.paste((0, 0, 0), (0, 0), shadow)

    window = Image.new("RGB", (win_w, win_h), "#ffffff")
    d = ImageDraw.Draw(window)
    d.rectangle((0, 0, win_w, bar_h), fill="#f1f3f6")
    d.line((0, bar_h - 1, win_w, bar_h - 1), fill="#dde1e7", width=2)
    for i, col in enumerate(("#ff5f57", "#febc2e", "#28c840")):
        cx = 34 + i * 30
        d.ellipse((cx - 9, bar_h // 2 - 9, cx + 9, bar_h // 2 + 9), fill=col)
    pill_w = 560
    px0 = (win_w - pill_w) // 2
    d.rounded_rectangle((px0, 14, px0 + pill_w, bar_h - 14), 18, fill="#ffffff", outline="#dde1e7", width=2)
    font = ImageFont.truetype(FONT, 22)
    text = domain
    tw = d.textlength(text, font=font)
    d.text((px0 + (pill_w - tw) / 2, bar_h // 2), text, fill="#4b5563", font=font, anchor="lm")
    window.paste(shot, (0, bar_h))

    mask = Image.new("L", (win_w, win_h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, win_w, win_h + 40), 22, fill=255)
    canvas.paste(window, (win_x, win_y), mask)

    canvas.save(f"{DST}/{name}.webp", "WEBP", quality=86, method=6)
    print(name, canvas.size)


for name, args in PROJECTS.items():
    frame(name, *args)
