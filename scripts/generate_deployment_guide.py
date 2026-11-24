"""
Generate Professional 10-Page Installation & Deployment Guide PDF
Project: Maa Kamakhya Auto Gas
Target Audience: Client's Hosting Administrator & DevOps Engineer
Total Pages: Exactly 10 Pages (Portrait Letter/A4)
"""

import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from PIL import Image

PAGE_WIDTH, PAGE_HEIGHT = letter # 612 x 792 pt

NAVY_DARK = colors.HexColor('#07152C')
NAVY_SECONDARY = colors.HexColor('#0B2142')
NAVY_LIGHT = colors.HexColor('#142B4E')
YELLOW_ACCENT = colors.HexColor('#FFD52A')
YELLOW_SOFT = colors.HexColor('#FFF9E6')
WHITE = colors.HexColor('#FFFFFF')
LIGHT_BG = colors.HexColor('#F8FAFC')
CARD_BORDER = colors.HexColor('#E2E8F0')
TEXT_PRIMARY = colors.HexColor('#0F172A')
TEXT_MUTED = colors.HexColor('#64748B')
TEXT_LIGHT = colors.HexColor('#94A3B8')
GREEN_ACCENT = colors.HexColor('#16A34A')
BLUE_ACCENT = colors.HexColor('#2563EB')
CODE_BG = colors.HexColor('#0F172A')
CODE_TEXT = colors.HexColor('#38BDF8')

ROOT_DIR = r'C:\Users\rd364\.gemini\antigravity\scratch\maa-kamakhya-auto-gas'
LOGO_PATH = os.path.join(ROOT_DIR, 'public', 'images', 'logo.png')
OUTPUT_PDF = os.path.join(ROOT_DIR, 'MAA_KAMAKHYA_AUTO_GAS_CLIENT_HANDOVER', '03_INSTALLATION_DEPLOYMENT_GUIDE', 'Installation_and_Deployment_Guide.pdf')

def draw_header_footer(c, page_num, total_pages=10, title=""):
    # Header bar
    c.setFillColor(NAVY_DARK)
    c.rect(0, PAGE_HEIGHT - 54, PAGE_WIDTH, 54, stroke=0, fill=1)
    
    c.setFillColor(YELLOW_ACCENT)
    c.rect(0, PAGE_HEIGHT - 56, PAGE_WIDTH, 2, stroke=0, fill=1)
    
    if os.path.exists(LOGO_PATH):
        try:
            c.drawImage(LOGO_PATH, 25, PAGE_HEIGHT - 45, width=34, height=34, mask='auto', preserveAspectRatio=True)
        except Exception:
            pass
            
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(68, PAGE_HEIGHT - 32, "MAA KAMAKHYA AUTO GAS")
    
    c.setFillColor(YELLOW_ACCENT)
    c.setFont("Helvetica", 8)
    c.drawString(68, PAGE_HEIGHT - 44, "INSTALLATION & DEPLOYMENT GUIDE")
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 9)
    c.drawRightString(PAGE_WIDTH - 25, PAGE_HEIGHT - 36, title.upper())
    
    # Footer
    c.setFillColor(WHITE)
    c.rect(0, 0, PAGE_WIDTH, 28, stroke=0, fill=1)
    c.setStrokeColor(CARD_BORDER)
    c.setLineWidth(1)
    c.line(0, 28, PAGE_WIDTH, 28)
    
    c.setFillColor(TEXT_MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(25, 10, "MAA KAMAKHYA AUTO GAS • TECHNICAL HOSTING & DEPLOYMENT MANUAL")
    c.drawRightString(PAGE_WIDTH - 25, 10, f"Page {page_num} of {total_pages}")

def draw_card(c, x, y, w, h, bg_color=WHITE, border_color=CARD_BORDER, radius=6):
    c.setFillColor(bg_color)
    c.setStrokeColor(border_color)
    c.setLineWidth(1)
    c.roundRect(x, y, w, h, radius, stroke=1, fill=1)

def draw_code_box(c, x, y, w, h, code_lines):
    draw_card(c, x, y, w, h, bg_color=CODE_BG, border_color=NAVY_DARK)
    c.setFillColor(CODE_TEXT)
    c.setFont("Courier-Bold", 9)
    cy = y + h - 18
    for line in code_lines:
        c.drawString(x + 14, cy, line)
        cy -= 14

def draw_section_heading(c, x, y, number, title):
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(x, y, f"{number}. {title}")
    c.setFillColor(YELLOW_ACCENT)
    c.rect(x, y - 4, 35, 2, stroke=0, fill=1)

def build_deployment_guide():
    os.makedirs(os.path.dirname(OUTPUT_PDF), exist_ok=True)
    c = canvas.Canvas(OUTPUT_PDF, pagesize=letter)
    
    # ========================================================
    # PAGE 1: COVER
    # ========================================================
    c.setFillColor(NAVY_DARK)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)
    
    c.setFillColor(NAVY_SECONDARY)
    c.rect(0, 0, PAGE_WIDTH, 180, stroke=0, fill=1)
    
    # Centered Logo
    if os.path.exists(LOGO_PATH):
        try:
            c.drawImage(LOGO_PATH, (PAGE_WIDTH - 100) / 2, PAGE_HEIGHT - 160, width=100, height=100, mask='auto', preserveAspectRatio=True)
        except Exception:
            pass
            
    c.setFillColor(YELLOW_ACCENT)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 195, "SYSTEMS ADMINISTRATION & DEPLOYMENT MANUAL")
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 235, "Installation & Deployment Guide")
    
    c.setFont("Helvetica", 16)
    c.setFillColor(colors.HexColor('#CBD5E1'))
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 268, "Maa Kamakhya Auto Gas Web Platform")
    
    c.setFont("Helvetica", 10)
    c.setFillColor(TEXT_LIGHT)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 302, "Step-by-step technical instructions for local execution, production build,")
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 317, "static server configuration, custom domain DNS mapping, and SSL security.")
    
    c.setFillColor(YELLOW_ACCENT)
    c.rect((PAGE_WIDTH - 80) / 2, PAGE_HEIGHT - 332, 80, 2, stroke=0, fill=1)
    
    # Target audience box
    c.setFillColor(NAVY_SECONDARY)
    c.setStrokeColor(NAVY_LIGHT)
    c.roundRect(71, 210, 470, 95, 6, stroke=1, fill=1)
    
    c.setFillColor(YELLOW_ACCENT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(85, 290, "TARGET AUDIENCE & RESPONSIBILITY NOTICE:")
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 8.5)
    c.drawString(85, 272, "• Intended for: Client's IT Administrator, Webmaster, or Hosting Support Engineer.")
    c.drawString(85, 256, "• Client Ownership: Domain registration, hosting account purchase, and DNS management.")
    c.drawString(85, 240, "• Developer Scope: Complete tested source code delivery, build scripts, and guidance.")
    
    # Metadata footer
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(70, 95, "Document Version:")
    c.setFont("Helvetica", 9)
    c.drawString(70, 80, "1.0.0 (Production Release)")
    
    c.setFont("Helvetica-Bold", 9)
    c.drawString(250, 95, "Target Runtime:")
    c.setFont("Helvetica", 9)
    c.drawString(250, 80, "Static Jamstack / Node.js 18+")
    
    c.setFont("Helvetica-Bold", 9)
    c.drawString(420, 95, "Release Date:")
    c.setFont("Helvetica", 9)
    c.drawString(420, 80, "November 23, 2026")
    
    c.showPage()
    
    # ========================================================
    # PAGE 2: PROJECT INTRODUCTION & ARCHITECTURE
    # ========================================================
    draw_header_footer(c, 2, 10, "Introduction & Architecture")
    
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "1", "Project Introduction & Architecture Overview")
    
    draw_card(c, 30, PAGE_HEIGHT - 250, 552, 150)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(45, PAGE_HEIGHT - 115, "1.1 Single Page Application (SPA) Jamstack Architecture")
    c.setFillColor(TEXT_PRIMARY)
    c.setFont("Helvetica", 9)
    intro_p1 = [
        "The Maa Kamakhya Auto Gas web platform is built on modern Jamstack principles using React 18 and Vite 5.",
        "It compiles into pure, highly optimized static HTML, JavaScript, and CSS assets. It does not require a running",
        "Node.js server, Python backend, PHP engine, or SQL database in production.",
        "",
        "Key Architectural Advantages for the Hosting Administrator:",
        "• Maximum Security: Zero server-side attack surface; immune to SQL injection and remote code execution.",
        "• Cost Efficiency: Runs seamlessly on any static host, CDN, Apache, NGINX, or cPanel static web directory.",
        "• Extreme Speed: Static files can be cached globally on edge servers for sub-second page loads."
    ]
    iy = PAGE_HEIGHT - 132
    for line in intro_p1:
        c.drawString(45, iy, line)
        iy -= 13
        
    draw_card(c, 30, PAGE_HEIGHT - 430, 552, 165)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(45, PAGE_HEIGHT - 275, "1.2 Zero-Backend Communication Flow")
    c.setFillColor(TEXT_PRIMARY)
    c.setFont("Helvetica", 9)
    intro_p2 = [
        "Inquiries, service requests, and calculator quotes are processed without intermediate database storage:",
        "1. Interactive Savings Calculations: Executed client-side in the visitor's browser runtime.",
        "2. WhatsApp Quotes: Direct browser-to-app deep-linking via https://wa.me/916913910337 with prefilled text.",
        "3. Phone Calls: Standard telephony protocol links (tel:+916913910337) trigger native device dialers.",
        "4. Customer Reviews: Maintained in browser localStorage with honeypot spam filtering.",
        "",
        "This architectural choice means the hosting administrator never has to manage database backups, database",
        "user privileges, connection pools, or database software version migrations."
    ]
    iy2 = PAGE_HEIGHT - 292
    for line in intro_p2:
        c.drawString(45, iy2, line)
        iy2 -= 13
        
    draw_card(c, 30, 48, 552, 235)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(45, 260, "1.3 Division of Responsibilities Matrix")
    
    c.setFont("Helvetica-Bold", 8.5)
    c.setFillColor(NAVY_DARK)
    c.drawString(45, 240, "COMPONENT / RESPONSIBILITY")
    c.drawString(280, 240, "RESPONSIBLE PARTY")
    c.drawString(430, 240, "NOTES")
    c.setStrokeColor(CARD_BORDER)
    c.line(45, 234, 560, 234)
    
    matrix_rows = [
        ("Source Code & Delivery Package", "Website Developer", "Supplied in clean ZIP with full docs"),
        ("Pre-rendered Production Build", "Website Developer", "Ready-to-deploy dist/ directory"),
        ("Domain Registration & Ownership", "Client / Customer", "Purchased from registrar (GoDaddy, etc.)"),
        ("Web Hosting Account & Billing", "Client / Customer", "Client selects and pays hosting provider"),
        ("DNS Configuration & Nameservers", "Client / Hosting Admin", "Point A/CNAME records to static host"),
        ("SSL Certificate Activation", "Client / Hosting Admin", "Enabled via host or Cloudflare (free)"),
        ("Initial Deployment Assistance", "Website Developer", "Technical advisory as agreed in contract")
    ]
    
    ry = 218
    for comp, party, note in matrix_rows:
        c.setFillColor(TEXT_PRIMARY)
        c.setFont("Helvetica", 8)
        c.drawString(45, ry, comp)
        c.setFillColor(NAVY_DARK if "Developer" in party else BLUE_ACCENT)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(280, ry, party)
        c.setFillColor(TEXT_MUTED)
        c.setFont("Helvetica", 7.5)
        c.drawString(430, ry, note)
        ry -= 20
        
    c.showPage()
    
    # ========================================================
    # PAGE 3: SYSTEM REQUIREMENTS
    # ========================================================
    draw_header_footer(c, 3, 10, "System & Hosting Requirements")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "2", "System & Hosting Requirements")
    
    draw_card(c, 30, PAGE_HEIGHT - 260, 552, 160)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(45, PAGE_HEIGHT - 115, "2.1 Local Build & Development Environment Requirements")
    c.setFillColor(TEXT_PRIMARY)
    c.setFont("Helvetica", 8.5)
    
    reqs_local = [
        ("Operating System", "Cross-platform: Windows 10/11, macOS (Intel/Apple Silicon), or Linux (Ubuntu 20.04+)."),
        ("Node.js Runtime", "Node.js v18.0.0 or higher (v20+ LTS strongly recommended). Required for Vite bundler."),
        ("Package Manager", "npm v9.0.0 or higher (bundled with Node.js) or yarn / pnpm."),
        ("Git Client", "Git v2.30+ (optional, required only for cloning or version control)."),
        ("Local Port", "Port 5173 available by default (configurable if port 5173 is occupied).")
    ]
    ly = PAGE_HEIGHT - 138
    for label, val in reqs_local:
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(45, ly, f"• {label}:")
        c.setFont("Helvetica", 8.5)
        c.drawString(160, ly, val)
        ly -= 22
        
    draw_card(c, 30, PAGE_HEIGHT - 470, 552, 195)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(45, PAGE_HEIGHT - 290, "2.2 Production Hosting Environment Requirements")
    c.setFillColor(TEXT_PRIMARY)
    c.setFont("Helvetica", 8.5)
    
    reqs_host = [
        ("Server Type", "Any Static File Web Server, Object Storage, or Edge Content Delivery Network (CDN)."),
        ("Server-Side Language", "NONE. Zero PHP, Python, Ruby, or Node.js runtime required on the server."),
        ("Database Engine", "NONE. Zero MySQL, PostgreSQL, or MongoDB required on the server."),
        ("Disk Storage", "< 50 MB total space required for all compiled assets, images, and static HTML files."),
        ("HTTPS / SSL", "Mandatory. Valid TLS/SSL certificate for secure WhatsApp deep-links & geolocation."),
        ("SPA Fallback / Rewrite", "Server must serve index.html or 404.html fallback for direct sub-route visits."),
        ("Supported Hosts", "Hostinger, GoDaddy, Bluehost, Namecheap cPanel, Cloudflare Pages, Netlify, Vercel, AWS S3.")
    ]
    hy = PAGE_HEIGHT - 315
    for label, val in reqs_host:
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(45, hy, f"• {label}:")
        c.setFont("Helvetica", 8.5)
        c.drawString(160, hy, val)
        hy -= 20
        
    draw_card(c, 30, 48, 552, 195)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(45, 220, "2.3 Client Browser Compatibility Standards")
    c.setFillColor(TEXT_PRIMARY)
    c.setFont("Helvetica", 8.5)
    
    browsers = [
        ("Google Chrome", "Version 90+ (Desktop & Mobile Android)"),
        ("Apple Safari", "Version 14+ (macOS & iOS iPhone/iPad)"),
        ("Mozilla Firefox", "Version 88+ (Desktop & Android)"),
        ("Microsoft Edge", "Version 90+ (Chromium engine)"),
        ("Samsung Internet", "Version 14+ (Android smartphones)")
    ]
    by = 195
    for b_name, b_ver in browsers:
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(45, by, f"• {b_name}:")
        c.setFont("Helvetica", 8.5)
        c.drawString(160, by, b_ver)
        by -= 18
        
    c.drawString(45, by - 6, "Note: The application uses standard ECMAScript 2020 features supported by 98%+ of global browsers.")
    
    c.showPage()
    
    # ========================================================
    # PAGE 4: PROJECT DIRECTORY STRUCTURE
    # ========================================================
    draw_header_footer(c, 4, 10, "Project Structure & Manifest")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "3", "Project Structure & Manifest Explanation")
    
    draw_card(c, 30, 48, 552, 630)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "Directory Tree Overview")
    
    tree_lines = [
        "maa-kamakhya-auto-gas/",
        "├── index.html                   # Master HTML entry point with pre-rendered Schema.org JSON-LD",
        "├── package.json                 # Dependency manifest and npm automation scripts",
        "├── package-lock.json            # Deterministic lockfile for reproducible installations",
        "├── vite.config.js               # Vite build bundler configuration with code-splitting",
        "├── test-suite.js                # Master automated verification test runner (157 checks)",
        "├── .env.example                 # Safe environment configuration template with placeholders",
        "│",
        "├── public/                      # Static assets copied directly to build output without processing",
        "│   ├── robots.txt               # Search engine crawler permissions and sitemap link",
        "│   ├── sitemap.xml              # XML Sitemap listing all 11 canonical indexable URLs",
        "│   ├── favicon.ico / .png       # Cross-device browser tab and bookmark icons",
        "│   └── images/                  # High-resolution WebP & PNG automotive illustrations and logos",
        "│",
        "├── scripts/                     # Node.js production maintenance and build scripts",
        "│   └── generate_static_pages.cjs# Static HTML pre-renderer & 404.html SPA router builder",
        "│",
        "├── src/                         # Application source code",
        "│   ├── App.jsx                  # Root React component managing SPA routing & scroll restoration",
        "│   ├── main.jsx                 # Application entry point mounting React 18 DOM tree",
        "│   ├── components/              # 15 reusable UI widgets (Navbar, Footer, LanguageSwitcher, etc.)",
        "│   ├── context/                 # LanguageContext provider handling dynamic trilingual state",
        "│   ├── data/                    # Business datasets (servicesData, searchIndex, siteConfig, navLinks)",
        "│   ├── hooks/                   # Custom hooks (useLanguage, usePageMeta, useSavingsCalculator)",
        "│   ├── locales/                 # Trilingual dictionaries (en.js, hi.js, as.js - 298 keys each)",
        "│   ├── pages/                   # Top-level route pages (HomePage, AboutPage, ContactPage, etc.)",
        "│   ├── sections/                # Modular homepage content sections (Hero, Calculator, Reviews)",
        "│   ├── services/                # Lead handling & review persistence logic",
        "│   ├── styles/                  # Clean modular CSS stylesheets (components, responsive, variables)",
        "│   └── utils/                   # Pure functions (calculator math, currency formatting, WhatsApp URL)",
        "│",
        "└── tests/                       # Automated QA test suites (unit, integration, and E2E flows)"
    ]
    
    ty = PAGE_HEIGHT - 130
    c.setFont("Courier", 7.5)
    c.setFillColor(NAVY_DARK)
    for line in tree_lines:
        c.drawString(45, ty, line)
        ty -= 14
        
    c.showPage()
    
    # ========================================================
    # PAGE 5: INSTALLATION & ENVIRONMENT SETUP
    # ========================================================
    draw_header_footer(c, 5, 10, "Installation & Environment Setup")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "4", "Step-by-Step Installation & Configuration")
    
    draw_card(c, 30, PAGE_HEIGHT - 210, 552, 110)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "Step 1: Extract Project Archive")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, PAGE_HEIGHT - 126, "Extract Website_Source_Code.zip into your desired working directory on your local machine or server:")
    draw_code_box(c, 45, PAGE_HEIGHT - 195, 520, 55, [
        "# Unzip archive in terminal or use graphical extractor",
        "unzip Website_Source_Code.zip -d maa-kamakhya-auto-gas",
        "cd maa-kamakhya-auto-gas"
    ])
    
    draw_card(c, 30, PAGE_HEIGHT - 350, 552, 125)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 225, "Step 2: Install Dependencies via NPM")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, PAGE_HEIGHT - 241, "Install the verified dependencies. The package-lock.json ensures exact identical package resolution:")
    draw_code_box(c, 45, PAGE_HEIGHT - 335, 520, 80, [
        "# Install production and development packages cleanly",
        "npm ci",
        "# OR if package-lock is omitted in customized setups:",
        "npm install",
        "# Note: Clean install takes ~15-30 seconds depending on network"
    ])
    
    draw_card(c, 30, PAGE_HEIGHT - 510, 552, 145)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 365, "Step 3: Environment Variables Configuration")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, PAGE_HEIGHT - 381, "The repository includes .env.example with pre-configured verified defaults. Copy it to .env if needed:")
    draw_code_box(c, 45, PAGE_HEIGHT - 495, 520, 100, [
        "cp .env.example .env",
        "# Key variables configured:",
        "VITE_APP_NAME=\"Maa Kamakhya Auto Gas\"",
        "VITE_PHONE_NUMBER=\"6913910337\"",
        "VITE_WHATSAPP_NUMBER=\"6913910337\"",
        "VITE_WORKSHOP_ADDRESS=\"NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam\""
    ])
    
    draw_card(c, 30, 48, 552, 155)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, 185, "Step 4: Execute Automated Verification Test Suite")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, 169, "Before building for production, run the comprehensive verification suite to confirm environment health:")
    draw_code_box(c, 45, 60, 520, 95, [
        "npm test",
        "# Expected Output:",
        "# SUMMARY: 157 / 157 TESTS PASSED",
        "# ALL INTEGRATION & QUALITY AUDIT TESTS PASSED PERFECTLY!"
    ])
    
    c.showPage()
    
    # ========================================================
    # PAGE 6: LOCAL EXECUTION
    # ========================================================
    draw_header_footer(c, 6, 10, "Local Development & Testing")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "5", "Local Execution & Development Server")
    
    draw_card(c, 30, PAGE_HEIGHT - 230, 552, 130)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "5.1 Launching Vite Local Development Server")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, PAGE_HEIGHT - 126, "Run the development command to start the Vite HMR (Hot Module Replacement) dev server:")
    draw_code_box(c, 45, PAGE_HEIGHT - 215, 520, 75, [
        "npm run dev",
        "# Output:",
        "# VITE v5.4.11 ready in 250 ms",
        "# ➜ Local: http://localhost:5173/"
    ])
    
    draw_card(c, 30, PAGE_HEIGHT - 440, 552, 195)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 245, "5.2 Network & Device Testing")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    dev_notes = [
        "• Desktop Browser Access: Open http://localhost:5173/ in Google Chrome, Firefox, or Safari.",
        "• Mobile Testing on Same Wi-Fi Network: Launch with 'npm run dev -- --host' and access the Network IP.",
        "• Hot Reloading: Changes made to files in src/ will update instantly in the browser without full reload.",
        "• Port Override: If port 5173 is in use by another application, pass a custom port: 'npm run dev -- --port 3000'.",
        "• Zero Backend Required: All services, calculators, and reviews will function fully in local development mode."
    ]
    dy = PAGE_HEIGHT - 265
    for dn in dev_notes:
        c.drawString(45, dy, dn)
        dy -= 18
        
    draw_card(c, 30, 48, 552, 230)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, 260, "5.3 Local Verification Checklist for Administrator")
    
    chk_items = [
        ("Homepage Scrolling", "Verify smooth scrolling across Benefits, Services, Calculator, Reviews, Contact."),
        ("Language Switching", "Toggle English -> Hindi -> Assamese; confirm labels translate instantaneously."),
        ("Fuel Calculator Slider", "Adjust distance slider from 500 to 10,000 km; verify savings recalculation."),
        ("WhatsApp Quote Trigger", "Click 'Get Quote on WhatsApp'; confirm message formats with vehicle data."),
        ("Search Modal", "Click search icon; test searching for 'cng', 'sequential', 'location'."),
        ("Mobile Drawer Menu", "Resize browser to 390px; open mobile menu drawer and test subpage links."),
        ("Console Logs Check", "Open Browser DevTools (F12) -> Console tab; verify 0 red error messages.")
    ]
    cy = 238
    for item, action in chk_items:
        c.setFillColor(GREEN_ACCENT)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(45, cy, "✓")
        c.setFillColor(NAVY_DARK)
        c.drawString(60, cy, f"{item}:")
        c.setFillColor(TEXT_MUTED)
        c.setFont("Helvetica", 8)
        c.drawString(185, cy, action)
        cy -= 24
        
    c.showPage()
    
    # ========================================================
    # PAGE 7: PRODUCTION BUILD PROCESS
    # ========================================================
    draw_header_footer(c, 7, 10, "Production Build & Static Prerendering")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "6", "Production Compilation & Static Prerendering")
    
    draw_card(c, 30, PAGE_HEIGHT - 240, 552, 140)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "6.1 Production Build Command")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, PAGE_HEIGHT - 126, "Execute the production compilation pipeline configured in package.json:")
    draw_code_box(c, 45, PAGE_HEIGHT - 225, 520, 85, [
        "npm run build",
        "# This command automatically executes:",
        "# 1. vite build (Compiles & minifies React code and CSS bundles into dist/)",
        "# 2. node scripts/generate_static_pages.cjs (Generates pre-rendered crawlable HTML)",
        "# Build time: ~4-6 seconds"
    ])
    
    draw_card(c, 30, PAGE_HEIGHT - 470, 552, 215)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 255, "6.2 Build Output Structure (dist/ directory)")
    c.setFont("Helvetica", 8)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, PAGE_HEIGHT - 270, "The build process outputs the complete, self-contained dist/ folder ready for deployment:")
    
    dist_lines = [
        "dist/",
        "├── index.html                   # Minified homepage HTML with embedded JSON-LD LocalBusiness schema",
        "├── 404.html                     # SPA redirect router for deep links on static hosting providers",
        "├── robots.txt & sitemap.xml     # Search engine indexing directives",
        "├── assets/                      # Code-split JavaScript & CSS bundles (gzip compressed)",
        "│   ├── index-*.js               # Core application bundle (~58 kB gzip)",
        "│   ├── vendor-react-*.js        # React & React-DOM shared runtime (~43 kB gzip)",
        "│   ├── vendor-icons-*.js        # Lucide icon chunks (~8 kB gzip)",
        "│   └── index-*.css              # Minified master stylesheet (~18 kB gzip)",
        "├── services/                    # Pre-rendered crawlable SEO static directories",
        "│   ├── cng-services/index.html  # Fully crawlable CNG landing page HTML",
        "│   ├── lpg-services/index.html  # Fully crawlable LPG landing page HTML",
        "│   └── ...                      # (auto-gas-filling, gas-kit-installation, etc.)",
        "├── about/index.html             # Fully crawlable About Page HTML",
        "└── contact/index.html           # Fully crawlable Contact Page HTML"
    ]
    dy = PAGE_HEIGHT - 286
    c.setFont("Courier", 7.5)
    for dl in dist_lines:
        c.drawString(45, dy, dl)
        dy -= 12.5
        
    draw_card(c, 30, 48, 552, 135)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, 165, "6.3 Local Production Preview")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, 149, "To simulate the exact production build locally before uploading to web hosting:")
    draw_code_box(c, 45, 60, 520, 75, [
        "npm run preview",
        "# Output:",
        "# ➜ Local: http://localhost:4173/maa-kamakhya-auto-gas/",
        "# Verifies all static paths, images, and bundles operate correctly in compiled mode."
    ])
    
    c.showPage()
    
    # ========================================================
    # PAGE 8: HOSTING DEPLOYMENT
    # ========================================================
    draw_header_footer(c, 8, 10, "Static Hosting Deployment")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "7", "Production Deployment to Static Web Hosting")
    
    draw_card(c, 30, PAGE_HEIGHT - 270, 552, 170)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "7.1 General Static Web Server Deployment (cPanel, Apache, NGINX)")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, PAGE_HEIGHT - 126, "To deploy to traditional web hosting (Hostinger, GoDaddy, Bluehost, Namecheap, etc.):")
    c.drawString(45, PAGE_HEIGHT - 140, "1. Build the production package locally using 'npm run build'.")
    c.drawString(45, PAGE_HEIGHT - 154, "2. Upload the ENTIRE contents of the 'dist/' folder directly into the host's public_html/ directory.")
    c.drawString(45, PAGE_HEIGHT - 168, "3. For Apache servers, add this .htaccess file to public_html/ to handle SPA route fallbacks:")
    
    draw_code_box(c, 45, PAGE_HEIGHT - 255, 520, 75, [
        "<IfModule mod_rewrite.c>",
        "  RewriteEngine On",
        "  RewriteBase /",
        "  RewriteRule ^index\\.html$ - [L]",
        "  RewriteCond %{REQUEST_FILENAME} !-f",
        "  RewriteCond %{REQUEST_FILENAME} !-d",
        "  RewriteRule . /index.html [L]",
        "</IfModule>"
    ])
    
    draw_card(c, 30, PAGE_HEIGHT - 460, 552, 175)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 285, "7.2 Modern Cloud Static Hosting (Cloudflare Pages, Netlify, Vercel)")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    
    cloud_steps = [
        ("Build Command", "npm run build"),
        ("Output / Publish Directory", "dist"),
        ("Node Version Setting", "NODE_VERSION = 20"),
        ("Root Directory", "/ (project root)"),
        ("SPA Redirect Configuration", "Already configured via 404.html in dist/")
    ]
    cy = PAGE_HEIGHT - 305
    for label, val in cloud_steps:
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(45, cy, f"• {label}:")
        c.setFont("Courier-Bold", 8.5)
        c.drawString(200, cy, val)
        cy -= 18
        
    c.setFont("Helvetica", 8)
    c.drawString(45, cy - 4, "Cloudflare Pages & Vercel automatically detect Vite and configure the build settings automatically.")
    
    draw_card(c, 30, 48, 552, 195)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, 225, "7.3 Base URL Configuration in vite.config.js")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, 209, "If hosting at the root of a domain (e.g. https://maakamakhyaautogas.com/):")
    c.drawString(45, 195, "Update base in vite.config.js to '/' instead of subpath '/maa-kamakhya-auto-gas/':")
    draw_code_box(c, 45, 60, 520, 115, [
        "// vite.config.js for Root Domain Hosting:",
        "export default defineConfig({",
        "  base: '/',  // Set to '/' when hosting on custom root domain",
        "  plugins: [react()],",
        "  build: {",
        "    target: 'es2020'",
        "  }",
        "});"
    ])
    
    c.showPage()
    
    # ========================================================
    # PAGE 9: DOMAIN AND SSL CONFIGURATION
    # ========================================================
    draw_header_footer(c, 9, 10, "Domain & SSL Configuration")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "8", "Custom Domain Name & SSL / HTTPS Configuration")
    
    draw_card(c, 30, PAGE_HEIGHT - 220, 552, 120)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "8.1 Domain Registration & Ownership Notice")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, PAGE_HEIGHT - 126, "The client must independently register and own the official domain name (e.g., maakamakhyaautogas.com)")
    c.drawString(45, PAGE_HEIGHT - 140, "through an accredited registrar such as GoDaddy, Namecheap, Google Domains (Squarespace), or Hostinger.")
    c.drawString(45, PAGE_HEIGHT - 154, "• The client maintains full administrative ownership and renewal billing for the domain name.")
    c.drawString(45, PAGE_HEIGHT - 168, "• The developer does not hold, bill, or renew customer domain accounts.")
    
    draw_card(c, 30, PAGE_HEIGHT - 430, 552, 195)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 235, "8.2 Standard DNS Record Configuration")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(45, PAGE_HEIGHT - 251, "Configure these standard DNS records in the domain registrar's DNS Management console:")
    
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(NAVY_DARK)
    c.drawString(45, PAGE_HEIGHT - 275, "TYPE")
    c.drawString(100, PAGE_HEIGHT - 275, "HOST / NAME")
    c.drawString(200, PAGE_HEIGHT - 275, "VALUE / TARGET")
    c.drawString(410, PAGE_HEIGHT - 275, "TTL")
    c.setStrokeColor(CARD_BORDER)
    c.line(45, PAGE_HEIGHT - 280, 560, PAGE_HEIGHT - 280)
    
    dns_records = [
        ("A", "@ (root)", "IP address provided by your static host (e.g. 185.199.108.153)", "Automatic / 3600"),
        ("CNAME", "www", "maakamakhyaautogas.com OR your host target", "Automatic / 3600"),
        ("TXT", "@", "Domain verification string (if required by host)", "Automatic")
    ]
    dy = PAGE_HEIGHT - 298
    for r_type, r_host, r_val, r_ttl in dns_records:
        c.setFillColor(NAVY_DARK)
        c.setFont("Courier-Bold", 8.5)
        c.drawString(45, dy, r_type)
        c.drawString(100, dy, r_host)
        c.setFillColor(TEXT_PRIMARY)
        c.setFont("Helvetica", 7.5)
        c.drawString(200, dy, r_val)
        c.setFillColor(TEXT_MUTED)
        c.drawString(410, dy, r_ttl)
        dy -= 24
        
    c.setFillColor(TEXT_MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(45, dy, "DNS changes take between 15 minutes to 24 hours to propagate across global nameservers.")
    
    draw_card(c, 30, 48, 552, 240)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, 270, "8.3 SSL / HTTPS Security Certificate Activation")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    ssl_points = [
        "• Mandatory Requirement: Modern browsers block geolocation and display warning badges on non-HTTPS sites.",
        "• Free SSL via Let's Encrypt / Cloudflare: Most hosting providers include automated, free SSL certificates.",
        "• cPanel Activation: Go to cPanel -> 'SSL/TLS Status' -> Click 'Run AutoSSL'.",
        "• Cloudflare Activation: Go to Cloudflare SSL/TLS -> Set mode to 'Full' -> Enable 'Always Use HTTPS'.",
        "• Verification: Confirm the padlock icon appears when visiting https://maakamakhyaautogas.com/.",
        "• Password Security: Never share domain or hosting master passwords via unencrypted email or public chat."
    ]
    sy = 250
    for sp in ssl_points:
        c.drawString(45, sy, sp)
        sy -= 18
        
    c.showPage()
    
    # ========================================================
    # PAGE 10: TROUBLESHOOTING & TECHNICAL SUPPORT
    # ========================================================
    draw_header_footer(c, 10, 10, "Troubleshooting & Support")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "9", "Troubleshooting & Technical Support Contact")
    
    draw_card(c, 30, PAGE_HEIGHT - 380, 552, 280)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "9.1 Common Hosting Issues & Solutions")
    
    issues = [
        ("Blank White Page After Upload", "Cause: Mismatched base path in vite.config.js. Solution: Ensure base: '/' is set in vite.config.js if deploying to root domain, then run 'npm run build' again."),
        ("404 Error on Page Refresh (/about, /contact)", "Cause: Static server lacks SPA rewrite rule. Solution: Upload the .htaccess file (Section 7.1) or ensure 404.html exists in the public directory."),
        ("Images or Logo Missing", "Cause: Incorrect asset case or missing public folder. Solution: Check that all images from public/images/ were uploaded into public_html/images/."),
        ("WhatsApp Link Does Not Open", "Cause: Browser blocking popups or invalid phone format. Solution: Verify number format is 916913910337 (with country code, no + or spaces)."),
        ("Reviews Not Persisting Across Devices", "Architecture Note: Reviews currently save to client browser localStorage. Server-side persistence requires a cloud database (Supabase/Cloudflare D1).")
    ]
    iy = PAGE_HEIGHT - 132
    for issue_title, issue_desc in issues:
        c.setFillColor(NAVY_DARK)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(45, iy, f"• {issue_title}:")
        c.setFillColor(TEXT_MUTED)
        c.setFont("Helvetica", 7.5)
        
        # Word wrap
        words = issue_desc.split(' ')
        line, line_y = "", iy - 12
        for w in words:
            if len(line + ' ' + w) > 95:
                c.drawString(55, line_y, line.strip())
                line_y -= 11
                line = w
            else:
                line += ' ' + w
        if line:
            c.drawString(55, line_y, line.strip())
        iy = line_y - 12
        
    draw_card(c, 30, 48, 552, 175)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, 205, "9.2 Developer Handover Support Information")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    
    c.drawString(45, 185, "The website developer provides deployment guidance and verification as agreed in the handover contract:")
    c.drawString(45, 168, "• Scope of Handover Support: Answering hosting administrator technical inquiries regarding build & files.")
    c.drawString(45, 152, "• Bug Fix Policy: Zero-cost resolution of any confirmed core code defects identified during initial rollout.")
    c.drawString(45, 136, "• Future Feature Extensions: Database integration, backend CRM bay management, and Photo Gallery rollout")
    c.drawString(45, 120, "  are available under separate post-handover enhancement agreements.")
    
    c.setFillColor(YELLOW_SOFT)
    c.setStrokeColor(YELLOW_ACCENT)
    c.roundRect(45, 60, 520, 45, 4, stroke=1, fill=1)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(60, 88, "DEPLOYMENT ASSISTANCE READY")
    c.setFont("Helvetica", 8)
    c.drawString(60, 74, "Refer to the Client Handover Document for formal warranty windows, support terms, and contact points.")
    
    c.showPage()
    c.save()
    print(f"Successfully generated {OUTPUT_PDF} (10 Pages)")

if __name__ == '__main__':
    build_deployment_guide()
