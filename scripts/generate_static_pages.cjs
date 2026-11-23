const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run npm run build first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
const BASE_URL = 'https://any172262-hue.github.io/maa-kamakhya-auto-gas/';
const LOGO_URL = `${BASE_URL}images/maa-kamakhya-auto-gas-logo.png`;

const servicePages = [
  {
    path: 'services/cng-services',
    slug: 'cng-services',
    title: 'CNG Services in Guwahati | Maa Kamakhya Auto Gas',
    description: "Looking for CNG services in Guwahati? Visit Maa Kamakhya Auto Gas at Pachim Boragaon, Garchuk, for CNG-related automotive services.",
    canonical: `${BASE_URL}services/cng-services/`,
    h1: 'CNG Services in Guwahati',
    summary: 'Maa Kamakhya Auto Gas provides CNG-related automotive services in Guwahati, Assam. Located at Pachim Boragaon, Garchuk, on NH 37, we serve customers looking for CNG services and vehicle gas solutions. Our services include CNG-related automotive assistance, gas kit installation, vehicle gas conversion, and gas kit repair and maintenance. Our location in Pachim Boragaon, Garchuk, makes it convenient for customers in Guwahati to find our business. Contact Maa Kamakhya Auto Gas to discuss your vehicle requirements and enquire about service availability.',
    sections: [
      {
        title: 'Sequential CNG Retrofitment',
        desc: 'We install and calibrate sequential CNG injection systems for private cars and commercial vehicles. Each kit includes dedicated microprocessors, gas injector rails, and high-pressure reducers calibrated for smooth performance.'
      },
      {
        title: 'Cylinder Safety & Periodic Inspection',
        desc: 'Periodic cylinder inspection and safety verification are standard requirements for gas-powered vehicles. We assist customers with safety checks, pressure verification, and compliance guidance.'
      },
      {
        title: 'Dual-Fuel Calibration & Handover Support',
        desc: 'Our technicians conduct dual-fuel calibration to ensure smooth petrol-to-CNG transition. We provide standard service documentation required for vehicle records in Assam.'
      },
      {
        title: 'Routine Maintenance & Preventive Care',
        desc: 'System inspection, gas filter replacement, low-pressure hose audits, and injector cleaning to maintain proper mileage and vehicle longevity.'
      }
    ],
    faqs: [
      {
        question: 'What CNG services does Maa Kamakhya Auto Gas provide in Guwahati?',
        answer: 'We provide sequential CNG kit installation, vehicle gas conversions, system tuning, cylinder inspection coordination, leak audits, and replacement parts.'
      },
      {
        question: 'Which car models are compatible with sequential CNG kits?',
        answer: 'Most multi-point fuel-injected (MPFI) petrol vehicles from Maruti Suzuki, Hyundai, Tata Motors, Honda, Toyota, and Renault can be retrofitted with suitable sequential CNG kits.'
      },
      {
        question: 'How much can I save by switching to CNG in Guwahati?',
        answer: 'With CNG priced lower per kilogram than petrol per liter in Guwahati, motorists typically achieve meaningful reductions in daily fuel expenditure depending on driving habits.'
      },
      {
        question: 'Where is your workshop located?',
        answer: 'Our workshop is located at NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam, India.'
      }
    ],
    internalLinks: [
      { name: 'CNG Filling Station', path: 'services/auto-gas-filling/', text: 'Explore CNG filling services' },
      { name: 'Gas Kit Installation', path: 'services/gas-kit-installation/', text: 'Gas kit installation' },
      { name: 'Vehicle Gas Conversion', path: 'services/vehicle-gas-conversion/', text: 'Explore vehicle gas conversion process' },
      { name: 'Gas Kit Repair & Maintenance', path: 'services/gas-kit-repair-maintenance/', text: 'View maintenance & diagnostic services' },
      { name: 'About Maa Kamakhya Auto Gas', path: 'about/', text: 'Read about our workshop credentials' },
      { name: 'Contact Us', path: 'contact/', text: 'Get in touch for a workshop appointment' }
    ]
  },
  {
    path: 'services/lpg-services',
    slug: 'lpg-services',
    title: 'LPG Services in Guwahati | Maa Kamakhya Auto Gas',
    description: 'Explore LPG-related automotive services at Maa Kamakhya Auto Gas in Pachim Boragaon, Garchuk, Guwahati. Contact us for service enquiries.',
    canonical: `${BASE_URL}services/lpg-services/`,
    h1: 'LPG Services in Guwahati',
    summary: 'Maa Kamakhya Auto Gas offers LPG-related automotive services in Guwahati, Assam. Located at Pachim Boragaon, Garchuk, our business provides LPG-related service options for customers looking for vehicle gas solutions. If you are interested in LPG services, gas kit installation, or gas kit repair and maintenance, contact us to discuss your vehicle requirements and available service options. Note: This workshop does not offer LPG fuel filling at the station.',
    sections: [
      {
        title: 'Automotive LPG Kit Installation',
        desc: 'Professional installation of certified sequential auto LPG vapor injection systems designed for smooth power output, lower emissions, and substantial running cost reductions.'
      },
      {
        title: 'LPG System Diagnostics & Tuning',
        desc: 'Computerized calibration of LPG electronic control units (ECU), vaporizer pressure adjustments, and diagnostic fault isolation.'
      },
      {
        title: 'Safety Valve & Multi-Point Leak Audits',
        desc: 'Rigorous leak inspection using electronic gas detectors across all high-pressure lines, multivalves, and vapor lines to ensure passenger safety.'
      }
    ],
    faqs: [
      {
        question: 'Do you offer automotive LPG maintenance and repair?',
        answer: 'Yes, our certified technicians service LPG vaporizers, solenoid valves, injector rails, and perform safety leak audits on compatible vehicles.'
      },
      {
        question: 'How does Auto LPG compare with CNG?',
        answer: 'Auto LPG operates at lower tank pressure (approx. 10-12 bar vs 200 bar for CNG) and uses lighter cylinders, while CNG offers higher overall fuel cost savings for high-mileage drivers.'
      }
    ],
    internalLinks: [
      { name: 'Auto Gas Filling Information', path: 'services/auto-gas-filling/', text: 'Check autogas dispensing information' },
      { name: 'CNG Services', path: 'services/cng-services/', text: 'Compare with sequential CNG services' },
      { name: 'Contact Workshop', path: 'contact/', text: 'Schedule an LPG consultation' }
    ]
  },
  {
    path: 'services/auto-gas-filling',
    slug: 'auto-gas-filling',
    title: 'CNG Filling Station in Guwahati | Maa Kamakhya Auto Gas',
    description: 'Looking for CNG filling in Guwahati? Find Maa Kamakhya Auto Gas at NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam.',
    canonical: `${BASE_URL}services/auto-gas-filling/`,
    h1: 'CNG Filling Station in Guwahati',
    summary: 'Looking for CNG filling in Guwahati? Maa Kamakhya Auto Gas provides CNG filling services at Pachim Boragaon, Garchuk, Guwahati. Our CNG filling station is located on NH 37, making our location easy to identify for customers travelling through the Pachim Boragaon and Garchuk area. Fuel available at the filling station: CNG. For the latest information about CNG availability and operating hours, please contact the business before visiting. Address: NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam, India.',
    sections: [
      {
        title: 'Fuel Available at Filling Station: CNG',
        desc: 'Please note that CNG is the confirmed fuel available at our filling station. We do not provide LPG filling at this station. For all CNG dispensing queries, please contact our team.'
      },
      {
        title: 'Prime NH 37 Location Access',
        desc: 'Located at NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam, India. Convenient highway access makes it simple for private cars and commercial vehicles traveling between Jalukbari, ISBT, and Lokhra.'
      },
      {
        title: 'Cylinder Compliance & Safety Standards',
        desc: 'Prior to refilling, cylinders must display a valid PESO hydro-test compliance plate within the 3-year certification window and a functioning compliance compliance plate.'
      },
      {
        title: 'Dispensing Safety Protocol',
        desc: 'Drivers must switch off ignition, step out of the vehicle, and ensure no electronic devices are in use during the gas dispensing procedure.'
      }
    ],
    faqs: [
      {
        question: 'What are the workshop and service operating hours?',
        answer: 'We operate Monday to Saturday from 9:00 AM to 7:30 PM. Sunday appointments are available upon prior booking.'
      },
      {
        question: 'What documents are required for cylinder refilling compliance?',
        answer: 'Vehicles require an endorsed Registration Certificate (RC) showing CNG/LPG fuel endorsement and a valid PESO hydro-testing compliance plate.'
      }
    ],
    internalLinks: [
      { name: 'CNG Services', path: 'services/cng-services/', text: 'View full CNG retrofitment offerings' },
      { name: 'Workshop Location Map', path: 'contact/', text: 'Get GPS directions to NH 37 workshop' }
    ]
  },
  {
    path: 'services/gas-kit-installation',
    slug: 'gas-kit-installation',
    title: 'Gas Kit Installation in Guwahati | Maa Kamakhya Auto Gas',
    description: 'Enquire about vehicle gas kit installation at Maa Kamakhya Auto Gas, Pachim Boragaon, Garchuk, Guwahati. Contact us for service information.',
    canonical: `${BASE_URL}services/gas-kit-installation/`,
    h1: 'Vehicle Gas Kit Installation in Guwahati',
    summary: 'Maa Kamakhya Auto Gas provides gas kit installation services in Guwahati, Assam. Located at Pachim Boragaon, Garchuk, we offer vehicle gas kit installation services for customers looking for automotive gas solutions. Vehicle compatibility and installation requirements can vary. Contact us with your vehicle details to discuss suitable service options and availability. Visit or contact Maa Kamakhya Auto Gas at NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam.',
    sections: [
      {
        title: 'Government-Homologated Sequential Systems',
        desc: 'We install premium sequential autogas injection systems engineered with high-precision injector rails, advanced microprocessors, and PESO-approved seamless cylinders.'
      },
      {
        title: 'Step-by-Step Installation Process',
        desc: 'From initial intake inspection and cylinder boot mounting to injector manifold tapping, ECU harness integration, and dynamic road testing with gas-flow analysis.'
      },
      {
        title: 'Warranty & Post-Installation Support',
        desc: 'All installations are backed by manufacturer hardware warranties, complimentary first check-ups, and dedicated post-retrofitment technical support.'
      }
    ],
    faqs: [
      {
        question: 'How long does a sequential CNG kit installation take?',
        answer: 'A standard sequential CNG kit installation is typically completed in 6 to 8 hours by our specialized mechanical and electrical team.'
      },
      {
        question: 'Will CNG kit installation damage my vehicle engine?',
        answer: 'No. Modern sequential injection systems inject gas precisely timed with engine valve openings, preventing backfiring, overheating, and preserving engine life.'
      }
    ],
    internalLinks: [
      { name: 'Vehicle Gas Conversion', path: 'services/vehicle-gas-conversion/', text: 'Learn about vehicle gas conversion' },
      { name: 'Repair & Maintenance', path: 'services/gas-kit-repair-maintenance/', text: 'Explore preventive care and diagnostics' },
      { name: 'Contact for Quote', path: 'contact/', text: 'Request a customized installation quote' }
    ]
  },
  {
    path: 'services/vehicle-gas-conversion',
    slug: 'vehicle-gas-conversion',
    title: 'Vehicle Gas Conversion in Guwahati | Maa Kamakhya Auto Gas',
    description: 'Enquire about vehicle gas conversion at Maa Kamakhya Auto Gas in Pachim Boragaon, Garchuk, Guwahati. Contact us to discuss your vehicle requirements.',
    canonical: `${BASE_URL}services/vehicle-gas-conversion/`,
    h1: 'Vehicle Gas Conversion in Guwahati',
    summary: 'Looking for vehicle gas conversion services in Guwahati? Maa Kamakhya Auto Gas offers vehicle gas conversion services at Pachim Boragaon, Garchuk. Vehicle conversion requirements depend on the vehicle model, the selected gas system, and applicable safety and regulatory requirements. Contact Maa Kamakhya Auto Gas to discuss your vehicle and enquire about available conversion services. Location: NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam.',
    sections: [
      {
        title: 'Dual-Fuel Operating Flexibility',
        desc: 'Retain the capability to drive on petrol or CNG with a simple dashboard selector switch, ensuring complete peace of mind on long highway trips.'
      },
      {
        title: 'Vehicle Brand & Model Compatibility',
        desc: 'We retrofit popular Indian models across Maruti Suzuki (Swift, Dzire, WagonR, Ertiga), Hyundai (i10, i20, Aura), Tata Motors, Honda, Toyota, and commercial fleets.'
      },
      {
        title: 'Regulatory RC Endorsement Documentation',
        desc: 'We provide complete paperwork, manufacturer homologation certificates, and guidance to update your registration certificate at the DTO Guwahati.'
      }
    ],
    faqs: [
      {
        question: 'Can I switch back to petrol while driving?',
        answer: 'Yes, sequential systems feature an automatic or manual selector switch on the dashboard allowing instant toggling between petrol and CNG mode.'
      },
      {
        question: 'What happens when CNG runs out while driving?',
        answer: 'The system automatically senses low pressure and smoothly shifts back to petrol mode without stopping the engine or causing power hesitation.'
      }
    ],
    internalLinks: [
      { name: 'Gas Kit Installation', path: 'services/gas-kit-installation/', text: 'Gas kit installation' },
      { name: 'CNG Services Overview', path: 'services/cng-services/', text: 'Explore complete service offerings' },
      { name: 'Contact Workshop', path: 'contact/', text: 'Speak with an automotive technician' }
    ]
  },
  {
    path: 'services/gas-kit-repair-maintenance',
    slug: 'gas-kit-repair-maintenance',
    title: 'Gas Kit Repair in Guwahati | Maa Kamakhya Auto Gas',
    description: 'Need gas kit repair or maintenance in Guwahati? Contact Maa Kamakhya Auto Gas at Pachim Boragaon, Garchuk, Assam.',
    canonical: `${BASE_URL}services/gas-kit-repair-maintenance/`,
    h1: 'Gas Kit Repair and Maintenance in Guwahati',
    summary: 'Maa Kamakhya Auto Gas provides gas kit repair and maintenance services in Guwahati, Assam. If you are experiencing an issue with your vehicle\'s gas kit or need maintenance assistance, contact us to discuss the problem and available service options. Our business is located at Pachim Boragaon, Garchuk, on NH 37, Guwahati - 781035. For vehicle gas system concerns, seek assistance from a qualified professional. If you suspect a gas leak, stop using the system and seek professional assistance rather than attempting a repair yourself.',
    sections: [
      {
        title: 'Computerized Diagnostic Scanning',
        desc: 'We connect specialized software to your gas ECU to analyze fuel trim graphs, injection pulse timings, sensor voltages, and clear fault codes.'
      },
      {
        title: 'Ultrasonic Injector Cleaning & Calibration',
        desc: 'Removes paraffin and gum build-up from sequential gas injectors to restore smooth engine idling, responsive acceleration, and maximum fuel mileage.'
      },
      {
        title: 'Gas Filter Replacement & Leak Audit',
        desc: 'Low-pressure and high-pressure filter servicing every 10,000 km, accompanied by ultrasonic electronic leak detection along all connection points.'
      }
    ],
    faqs: [
      {
        question: 'How frequently should a CNG kit be serviced?',
        answer: 'We recommend routine maintenance every 10,000 km or 12 months, including gas filter replacement, pressure checking, and leak inspections.'
      },
      {
        question: 'What are the symptoms of a failing gas kit component?',
        answer: 'Common indicators include engine jerking on acceleration, unexpected switching back to petrol, rough idling on gas, or faint odor of gas.'
      }
    ],
    internalLinks: [
      { name: 'CNG Services', path: 'services/cng-services/', text: 'Explore CNG services' },
      { name: 'LPG Services', path: 'services/lpg-services/', text: 'Explore LPG services' },
      { name: 'Gas Kit Installation', path: 'services/gas-kit-installation/', text: 'Learn about new system installations' },
      { name: 'Contact for Diagnostics', path: 'contact/', text: 'Book a diagnostic scan today' }
    ]
  },
  {
    path: 'about',
    slug: 'about',
    title: 'About Us | Maa Kamakhya Auto Gas Guwahati, Assam',
    description: "Learn about Maa Kamakhya Auto Gas, a local workshop on NH 37 in Garchuk, Guwahati providing CNG and LPG services, gas kit installation, and maintenance.",
    canonical: `${BASE_URL}about/`,
    h1: 'About Maa Kamakhya Auto Gas',
    summary: "Maa Kamakhya Auto Gas is a local automotive gas service workshop on National Highway 37, Garchuk, Guwahati providing CNG & LPG services, kit installation, conversion, and maintenance.",
    sections: [
      {
        title: 'Our Mission & Quality Standards',
        desc: 'We are dedicated to providing motorists in Guwahati and Assam with safe, dependable, and cost-effective alternative fuel conversions. Our workshop prioritizes driver safety, upfront pricing, and dependable performance.'
      },
      {
        title: 'Confirmed Business Profile',
        desc: 'Operated by Maa Kamakhya Auto Gas on NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam, India. Services include CNG & LPG solutions, kit installation, conversion, repair, and CNG filling.'
      },
      {
        title: 'Workshop Facility',
        desc: 'Our facility on NH 37 is equipped for gas kit retrofitting, system tuning, periodic inspections, and genuine replacement parts.'
      }
    ],
    faqs: [
      {
        question: 'Where is the Maa Kamakhya Auto Gas workshop located?',
        answer: 'We are located at NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam, India.'
      },
      {
        question: 'What payment modes are accepted at your center?',
        answer: 'Please contact the workshop directly or enquire on WhatsApp regarding service arrangements and payment options.'
      }
    ],
    internalLinks: [
      { name: 'CNG Services', path: 'services/cng-services/', text: 'Explore our CNG solutions' },
      { name: 'Contact & Map', path: 'contact/', text: 'Get workshop directions and telephone numbers' }
    ]
  },
  {
    path: 'contact',
    slug: 'contact',
    title: 'Contact Us | Maa Kamakhya Auto Gas NH 37 Guwahati',
    description: 'Contact Maa Kamakhya Auto Gas on NH 37, Garchuk, Guwahati. Call +91 69139 10337 or WhatsApp +91 69139 10337 for quotes, directions, and appointments.',
    canonical: `${BASE_URL}contact/`,
    h1: 'Contact Maa Kamakhya Auto Gas',
    summary: 'Connect directly with Maa Kamakhya Auto Gas on NH 37, Garchuk, Guwahati for retrofitment inquiries, vehicle gas options, and service information.',
    sections: [
      {
        title: 'Workshop Address & Landmark Directions',
        desc: 'NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam, India. Easily accessible from ISBT Guwahati (5 mins), Jalukbari flyover (10 mins), and Lokhra bypass.'
      },
      {
        title: 'Direct Telephony & WhatsApp Hotline',
        desc: 'Call us directly at +91 69139 10337 or message our technical advisors on WhatsApp at +91 69139 10337 for assistance and quotation breakdowns.'
      },
      {
        title: 'Operating Hours & Service Bookings',
        desc: 'Operating hours are not provided online. Please contact the workshop directly to confirm current hours and service availability.'
      }
    ],
    faqs: [
      {
        question: 'Can I get a quote over WhatsApp?',
        answer: 'Yes! Simply message us on WhatsApp at +91 69139 10337 with your vehicle make and model, and our technical team will send you an itemized estimate.'
      },
      {
        question: 'Do I need an appointment for cylinder hydro-testing?',
        answer: 'Prior booking is recommended to ensure priority processing and minimal vehicle downtime at the testing center.'
      }
    ],
    internalLinks: [
      { name: 'About Us', path: 'about/', text: 'Learn more about our certifications' },
      { name: 'CNG Services', path: 'services/cng-services/', text: 'Discover our installation services' }
    ]
  },
  {
    path: 'privacy-policy',
    slug: 'privacy-policy',
    title: 'Privacy Policy | Maa Kamakhya Auto Gas',
    description: 'Privacy Policy for Maa Kamakhya Auto Gas, outlining data handling, quote inquiry privacy, and user rights.',
    canonical: `${BASE_URL}privacy-policy/`,
    h1: 'Privacy Policy',
    summary: 'Official Privacy Policy for Maa Kamakhya Auto Gas in Guwahati, Assam. Details our customer data privacy standards, enquiry processing protocols, and user rights.',
    sections: [
      {
        title: 'Overview and Scope',
        desc: 'Maa Kamakhya Auto Gas operates an automotive gas service facility located at NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam, India. This policy covers customer enquiry information and web communications.'
      },
      {
        title: 'Customer Data Handling & WhatsApp Communications',
        desc: 'When you submit an inquiry form or initiate a WhatsApp discussion, we only collect contact details necessary to answer your technical and pricing queries. We never sell or distribute customer contact details to third parties.'
      }
    ],
    faqs: [],
    internalLinks: [
      { name: 'Terms & Conditions', path: 'terms-conditions/', text: 'Read our Terms & Conditions' },
      { name: 'Contact Us', path: 'contact/', text: 'Contact our data privacy representative' }
    ]
  },
  {
    path: 'terms-conditions',
    slug: 'terms-conditions',
    title: 'Terms & Conditions | Maa Kamakhya Auto Gas',
    description: 'Terms and Conditions for Maa Kamakhya Auto Gas workshop services, quotes, and automotive retrofitment disclosures.',
    canonical: `${BASE_URL}terms-conditions/`,
    h1: 'Terms & Conditions',
    summary: 'Official Terms and Conditions for Maa Kamakhya Auto Gas website and workshop services in Guwahati, Assam.',
    sections: [
      {
        title: '1. Acceptance of Terms',
        desc: 'By accessing or using the website of Maa Kamakhya Auto Gas, you acknowledge and agree to comply with these terms of use. All retrofitment operations are conducted in accordance with approved automotive industry specifications.'
      },
      {
        title: '2. Fuel Savings Calculations Disclaimer',
        desc: 'Fuel cost comparisons and savings figures displayed on this website are illustrative estimates based on user-entered mileage, local fuel retail tariffs, and standard test cycles. Actual vehicle fuel economy varies with traffic conditions, driving style, AC usage, and payload.'
      }
    ],
    faqs: [],
    internalLinks: [
      { name: 'Privacy Policy', path: 'privacy-policy/', text: 'Review our Privacy Policy' },
      { name: 'About Us', path: 'about/', text: 'Review company statutory credentials' }
    ]
  }
];

function buildCrawlableHtml(page) {
  const isHome = false;
  const isService = page.path.startsWith('services/');

  const breadcrumbsHtml = `
    <nav aria-label="Breadcrumb" style="padding: 1rem 0; font-size: 0.85rem; color: #8899A6;">
      <a href="${BASE_URL}" style="color: #FFD52A; text-decoration: none;">Home</a>
      ${isService ? ` <span style="margin: 0 0.5rem;">/</span> <a href="${BASE_URL}#services" style="color: #FFD52A; text-decoration: none;">Services</a>` : ''}
      <span style="margin: 0 0.5rem;">/</span>
      <span style="color: #F7F9FF;">${page.h1}</span>
    </nav>
  `;

  const sectionsHtml = page.sections.map(sec => `
    <section style="margin: 2rem 0; padding: 1.5rem; background: #0B2142; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
      <h2 style="font-size: 1.35rem; color: #FFD52A; margin-bottom: 0.75rem;">${sec.title}</h2>
      <p style="color: #B7C5DC; line-height: 1.7; font-size: 1rem;">${sec.desc}</p>
    </section>
  `).join('');

  const faqsHtml = page.faqs && page.faqs.length > 0 ? `
    <section style="margin: 3rem 0;">
      <h2 style="font-size: 1.6rem; color: #FFFFFF; margin-bottom: 1.5rem; border-bottom: 2px solid #FFD52A; padding-bottom: 0.5rem;">Frequently Asked Questions</h2>
      ${page.faqs.map(faq => `
        <article style="margin-bottom: 1.5rem; padding: 1.25rem; background: #07152C; border-left: 3px solid #FFD52A; border-radius: 4px;">
          <h3 style="font-size: 1.15rem; color: #FFFFFF; margin-bottom: 0.5rem;">${faq.question}</h3>
          <p style="color: #B7C5DC; line-height: 1.6; margin: 0;">${faq.answer}</p>
        </article>
      `).join('')}
    </section>
  ` : '';

  const internalLinksHtml = page.internalLinks && page.internalLinks.length > 0 ? `
    <nav style="margin: 3rem 0; padding: 1.5rem; background: #0B2142; border-radius: 8px;">
      <h3 style="font-size: 1.2rem; color: #FFD52A; margin-bottom: 1rem;">Related Automotive Services & Pages</h3>
      <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 0.75rem;">
        ${page.internalLinks.map(link => `
          <li>
            <a href="${BASE_URL}${link.path}" style="color: #55A4FF; text-decoration: none; font-weight: 500;">
              → <strong>${link.name}:</strong> ${link.text}
            </a>
          </li>
        `).join('')}
      </ul>
    </nav>
  ` : '';

  const napBlock = `
    <aside style="margin-top: 3rem; padding: 2rem; background: #07152C; border: 1px solid #1677FF; border-radius: 8px;">
      <h3 style="font-size: 1.3rem; color: #FFFFFF; margin-bottom: 1rem;">Maa Kamakhya Auto Gas Workshop Information</h3>
      <p style="color: #B7C5DC; margin-bottom: 0.5rem;"><strong>Address:</strong> NH 37, Pachim Boragaon, Garchuk, Guwahati - 781035, Assam, India</p>
      <p style="color: #B7C5DC; margin-bottom: 0.5rem;"><strong>Direct Phone:</strong> <a href="tel:+916913910337" style="color: #FFD52A;">+91 69139 10337</a></p>
      <p style="color: #B7C5DC; margin-bottom: 0.5rem;"><strong>WhatsApp Enquiries:</strong> <a href="https://wa.me/916913910337" style="color: #55A4FF;">+91 69139 10337</a></p>
      <p style="color: #B7C5DC; margin-bottom: 0.5rem;"><strong>Operating Hours:</strong> Operating hours are not currently published online. Please contact workshop directly before visiting.</p>
      <p style="color: #B7C5DC; margin-bottom: 0;"><strong>District & State:</strong> Kamrup Metropolitan, Assam, India</p>
    </aside>
  `;

  return `
    <div style="font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; background-color: #07152C; color: #F7F9FF; min-height: 100vh; padding: 2rem 1.5rem;">
      <div style="max-width: 1050px; margin: 0 auto;">
        ${breadcrumbsHtml}
        <header style="margin-bottom: 2.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1.5rem;">
          <h1 style="font-size: 2.25rem; font-weight: 800; color: #FFFFFF; line-height: 1.25; margin-bottom: 1rem;">${page.h1}</h1>
          <p style="font-size: 1.15rem; color: #B7C5DC; line-height: 1.6; max-width: 900px;">${page.summary}</p>
        </header>
        <main>
          ${sectionsHtml}
          ${faqsHtml}
          ${internalLinksHtml}
          ${napBlock}
        </main>
      </div>
    </div>
  `;
}

function buildJsonLd(page) {
  const isService = page.path.startsWith('services/');

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": BASE_URL
    }
  ];

  if (isService) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": `${BASE_URL}#services`
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": page.h1,
      "item": page.canonical
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": page.h1,
      "item": page.canonical
    });
  }

  const graph = [
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}#localbusiness`,
      "name": "Maa Kamakhya Auto Gas",
      "legalName": "Maa Kamakhya Auto Gas",
      "url": BASE_URL,
      "logo": LOGO_URL,
      "image": LOGO_URL,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "NH 37, Pachim Boragaon",
        "addressLocality": "Garchuk, Guwahati",
        "addressRegion": "Assam",
        "postalCode": "781035",
        "addressCountry": "IN"
      },
      "hasMap": "https://www.google.com/maps/place/26%C2%B007'12.1%22N+91%C2%B041'47.5%22E/@26.1200128,91.6965264,17z/data=!3m1!4b1!4m4!3m3!8m2!3d26.1200128!4d91.6965264"
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    }
  ];

  if (isService) {
    graph.push({
      "@type": "Service",
      "name": page.h1,
      "description": page.description,
      "provider": {
        "@id": `${BASE_URL}#autorepair`
      },
      "areaServed": {
        "@type": "City",
        "name": "Guwahati"
      }
    });

    if (page.faqs && page.faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "mainEntity": page.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      });
    }
  } else if (page.slug === 'about') {
    graph.push({
      "@type": "AboutPage",
      "name": page.h1,
      "description": page.description,
      "mainEntity": {
        "@id": `${BASE_URL}#autorepair`
      }
    });
  } else if (page.slug === 'contact') {
    graph.push({
      "@type": "ContactPage",
      "name": page.h1,
      "description": page.description,
      "mainEntity": {
        "@id": `${BASE_URL}#autorepair`
      }
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

function generateHtml(page) {
  let html = template;

  // 1. Replace title
  html = html.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);

  // 2. Replace meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${page.description}" />`
  );

  // 3. Replace og:title & og:description
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${page.description}" />`
  );

  // 4. Replace og:url
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${page.canonical}" />`
  );

  // 5. Replace twitter:title & twitter:description
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${page.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${page.description}" />`
  );

  // 6. Replace canonical link
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${page.canonical}" />`
  );

  // 7. Inject page JSON-LD
  const jsonLd = buildJsonLd(page);
  const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, jsonLdScript);

  // 8. Inject prerendered crawlable content inside <div id="root">
  const crawlableHtml = buildCrawlableHtml(page);
  html = html.replace(
    /<div id="root"[^>]*>[\s\S]*?<\/div>/,
    `<div id="root" style="min-height: 100vh; background-color: #07152C;">${crawlableHtml}</div>`
  );

  return html;
}

// Generate static pages
servicePages.forEach((page) => {
  const targetDir = path.join(distDir, page.path);
  fs.mkdirSync(targetDir, { recursive: true });
  const html = generateHtml(page);
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`✓ Generated crawlable page: dist/${page.path}/index.html`);
});

// Generate 404.html with GitHub Pages SPA redirect
const spaRedirectScript = `
    <script>
      (function() {
        var base = '/maa-kamakhya-auto-gas/';
        var path = window.location.pathname;
        if (path.indexOf(base) === 0) {
          var segment = path.slice(base.length);
          if (segment.endsWith('/')) segment = segment.slice(0, -1);
          if (segment && segment.indexOf('.') === -1) {
            window.location.replace(base + '#/' + segment + window.location.search);
          }
        }
      })();
    </script>
`;
const fallback404 = template.replace('</head>', `${spaRedirectScript}</head>`);
fs.writeFileSync(path.join(distDir, '404.html'), fallback404, 'utf8');
console.log('✓ Generated SPA fallback: dist/404.html');

console.log('All static crawlable pages generated successfully.');
