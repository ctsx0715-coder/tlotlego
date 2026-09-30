// Generates consistent leather-toned placeholder artwork into /public/images.
// Replace any file with real photography using the same path and the site updates.
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const out = join(process.cwd(), "public", "images");
mkdirSync(out, { recursive: true });

const W = 1200, H = 1500;

const grain = (id, freq = 0.9, op = 0.22) => `
  <filter id="${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="3" seed="7" result="n"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${op} 0"/>
  </filter>`;

const frame = (bg1, bg2, body, w = W, h = H, extra = "") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient>
  <radialGradient id="vig" cx="50%" cy="45%" r="75%"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.28"/></radialGradient>
  <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  ${grain("g1", 0.8, 0.18)}${grain("g2", 1.6, 0.32)}
  ${extra}
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect width="${w}" height="${h}" filter="url(#g1)"/>
${body}
<rect width="${w}" height="${h}" fill="url(#vig)"/>
</svg>`;

const leather = (base, dark, light) => ({ base, dark, light });
const tones = {
  cognac: leather("#9a5a2e", "#6e3c1b", "#c08050"),
  espresso: leather("#3b2418", "#22130b", "#5c3a28"),
  black: leather("#1f1c1a", "#0f0d0c", "#3a3532"),
  tan: leather("#c19a6b", "#96724a", "#dcbc90"),
  sand: leather("#d8c7a8", "#b39f7c", "#ecdfc6"),
  olive: leather("#4b4a34", "#2e2d1d", "#6b6a4d"),
};

const stitch = (d, c = "#e8d3ab") =>
  `<path d="${d}" fill="none" stroke="${c}" stroke-width="3" stroke-dasharray="11 9" stroke-linecap="round" opacity="0.75"/>`;

const shadow = (cx, cy, rx, ry) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="0.28" filter="url(#blur)"/>`;
const blurDef = `<filter id="blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="26"/></filter>`;

// Tote / handbag
function bag(t, opts = {}) {
  const { flap = false, angle = 0 } = opts;
  const body = `
  ${shadow(600, 1230, 360, 46)}
  <g transform="rotate(${angle} 600 800)">
    <path d="M430 610 C430 330 770 330 770 610" fill="none" stroke="${t.dark}" stroke-width="34" stroke-linecap="round"/>
    <path d="M430 610 C430 350 770 350 770 610" fill="none" stroke="${t.light}" stroke-width="6" opacity="0.5" stroke-linecap="round"/>
    <path d="M330 590 L870 590 L920 1180 Q920 1215 885 1215 L315 1215 Q280 1215 280 1180 Z" fill="${t.base}"/>
    <path d="M330 590 L870 590 L880 700 L320 700 Z" fill="${t.light}" opacity="0.22"/>
    <path d="M280 1180 Q280 1215 315 1215 L885 1215 Q920 1215 920 1180 L925 1120 L275 1120 Z" fill="${t.dark}" opacity="0.35"/>
    <rect x="330" y="590" width="540" height="625" fill="url(#sheen)" opacity="0.6" transform="skewX(-3)"/>
    ${flap ? `<path d="M330 590 L870 590 L840 860 Q600 940 360 860 Z" fill="${t.dark}" opacity="0.55"/><circle cx="600" cy="880" r="20" fill="#d8b56f"/><circle cx="600" cy="880" r="10" fill="#8a6a2c"/>` : `<rect x="320" y="600" width="560" height="6" fill="${t.dark}" opacity="0.5"/>`}
    ${stitch("M350 640 L850 640 L890 1160 L310 1160 Z")}
    <circle cx="470" cy="590" r="12" fill="#d8b56f"/><circle cx="730" cy="590" r="12" fill="#d8b56f"/>
  </g>`;
  return body;
}

// Wallet (bifold, slightly open)
function wallet(t, opts = {}) {
  const body = `
  ${shadow(600, 1010, 380, 40)}
  <g transform="rotate(${opts.angle ?? -4} 600 760)">
    <rect x="260" y="520" width="680" height="480" rx="26" fill="${t.dark}"/>
    <rect x="260" y="500" width="680" height="480" rx="26" fill="${t.base}"/>
    <rect x="260" y="500" width="680" height="120" rx="26" fill="${t.light}" opacity="0.2"/>
    <rect x="596" y="500" width="8" height="480" fill="${t.dark}" opacity="0.5"/>
    ${stitch("M290 530 L910 530 L910 950 L290 950 Z")}
    <rect x="300" y="720" width="270" height="10" fill="${t.dark}" opacity="0.4"/>
    <rect x="260" y="500" width="680" height="480" rx="26" fill="url(#sheen)" opacity="0.5"/>
  </g>`;
  return body;
}

// Belt (coiled)
function belt(t) {
  const ring = (r, w, o = 1) => `<circle cx="600" cy="760" r="${r}" fill="none" stroke="${t.base}" stroke-width="${w}" opacity="${o}"/>`;
  return `
  ${shadow(600, 1130, 360, 40)}
  ${ring(330, 74, 0.55)}${ring(330, 60)}
  <circle cx="600" cy="760" r="330" fill="none" stroke="${t.light}" stroke-width="6" stroke-dasharray="3 0" opacity="0.28"/>
  <circle cx="600" cy="760" r="330" fill="none" stroke="#e8d3ab" stroke-width="3" stroke-dasharray="11 9" opacity="0.7" transform="rotate(20 600 760)"/>
  ${ring(215, 64, 0.5)}${ring(215, 52)}
  <circle cx="600" cy="760" r="215" fill="none" stroke="#e8d3ab" stroke-width="3" stroke-dasharray="11 9" opacity="0.7"/>
  <g transform="translate(600 430)">
    <rect x="-56" y="-46" width="112" height="92" rx="10" fill="none" stroke="#d8b56f" stroke-width="12"/>
    <rect x="-4" y="-46" width="8" height="92" fill="#d8b56f"/>
  </g>`;
}

// Leather texture close up
function texture(t, seedShift = 0) {
  return `
  <rect width="${W}" height="${H}" fill="${t.base}"/>
  <rect width="${W}" height="${H}" filter="url(#g2)"/>
  <rect width="${W}" height="${H}" fill="url(#sheen)" opacity="0.7"/>
  ${stitch(`M120 ${300 + seedShift} L1080 ${300 + seedShift}`)}
  ${stitch(`M120 ${1200 - seedShift} L1080 ${1200 - seedShift}`)}
  <path d="M0 760 Q600 ${700 + seedShift} 1200 780" stroke="${t.dark}" stroke-width="3" fill="none" opacity="0.5"/>`;
}

// Workshop: tools and cut piece
function workshop(t) {
  return `
  <rect width="${W}" height="${H}" fill="${t.light}" opacity="0.15"/>
  <path d="M180 460 L820 380 L980 980 L300 1120 Z" fill="${t.base}"/>
  ${stitch("M230 500 L790 430 L925 940 L335 1060 Z")}
  <g transform="translate(860 1180) rotate(-24)">
    <rect x="-30" y="-330" width="60" height="330" rx="12" fill="#2b2622"/>
    <path d="M-30 0 L30 0 L4 200 L-4 200 Z" fill="#b9b3ab"/>
  </g>
  <circle cx="330" cy="1240" r="70" fill="none" stroke="#d8b56f" stroke-width="8"/>
  <circle cx="330" cy="1240" r="40" fill="none" stroke="#d8b56f" stroke-width="6"/>`;
}

const make = (name, bg1, bg2, body, extra = blurDef) =>
  writeFileSync(join(out, name + ".svg"), frame(bg1, bg2, body, W, H, extra));

const ivory = ["#efe7d8", "#ded1ba"];
const stone = ["#d9cfbf", "#bfb19c"];
const dusk = ["#2a2420", "#15110f"];
const clay = ["#c9b79c", "#a99377"];

// Handbags
make("bag-cognac-1", ...ivory, bag(tones.cognac));
make("bag-cognac-2", ...stone, bag(tones.cognac, { flap: true, angle: -3 }));
make("bag-black-1", ...stone, bag(tones.black));
make("bag-black-2", ...dusk, bag(tones.black, { flap: true }));
make("bag-tan-1", ...ivory, bag(tones.tan, { flap: true }));
make("bag-tan-2", ...clay, bag(tones.tan));
make("bag-espresso-1", ...ivory, bag(tones.espresso));
make("bag-espresso-2", ...stone, bag(tones.espresso, { flap: true, angle: 2 }));
make("bag-olive-1", ...ivory, bag(tones.olive));
make("bag-olive-2", ...clay, bag(tones.olive, { flap: true }));

// Wallets
make("wallet-cognac-1", ...ivory, wallet(tones.cognac));
make("wallet-cognac-2", ...stone, wallet(tones.cognac, { angle: 6 }));
make("wallet-black-1", ...stone, wallet(tones.black));
make("wallet-black-2", ...dusk, wallet(tones.black, { angle: 5 }));
make("wallet-tan-1", ...ivory, wallet(tones.tan));
make("wallet-tan-2", ...clay, wallet(tones.tan, { angle: 5 }));
make("wallet-espresso-1", ...ivory, wallet(tones.espresso));
make("wallet-espresso-2", ...stone, wallet(tones.espresso, { angle: 6 }));

// Belts
make("belt-cognac-1", ...ivory, belt(tones.cognac));
make("belt-cognac-2", ...stone, belt(tones.cognac));
make("belt-black-1", ...stone, belt(tones.black));
make("belt-black-2", ...dusk, belt(tones.black));
make("belt-espresso-1", ...ivory, belt(tones.espresso));
make("belt-espresso-2", ...clay, belt(tones.espresso));
make("belt-tan-1", ...ivory, belt(tones.tan));

// Editorial / atmosphere
make("hero", "#2b1d14", "#0f0a07", `
  <g transform="translate(0 0) scale(1)">
    <rect width="1200" height="1500" fill="#000" opacity="0.15"/>
  </g>
  ${bag(tones.cognac, { flap: true, angle: -4 }).replace(/translate/g, "translate")}
`);
make("story", ...clay, workshop(tones.cognac));
make("craft-select", "#a8825b", "#6e4d30", texture(tones.tan));
make("craft-shape", "#b48a5e", "#7a5533", workshop(tones.tan));
make("craft-craft", "#8a5a34", "#4a2c17", texture(tones.cognac, 40));
make("craft-finish", "#3a2a1e", "#1a120c", texture(tones.espresso, 80));
make("texture-cognac", "#9a5a2e", "#6e3c1b", texture(tones.cognac));
make("texture-espresso", "#3b2418", "#22130b", texture(tones.espresso));
make("texture-tan", "#c19a6b", "#96724a", texture(tones.tan, 30));
make("workshop", ...clay, workshop(tones.espresso));
make("sustain", "#7d7a5c", "#3f3e2a", texture(tones.olive));
make("cat-handbags", ...ivory, bag(tones.cognac, { flap: true }));
make("cat-wallets", ...stone, wallet(tones.espresso));
make("cat-belts", ...clay, belt(tones.black));
make("cat-custom", "#2c2018", "#120c08", workshop(tones.cognac));
make("custom", "#33241a", "#150e09", workshop(tones.tan));
for (let i = 1; i <= 6; i++) {
  const t = [tones.cognac, tones.espresso, tones.tan, tones.black, tones.olive, tones.sand][i - 1];
  const bgs = [ivory, stone, clay, dusk, ivory, stone][i - 1];
  const kind = i % 3 === 1 ? bag(t, { flap: i % 2 === 0 }) : i % 3 === 2 ? wallet(t) : texture(t, i * 12);
  make(`social-${i}`, ...bgs, kind);
}
console.log("placeholders written to public/images");
