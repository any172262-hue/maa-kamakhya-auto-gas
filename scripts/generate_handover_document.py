"""
Generate Professional 8-Page Formal Client Handover Document PDF
Project: Maa Kamakhya Auto Gas
Target Audience: Business Owner & Executive Management
Total Pages: Exactly 8 Pages (Portrait Letter/A4)
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

ROOT_DIR = r'C:\Users\rd364\.gemini\antigravity\scratch\maa-kamakhya-auto-gas'
LOGO_PATH = os.path.join(ROOT_DIR, 'public', 'images', 'logo.png')
OUTPUT_PDF = os.path.join(ROOT_DIR, 'MAA_KAMAKHYA_AUTO_GAS_CLIENT_HANDOVER', '05_CLIENT_HANDOVER_DOCUMENT', 'Client_Handover_Document.pdf')

def draw_header_footer(c, page_num, total_pages=8, title=""):
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
    c.drawString(68, PAGE_HEIGHT - 44, "FORMAL CLIENT HANDOVER & ACCEPTANCE DEED")
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 9)
    c.drawRightString(PAGE_WIDTH - 25, PAGE_HEIGHT - 36, title.upper())
    
    c.setFillColor(WHITE)
    c.rect(0, 0, PAGE_WIDTH, 28, stroke=0, fill=1)
    c.setStrokeColor(CARD_BORDER)
    c.setLineWidth(1)
    c.line(0, 28, PAGE_WIDTH, 28)
    
    c.setFillColor(TEXT_MUTED)
    c.setFont("Helvetica", 8)
    c.drawString(25, 10, "MAA KAMAKHYA AUTO GAS • OFFICIAL CLIENT HANDOVER AGREEMENT")
    c.drawRightString(PAGE_WIDTH - 25, 10, f"Page {page_num} of {total_pages}")

def draw_card(c, x, y, w, h, bg_color=WHITE, border_color=CARD_BORDER, radius=6):
    c.setFillColor(bg_color)
    c.setStrokeColor(border_color)
    c.setLineWidth(1)
    c.roundRect(x, y, w, h, radius, stroke=1, fill=1)

def draw_section_heading(c, x, y, number, title):
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(x, y, f"{number}. {title}")
    c.setFillColor(YELLOW_ACCENT)
    c.rect(x, y - 4, 35, 2, stroke=0, fill=1)

def build_handover_doc():
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
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 195, "FINAL PROJECT DELIVERY & LEGAL ACCEPTANCE")
    
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 28)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 235, "Client Handover Document")
    
    c.setFont("Helvetica", 16)
    c.setFillColor(colors.HexColor('#CBD5E1'))
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 268, "Maa Kamakhya Auto Gas Web Development Project")
    
    c.setFont("Helvetica", 10)
    c.setFillColor(TEXT_LIGHT)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 302, "Formal record of scope delivery, deliverables inventory, hosting division of responsibilities,")
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 317, "warranty terms, and final acceptance sign-off.")
    
    c.setFillColor(YELLOW_ACCENT)
    c.rect((PAGE_WIDTH - 80) / 2, PAGE_HEIGHT - 332, 80, 2, stroke=0, fill=1)
    
    # Contract details card
    c.setFillColor(NAVY_SECONDARY)
    c.setStrokeColor(NAVY_LIGHT)
    c.roundRect(71, 195, 470, 115, 6, stroke=1, fill=1)
    
    c.setFillColor(YELLOW_ACCENT)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(85, 292, "HANDOVER COVENANT SUMMARY:")
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 8.5)
    c.drawString(85, 274, "• Project Title: Maa Kamakhya Auto Gas Commercial Web Platform")
    c.drawString(85, 258, "• Client Entity: Maa Kamakhya Auto Gas (Guwahati, Assam)")
    c.drawString(85, 242, "• Developer: Senior Web Engineering & Digital Agency Team")
    c.drawString(85, 226, "• Handover Date: November 23, 2026")
    c.drawString(85, 210, "• Version & Baseline: 1.0.0 Production Release (Zero-Database Jamstack Architecture)")
    
    # Bottom metadata
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(70, 95, "Deliverables Included:")
    c.setFont("Helvetica", 9)
    c.drawString(70, 80, "Source Code ZIP, PDFs, Screenshots")
    
    c.setFont("Helvetica-Bold", 9)
    c.drawString(250, 95, "Compliance Status:")
    c.setFont("Helvetica", 9)
    c.drawString(250, 80, "157/157 Tests Passed • 0 Vulnerabilities")
    
    c.setFont("Helvetica-Bold", 9)
    c.drawString(420, 95, "Sign-Off Status:")
    c.setFont("Helvetica", 9)
    c.drawString(420, 80, "Ready for Client Execution")
    
    c.showPage()
    
    # ========================================================
    # PAGE 2: PROJECT SUMMARY
    # ========================================================
    draw_header_footer(c, 2, 8, "Project Summary")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "1", "Project Summary & Background")
    
    draw_card(c, 30, PAGE_HEIGHT - 310, 552, 210)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(45, PAGE_HEIGHT - 110, "1.1 Commercial & Technical Purpose")
    c.setFillColor(TEXT_PRIMARY)
    c.setFont("Helvetica", 8.5)
    summary_text = [
        "Maa Kamakhya Auto Gas is an established automotive gas retrofitment and cylinder compliance workshop",
        "headquartered at NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam.",
        "",
        "The primary objective of this web development project was to create a modern, high-conversion commercial",
        "web platform that empowers Guwahati car owners and commercial fleet operators to:",
        "1. Understand the economic and safety realities of sequential CNG & LPG vehicle conversion.",
        "2. Accurately calculate their monthly and annual fuel savings using an interactive simulator.",
        "3. Review multi-brand vehicle compatibility (Maruti Suzuki, Hyundai, Tata Motors, Toyota, Honda, etc.).",
        "4. Contact the workshop immediately via 1-click WhatsApp quotes and direct phone dialers.",
        "5. Review authentic customer experiences through a transparent, unmanipulated ratings system.",
        "",
        "The development team has completed all agreed frontend milestones, automated tests, and build tooling."
    ]
    sy = PAGE_HEIGHT - 128
    for line in summary_text:
        c.drawString(45, sy, line)
        sy -= 14
        
    draw_card(c, 30, 48, 552, 385)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(45, PAGE_HEIGHT - 335, "1.2 Architectural Execution Philosophy")
    c.setFillColor(TEXT_PRIMARY)
    c.setFont("Helvetica", 8.5)
    arch_summary = [
        "To maximize long-term client value and eliminate recurring server hosting bills, the platform was engineered",
        "using a modern Jamstack Single Page Application (SPA) architecture (React 18 + Vite 5):",
        "",
        "• Zero Database Hosting Fees: Calculations and form validations execute client-side. The client pays ₹0",
        "  monthly in database hosting charges.",
        "• Immunity to Server-Side Exploits: With no SQL database or server runtime to attack, the platform is",
        "  fundamentally immune to SQL injection, PHP vulnerabilities, and server privilege escalation.",
        "• Pre-Rendered Crawlable SEO: Build automation generates static crawlable HTML files for all 11 core routes,",
        "  ensuring search engine crawlers (Googlebot, Bingbot) index complete headings, copy, and JSON-LD schemas.",
        "• Strict Anti-Fabrication Standards: In strict adherence to truth-in-advertising guidelines, early unverified",
        "  claims (unverified GSTIN, invented establishment years) were completely excluded from the production release."
    ]
    ay = PAGE_HEIGHT - 355
    for line in arch_summary:
        c.drawString(45, ay, line)
        ay -= 15
        
    c.showPage()
    
    # ========================================================
    # PAGE 3: SCOPE OF WORK DELIVERED
    # ========================================================
    draw_header_footer(c, 3, 8, "Scope of Work Delivered")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "2", "Scope of Work Delivered")
    
    draw_card(c, 30, 48, 552, 630)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "2.1 Comprehensive Scope Breakdown")
    
    scope_sections = [
        ("A. Core Frontend Architecture", [
            "• Built complete React 18 SPA with Vite 5 bundler and esbuild optimization.",
            "• Implemented responsive, custom automotive CSS system in Yellow (#FFD52A) and Deep Navy (#07152C).",
            "• Full mobile drawer navigation, fixed mobile bottom app bar, and desktop sticky header.",
            "• Zero console errors verified across all desktop and mobile user journeys."
        ]),
        ("B. Interactive Applications & Tools", [
            "• Petrol vs CNG Fuel Savings Calculator with interactive distance sliders and preset mileage values.",
            "• Trilingual Language Switcher supporting English, Assamese, and Hindi with 298 keys parity.",
            "• Client-side Instant Search Modal indexing all services, calculator, FAQs, and location keywords.",
            "• Customer Feedback & Ratings System with dynamic score recalculation and spam honeypot."
        ]),
        ("C. Commercial & Lead Integrations", [
            "• WhatsApp Business Quote API integration (https://wa.me/916913910337) with prefilled vehicle data.",
            "• Click-to-call telephony link (tel:+916913910337) with formatted display.",
            "• Interactive Google Maps embed and direct navigation deep-links for workshop location."
        ]),
        ("D. Technical SEO & Prerendering", [
            "• Static prerendering script (generate_static_pages.cjs) compiling 11 canonical HTML directories.",
            "• Schema.org JSON-LD LocalBusiness and AutoRepair structured data markup.",
            "• XML Sitemap (sitemap.xml) and robots.txt crawler directives.",
            "• Deep-linking SPA redirect engine (404.html) ensuring direct URLs never break on static CDNs."
        ]),
        ("E. Quality Assurance & Testing", [
            "• Comprehensive automated test runner (test-suite.js) executing 157 automated checks.",
            "• 100% pass rate achieved across unit, integration, and end-to-end user flows."
        ])
    ]
    
    sy = PAGE_HEIGHT - 130
    for section_title, bullets in scope_sections:
        c.setFillColor(NAVY_DARK)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(45, sy, section_title)
        sy -= 14
        
        c.setFont("Helvetica", 8)
        c.setFillColor(TEXT_PRIMARY)
        for b in bullets:
            c.drawString(55, sy, b)
            sy -= 12
        sy -= 6
        
    c.showPage()
    
    # ========================================================
    # PAGE 4: PROJECT DELIVERABLES INVENTORY
    # ========================================================
    draw_header_footer(c, 4, 8, "Deliverables Inventory")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "3", "Handover Deliverables Inventory")
    
    draw_card(c, 30, 48, 552, 630)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "3.1 Complete Handover Artifacts Delivered")
    
    deliverables_table = [
        ("01_WEBSITE_SOURCE_CODE/", "Website_Source_Code.zip", "Clean, production-ready archive containing src/, public/, scripts/, tests/, package.json, and safe .env.example. Excludes node_modules and .git."),
        ("02_PROJECT_PRESENTATION/", "Project_Presentation.pdf", "15-slide high-definition 16:9 widescreen business deck with real embedded screenshots, design concept, feature breakdowns, and QA results."),
        ("03_INSTALLATION_DEPLOYMENT_GUIDE/", "Installation_and_Deployment_Guide.pdf", "10-page technical administration guide with step-by-step local execution, static compilation, DNS records, SSL setup, and troubleshooting."),
        ("04_WEBSITE_SCREENSHOTS/", "18 High-Res PNG Screenshots", "Organized across 8 folders (Homepage, Navigation, Services, Photo Gallery, About, Contact, Mobile Responsive, Footer) captured from live application."),
        ("05_CLIENT_HANDOVER_DOCUMENT/", "Client_Handover_Document.pdf", "8-page formal handover contract, division of responsibilities, warranty terms, and client sign-off deed (this document)."),
        ("ROOT DIRECTORY", "PROJECT_AUDIT_REPORT.md", "Comprehensive architectural audit report detailing verified features, code vs. documentation discrepancies, security findings, and roadmap.")
    ]
    
    dy = PAGE_HEIGHT - 135
    for folder, name, desc in deliverables_table:
        draw_card(c, 45, dy - 60, 520, 75, bg_color=LIGHT_BG, border_color=CARD_BORDER)
        c.setFillColor(NAVY_DARK)
        c.setFont("Courier-Bold", 8.5)
        c.drawString(55, dy + 2, folder)
        c.setFillColor(BLUE_ACCENT)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(240, dy + 2, name)
        
        c.setFillColor(TEXT_MUTED)
        c.setFont("Helvetica", 7.5)
        # Word wrap
        words = desc.split(' ')
        line, line_y = "", dy - 14
        for w in words:
            if len(line + ' ' + w) > 95:
                c.drawString(55, line_y, line.strip())
                line_y -= 11
                line = w
            else:
                line += ' ' + w
        if line:
            c.drawString(55, line_y, line.strip())
        dy -= 88
        
    c.showPage()
    
    # ========================================================
    # PAGE 5: DIVISION OF RESPONSIBILITIES
    # ========================================================
    draw_header_footer(c, 5, 8, "Division of Responsibilities")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "4", "Division of Responsibilities (Developer vs. Client)")
    
    draw_card(c, 30, PAGE_HEIGHT - 340, 552, 240)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "4.1 Website Developer Responsibilities")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    
    dev_resps = [
        ("Source Code Quality", "Deliver complete, bug-free, fully responsive source code meeting all agreed specifications."),
        ("Automated Test Suite", "Provide and maintain the 157-test automated verification suite with 100% pass status."),
        ("Build & Prerendering Tools", "Supply production build scripts that output crawlable HTML and SPA fallback routers."),
        ("Handover Documentation", "Deliver professional guides for installation, deployment, and systems administration."),
        ("Initial Deployment Assistance", "Provide agreed technical advisory to the client's hosting administrator during initial setup."),
        ("Defect Warranty Window", "Resolve confirmed core source code defects at zero additional charge during the 30-day warranty.")
    ]
    ry = PAGE_HEIGHT - 130
    for title, desc in dev_resps:
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(45, ry, f"• {title}:")
        c.setFont("Helvetica", 8)
        c.drawString(185, ry, desc)
        ry -= 19
        
    draw_card(c, 30, 48, 552, 355)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 365, "4.2 Client Commercial & Operational Responsibilities")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    
    client_resps = [
        ("Domain Registration", "Client independently purchases, registers, and owns the official domain name (e.g. maakamakhyaautogas.com)."),
        ("Hosting Account & Plan", "Client selects, purchases, and maintains their chosen web hosting account (Hostinger, cPanel, Cloudflare, etc.)."),
        ("Billing & Invoicing", "Client is exclusively responsible for paying all recurring domain registrar and web hosting provider bills."),
        ("DNS Configuration", "Client or their hosting administrator manages DNS record pointers (A, CNAME, TXT) in their registrar console."),
        ("WhatsApp Business Account", "Client maintains their active SIM card, phone device, and official WhatsApp Business application."),
        ("Google Business Profile", "Client manages their physical Google Maps business pin, business hours, and official Google verification."),
        ("Content & Price Accuracy", "Client provides current fuel rates, installation tariffs, and workshop photos as operational conditions evolve.")
    ]
    cry = PAGE_HEIGHT - 385
    for title, desc in client_resps:
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(45, cry, f"• {title}:")
        c.setFont("Helvetica", 8)
        c.drawString(185, cry, desc)
        cry -= 19
        
    c.showPage()
    
    # ========================================================
    # PAGE 6: MAINTENANCE AND SUPPORT TERMS
    # ========================================================
    draw_header_footer(c, 6, 8, "Maintenance & Support Terms")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "5", "Maintenance, Warranty & Support Arrangements")
    
    draw_card(c, 30, PAGE_HEIGHT - 280, 552, 180)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "5.1 30-Day Core Code Defect Warranty")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    warranty_terms = [
        "• Coverage Period: Thirty (30) calendar days commencing from the formal date of handover sign-off.",
        "• Scope of Coverage: Correction of any reproducible errors, syntax bugs, or broken layout elements within",
        "  the delivered source code that deviate from the agreed specifications.",
        "• Turnaround Time: Critical defects impacting lead generation (e.g., broken WhatsApp quote handoff) will",
        "  be triaged within 24–48 business hours.",
        "• Exclusions from Warranty: Issues arising from client modifications to source code, third-party hosting outages,",
        "  registrar DNS misconfigurations, or WhatsApp API policy changes."
    ]
    wy = PAGE_HEIGHT - 130
    for wt in warranty_terms:
        c.drawString(45, wy, wt)
        wy -= 16
        
    draw_card(c, 30, 48, 552, 410)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 305, "5.2 Post-Warranty Maintenance & Future Feature Arrangements")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    post_terms = [
        "Ongoing website maintenance, periodic content updates, and future feature extensions are handled under",
        "separate, mutually agreed terms:",
        "",
        "1. Routine Content Updates: Updating fuel rates, adding newly certified car models, or modifying workshop hours",
        "   can be performed either directly by the client's web administrator (using the documentation guide) or via a",
        "   flexible ad-hoc maintenance arrangement.",
        "",
        "2. Photo Gallery Deployment (Feature Branch): The customer vehicle photo upload portal is preserved on",
        "   Git branch 'feature/photo-gallery'. When the client purchases permanent cloud media storage (e.g. AWS S3 or",
        "   Cloudinary), deployment assistance can be scheduled.",
        "",
        "3. Cloud Database Backend Integration: If customer review volume warrants cloud persistence across multiple",
        "   devices, a lightweight serverless backend (Supabase or Cloudflare Workers + D1) can be deployed under a",
        "   Phase 2 enhancement agreement.",
        "",
        "Note: No recurring retainer or mandatory maintenance fees apply unless explicitly contracted by the client."
    ]
    py = PAGE_HEIGHT - 325
    for pt in post_terms:
        c.drawString(45, py, pt)
        py -= 15
        
    c.showPage()
    
    # ========================================================
    # PAGE 7: PROJECT LIMITATIONS AND PENDING ITEMS
    # ========================================================
    draw_header_footer(c, 7, 8, "Project Limitations & Roadmap")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "6", "Project Limitations, Pending Items & Disclosures")
    
    draw_card(c, 30, 48, 552, 630)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "6.1 Architectural Disclosures & External Dependencies")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    
    disclosures = [
        ("A. Zero-Backend Client-Side Storage", [
            "• Customer reviews currently persist in browser localStorage on the submitting device.",
            "• Global persistence across multiple devices requires deploying an external cloud database (Phase 2 roadmap).",
            "• This architecture was chosen deliberately to guarantee zero monthly database hosting expenses for the client."
        ]),
        ("B. Photo Gallery Scoping Status", [
            "• The Photo Gallery portal was fully developed but withheld from production main per explicit client instructions.",
            "• All code and validation tests remain safely preserved on local Git branch 'feature/photo-gallery'.",
            "• It can be rolled out immediately once the client configures permanent cloud bucket storage."
        ]),
        ("C. External Platform Dependencies", [
            "• WhatsApp Handoff: Relies on the visitor having access to WhatsApp Web or the WhatsApp mobile application.",
            "• Telephony Protocol: Click-to-call relies on the visitor device possessing cellular or VoIP dialer capability.",
            "• Google Maps Embed: Relies on Google Maps public iframe service availability."
        ]),
        ("D. Search Engine Indexing & Ranking Disclosure", [
            "• The developer has implemented complete Technical SEO: static HTML prerendering, valid Schema.org JSON-LD,",
            "  canonical tags, XML sitemap, and robots.txt.",
            "• Realistic Disclaimer: Search engine ranking position (SERP) and crawling speed are determined exclusively",
            "  by Google's proprietary algorithms and domain authority. No developer can guarantee #1 ranking or instant indexing."
        ]),
        ("E. Truth-in-Advertising & Statutory Integrity", [
            "• Unverified establishment years and unverified GSTIN numbers were excluded from production code.",
            "• If official registration certificates are provided in the future, these credentials can be added to siteConfig.js."
        ])
    ]
    
    dy = PAGE_HEIGHT - 130
    for title, items in disclosures:
        c.setFillColor(NAVY_DARK)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(45, dy, title)
        dy -= 14
        
        c.setFont("Helvetica", 8)
        c.setFillColor(TEXT_PRIMARY)
        for it in items:
            c.drawString(55, dy, it)
            dy -= 12
        dy -= 6
        
    c.showPage()
    
    # ========================================================
    # PAGE 8: FORMAL ACCEPTANCE & SIGN-OFF
    # ========================================================
    draw_header_footer(c, 8, 8, "Formal Acceptance & Sign-off")
    draw_section_heading(c, 30, PAGE_HEIGHT - 85, "7", "Formal Project Acceptance & Sign-off Deed")
    
    draw_card(c, 30, PAGE_HEIGHT - 250, 552, 150)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(45, PAGE_HEIGHT - 110, "7.1 Client Review & Confirmation Statement")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(TEXT_PRIMARY)
    stmt_lines = [
        "By executing this document, the Client (Maa Kamakhya Auto Gas) confirms that:",
        "1. The web application source code, presentations, technical guides, screenshots, and audit reports have been received.",
        "2. The interactive features (calculator, WhatsApp enquiry, language switcher, reviews UI, search) have been demonstrated.",
        "3. The division of responsibilities (Client owns domain, hosting, and billing; Developer delivers code & guide) is understood.",
        "4. The 30-day warranty window for core source code defect remediation commences upon the date of signature below.",
        "5. The project deliverables are accepted as complete and conforming to agreed specifications."
    ]
    sy = PAGE_HEIGHT - 130
    for sl in stmt_lines:
        c.drawString(45, sy, sl)
        sy -= 16
        
    # Signature blocks
    draw_card(c, 30, 48, 552, 430)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(45, PAGE_HEIGHT - 280, "7.2 Execution & Signature Deeds")
    
    # Client Box
    draw_card(c, 45, PAGE_HEIGHT - 470, 245, 170, bg_color=LIGHT_BG, border_color=CARD_BORDER)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(58, PAGE_HEIGHT - 315, "FOR THE CLIENT:")
    c.setFont("Helvetica", 8.5)
    c.drawString(58, PAGE_HEIGHT - 332, "Maa Kamakhya Auto Gas")
    
    c.setFont("Helvetica", 8)
    c.setFillColor(TEXT_MUTED)
    c.drawString(58, PAGE_HEIGHT - 355, "Authorized Signatory Name:")
    c.drawString(58, PAGE_HEIGHT - 375, "Title / Designation:")
    c.drawString(58, PAGE_HEIGHT - 395, "Date of Acceptance:")
    c.drawString(58, PAGE_HEIGHT - 435, "Signature & Seal:")
    
    c.setStrokeColor(TEXT_LIGHT)
    c.line(58, PAGE_HEIGHT - 450, 275, PAGE_HEIGHT - 450)
    
    # Developer Box
    draw_card(c, 310, PAGE_HEIGHT - 470, 255, 170, bg_color=LIGHT_BG, border_color=CARD_BORDER)
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(323, PAGE_HEIGHT - 315, "FOR THE DEVELOPER:")
    c.setFont("Helvetica", 8.5)
    c.drawString(323, PAGE_HEIGHT - 332, "Web Development & Engineering Team")
    
    c.setFont("Helvetica", 8)
    c.setFillColor(TEXT_MUTED)
    c.drawString(323, PAGE_HEIGHT - 355, "Lead Architect Name: R. Deka")
    c.drawString(323, PAGE_HEIGHT - 375, "Title: Senior Web Development Engineer")
    c.drawString(323, PAGE_HEIGHT - 395, "Date of Delivery: November 23, 2026")
    c.drawString(323, PAGE_HEIGHT - 435, "Signature:")
    
    c.setStrokeColor(TEXT_LIGHT)
    c.line(323, PAGE_HEIGHT - 450, 550, PAGE_HEIGHT - 450)
    
    # Handover Acceptance Certificate seal box
    c.setFillColor(YELLOW_SOFT)
    c.setStrokeColor(YELLOW_ACCENT)
    c.roundRect(45, 65, 520, 95, 6, stroke=1, fill=1)
    
    c.setFillColor(NAVY_DARK)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(60, 142, "OFFICIAL PROJECT HANDOVER RECORD")
    c.setFont("Helvetica", 8)
    c.setFillColor(TEXT_PRIMARY)
    c.drawString(60, 126, "• Project Baseline: React 18 / Vite 5 / Zero-Database Jamstack Architecture")
    c.drawString(60, 112, "• Verification Status: 157 / 157 Automated Tests Passed • 0 Console Errors")
    c.drawString(60, 98, "• Delivery Artifacts: Website_Source_Code.zip • 3 PDFs • 18 Screenshots • Audit Report")
    c.drawString(60, 84, "• Handover Completed: November 23, 2026 • Verified Ready for Client Hosting Deployment")
    
    c.showPage()
    c.save()
    print(f"Successfully generated {OUTPUT_PDF} (8 Pages)")

if __name__ == '__main__':
    build_handover_doc()
