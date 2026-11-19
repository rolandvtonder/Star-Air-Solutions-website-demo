/**
 * All copy lives here, taken from the Star Air Solution company profile and
 * flyer. Edit text here — components only lay it out.
 */

export const brand = {
  name: 'Star Air Solution',
  legal: 'Star Air Solution (Pty) Ltd',
  reg: '2018/080931/07',
  founded: 'February 2018',
  tagline: 'Coldrooms · Air-conditioning · Refrigeration · Mobiles',
};

export const contact = {
  director: 'Mr Madlopha Bethwell',
  cell: '072 599 0798',
  alt: '064 051 5262',
  email: 'info@starairsolution.com',
  address: ['Willowfontain Terminus', 'Pietermaritzburg', '3201'],
  postal: 'P.O. Box 32042, Pietermaritzburg, 3201',
  region: 'KwaZulu-Natal & Eastern Cape',
  socials: [
    {label: 'Facebook', href: 'https://www.facebook.com/Starairsolution/'},
    {label: 'Instagram', href: 'https://www.instagram.com/starairsolutions/'},
    {label: 'WhatsApp', href: 'https://wa.me/27725990798'},
  ],
};

/** A site path that works whether the site is served at / or under a sub-path (GitHub Pages). */
export const url = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const tel = (n: string) => `tel:+27${n.replace(/\s/g, '').replace(/^0/, '')}`;
export const whatsapp = (text?: string) =>
  `https://wa.me/27725990798${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Willowfontain, Pietermaritzburg 3201')}`;

export type PageId = 'home' | 'about' | 'services' | 'projects' | 'gallery' | 'contact';

export const nav: {id: PageId; label: string; href: string}[] = [
  {id: 'home', label: 'Home', href: url('/')},
  {id: 'about', label: 'About us', href: url('/about/')},
  {id: 'services', label: 'Services', href: url('/services/')},
  {id: 'projects', label: 'Projects', href: url('/projects/')},
  {id: 'gallery', label: 'Gallery', href: url('/gallery/')},
  {id: 'contact', label: 'Contact', href: url('/contact/')},
];

/** A headline line; `i` lines are set in italic. */
export type Line = {t: string; i?: boolean};

export const home = {
  lines: [{t: 'Cool air.'}, {t: 'Clean air.', i: true}, {t: 'Built to'}, {t: 'last.', i: true}] as Line[],
  body: 'Complete HVAC design, installation and service for government, commercial, industrial and home clients across KwaZulu-Natal and the Eastern Cape.',
  slides: [
    {id: 'p-123', caption: 'LG Multi V 5 VRF plant and ducting'},
    {id: 'p-114', caption: 'Rooftop supply-air ducting'},
    {id: 'p-113', caption: 'Air handling unit lifted into place'},
    {id: 'p-111', caption: 'Samsung VRV outdoor units on a rooftop'},
  ],
  intro: {
    kicker: 'Welcome',
    title: [{t: 'Best HVAC solutions'}, {t: 'in Southern Africa', i: true}] as Line[],
    body: 'We offer a complete and integrated range of equipment for centralised air conditioning in retail, commercial and industrial applications — and the same care for a single split unit at home. We are fully committed to our clients and co-workers, innovation, knowledge, experience and teamwork.',
  },
  stats: [
    ['2018', 'Registered & operating'],
    ['4', 'Core services'],
    ['11+', 'Major projects'],
    ['2', 'Provinces served'],
  ] as [string, string][],
};

export type Panel = {id: string; name: [string, string]; specs: [string, string][]; photo: string; tint: string};

/** The three tall panels that slide in on the home page. */
export const panels: Panel[] = [
  {id: 'aircon', name: ['Air', 'Conditioning'], specs: [['Systems', 'Splits · VRV · VRF'], ['For', 'Homes to hospitals']], photo: 'p-111', tint: '#0a6fc2'},
  {id: 'ducting', name: ['Ducting &', 'Ventilation'], specs: [['Systems', 'Ducting · AHU · Rooftop'], ['For', 'Commercial & industrial']], photo: 'p-114', tint: '#0b2a6b'},
  {id: 'cold', name: ['Cold rooms &', 'Refrigeration'], specs: [['Systems', 'Cold rooms · Mobiles'], ['Also', 'Chilled water']], photo: 'p-321', tint: '#e31e24'},
];

export const about = {
  lines: [{t: 'Honest work.'}, {t: 'Since 2018.', i: true}] as Line[],
  body: 'A licensed and insured HVAC contractor with a reputation built on honesty and quality.',
  overview: [
    'Star Air Solution was established and registered in February 2018 by Madlopha Bethwell (Director), specialising in HVAC services in the southern parts of Africa. We pledged to provide consistent, high-quality, expert services for government departments, shopping centres, commercial offices, industrial and home clients — a servicing and maintenance company offering a wide range of services around heating, ventilation and air conditioning.',
    'We have been in continuous operation ever since, building a reputation for honesty and quality in a city where your good name is key to long-lasting success. We give our people a great work environment through training, job security and benefits — and those experts deliver consistent service to all of our KwaZulu-Natal and Eastern Cape clients.',
  ],
  mission:
    'To provide quality design, installation and service for heating, ventilation and air conditioning (HVAC) equipment in both residential and light commercial markets — and to maintain the highest level of design and engineering possible.',
  vision:
    'To provide 100% customer satisfaction, as determined by you, our customer. We aspire to be the industry leader in healthy and efficient indoor comfort products and service.',
  sectors: ['Government departments', 'Hospitals & clinics', 'Shopping centres', 'Commercial offices', 'Industrial sites', 'Homes'],
  values: [
    ['Honesty', 'Straight answers on faults, timelines and cost — your good name depends on ours.'],
    ['Quality', 'Neat, compliant installs engineered to run at full capacity for years.'],
    ['People', 'Trained, secure, well-supported technicians who take pride in the work.'],
  ] as [string, string][],
};

export type Service = {id: string; title: string; body: string; photo: string; points: string[]};

export const services = {
  lines: [{t: 'Install. Inspect.'}, {t: 'Maintain. Repair.', i: true}] as Line[],
  body: 'A licensed and insured HVAC retailing, servicing and maintenance company with four core services.',
  core: [
    {
      id: 'installation',
      title: 'Installation',
      photo: 'p-113',
      body: 'Complete as well as partial HVAC system installation — heating and cooling systems, refrigeration, air venting, air conditioning, furnaces and humidifiers, and duct systems. Buy your equipment from the manufacturer or at retail price from us.',
      points: ['Split, VRV & VRF systems', 'Ducting & air handling units', 'Chilled water & rooftop units'],
    },
    {
      id: 'inspection',
      title: 'Inspection',
      photo: 'p-4321',
      body: 'HVAC systems need inspection at least twice a year to work properly. We inspect systems installed by us or by other providers, finding faults early before they lead to severe and costlier problems.',
      points: ['Twice-yearly checks', 'Systems by any installer', 'Clear fault reporting'],
    },
    {
      id: 'maintenance',
      title: 'Maintenance',
      photo: 'p-1b',
      body: 'HVAC systems need maintenance at least once a year to work at full capacity and efficiency. We provide maintenance and cleaning so your systems and all related components keep working properly.',
      points: ['Annual service plans', 'Cleaning & gas checks', 'Efficiency tuning'],
    },
    {
      id: 'repair',
      title: 'Repair',
      photo: 'p-54',
      body: 'Every kind of repair when an HVAC system or component develops a fault. On new installs we can integrate automatic fault detection with a Building Information Model, so we are notified as soon as a fault appears and can fix it early, while it is easier and cheaper to treat.',
      points: ['Fault finding & repair', 'Automatic fault detection', 'Early, cheaper fixes'],
    },
  ] as Service[],
  systems: [
    ['Split air conditioners', 'Wall-mounted, mid-wall and floor-standing units for homes and offices.'],
    ['VRV / VRF systems', 'Multi-zone variable refrigerant systems for large buildings.'],
    ['Ducting & ventilation', 'Supply, return and extract ducting, fabricated and installed.'],
    ['Air handling units', 'AHU supply, placement, connection and commissioning.'],
    ['Chilled water', 'Chiller plant and chilled-water pipework installation.'],
    ['Rooftop units', 'Packaged rooftop systems for commercial roofs.'],
    ['Cold rooms', 'Walk-in cold rooms for food, retail and medical storage.'],
    ['Mobile cold rooms', 'Trailer-mounted cold rooms for events and transport.'],
    ['Refrigeration', 'Commercial refrigeration installation and repair.'],
  ] as [string, string][],
};

export type Sector = 'Healthcare' | 'Public' | 'Education' | 'Transport' | 'Commercial';

export type Project = {name: string; place: string; scope: string; contractor: string; sector: Sector};

/** Reference projects from the company profile. */
export const projects: Project[] = [
  {name: 'Bambisana Hospital', place: 'Eastern Cape', scope: 'Ducting, VRF, splits, chillers & AHU', contractor: 'Franto Installations', sector: 'Healthcare'},
  {name: 'Zithulele Hospital', place: 'Eastern Cape', scope: 'Ducting, splits & AHU installation', contractor: 'Franto Installations', sector: 'Healthcare'},
  {name: 'St Barnabas Hospital', place: 'Eastern Cape', scope: 'Ducting installations & AHU', contractor: 'Franto Installations', sector: 'Healthcare'},
  {name: 'DUT Steve Biko Campus', place: 'Durban', scope: 'Chilled water installation', contractor: 'Coldpoint', sector: 'Education'},
  {name: 'Prasa Durban Station', place: 'Durban', scope: 'VRV installation', contractor: 'Coldpoint', sector: 'Transport'},
  {name: 'Prasa Security', place: 'Durban', scope: 'VRV installation', contractor: 'Coldpoint', sector: 'Transport'},
  {name: 'Municipality Museum', place: 'Durban', scope: 'VRV ducting & floor-standing units', contractor: 'Coldpoint', sector: 'Public'},
  {name: 'Qunu Museum', place: 'Eastern Cape', scope: 'VRV installation', contractor: 'Clipsal Electrical', sector: 'Public'},
  {name: 'Mbizana Municipality', place: 'Eastern Cape', scope: 'Rooftop unit, splits & ducting', contractor: 'Franto Installations', sector: 'Public'},
  {name: 'Malleable Municipality', place: 'Eastern Cape', scope: 'Mid-wall split installation', contractor: 'Clipsal Electrical', sector: 'Public'},
  {name: 'Umhlanga Ridge 7', place: 'Umhlanga', scope: 'Ducting installation', contractor: 'Aircycle Engineering', sector: 'Commercial'},
];

export const projectsPage = {
  lines: [{t: 'Trusted on'}, {t: 'the big jobs.', i: true}] as Line[],
  body: 'Hospitals, municipalities, museums, a university campus and a railway station — installed alongside some of the region’s leading contractors.',
  contractors: ['Coldpoint', 'Franto Installations', 'Aircycle Engineering', 'Clipsal Electrical'],
};

export const galleryPage = {
  lines: [{t: 'On site.'}, {t: 'On the roof.', i: true}] as Line[],
  body: 'Real photos from our job sites — no stock images.',
};

export const contactPage = {
  lines: [{t: 'Get in'}, {t: 'touch.', i: true}] as Line[],
  body: 'Tell us about your building and what you need. We’ll come back to you with a quote.',
  services: ['Installation', 'Inspection', 'Maintenance', 'Repair', 'Cold room / refrigeration', 'Something else'],
  property: ['Home', 'Office / commercial', 'Industrial', 'Government / public', 'Healthcare'],
};

/** Plain-language description of each job photo, used as alt text and gallery captions. */
export const captions: Record<string, string> = {
  'p-1': 'Technicians servicing VRV outdoor units beside a brick wall',
  'p-1b': 'Technicians running refrigerant pipework between VRV units',
  'p-11': 'Two wall-mounted split units installed in an office',
  'p-111': 'Samsung VRV outdoor units installed on a rooftop',
  'p-112': 'Samsung VRV outdoor units set on a roof plinth',
  'p-113': 'Crew guiding an air handling unit as a crane lowers it into place',
  'p-114': 'Crew installing a long galvanised duct run across a rooftop',
  'p-12': 'Indoor split units with neat trunking on an office wall',
  'p-123': 'LG Multi V 5 VRF outdoor units beneath new ducting at sunrise',
  'p-132': 'Bank of VRV outdoor units on a plant platform',
  'p-14': 'Technician on a ladder fitting an outdoor unit to a wall',
  'p-15': 'Row of outdoor condensers installed on a rooftop',
  'p-16': 'Technician fixing pipework at roof level',
  'p-17': 'Outdoor condensers on a rooftop overlooking trees',
  'p-18': 'Two Carrier outdoor units mounted on wall brackets',
  'p-19': 'Outdoor units being installed in a plant area',
  'p-21': 'Outdoor units mounted down the side of a building',
  'p-211': 'Two air handling units on a new concrete plinth',
  'p-22': 'Commissioning the control board of an outdoor unit',
  'p-23': 'Condensers mounted up a multi-storey wall',
  'p-24': 'Condensers mounted under a roof overhang',
  'p-25': 'Chilled water pipework and pumps in a plant room',
  'p-3': 'Technician on a ladder installing an outdoor unit',
  'p-32': 'Wall-mounted split unit in a finished room',
  'p-321': 'Air handling unit installed on a new concrete plinth',
  'p-322': 'Inspecting an air handling unit on site',
  'p-324': 'Ceiling ducting installed from scaffolding',
  'p-333': 'Technician installing ducting from scaffolding in a large hall',
  'p-4': 'VRV outdoor units opened up for commissioning',
  'p-43': 'Ducting installation in a high-ceilinged hall',
  'p-432': 'Ducting runs suspended from a ceiling',
  'p-4321': 'Outdoor unit being commissioned with refrigerant gauges',
  'p-45': 'Refrigerant gauges connected to a VRV unit',
  'p-456': 'Technician servicing outdoor units beside a brick wall',
  'p-5': 'Outdoor units fitted beside barred windows',
  'p-54': 'Technician brazing pipework beside VRV units',
  'p-6': 'Technician installing a unit on a hospital wall',
  'p-65': 'Insulated refrigerant pipework on a roof platform',
  'p-657': 'Three condensers mounted on a brick building',
  'p-66': 'Outdoor units along a newly built two-storey building',
  'p-67': 'Outdoor units fitted to a building wall',
  'p-7': 'Indoor unit with trunking on a freshly painted wall',
  'p-76': 'Condensers mounted above a brick facade',
  'p-786': 'Ceiling-level split units in an office',
  'p-7865': 'Carrier condensers on wall brackets',
  'p-8': 'Condensers mounted along a roofline',
  'p-87': 'Indoor split unit installed in a bright room',
  'p-89': 'Two indoor split units in an office',
  'p-9': 'Three condensers on a brick building',
  'p-985': 'Technician on a ladder working on an outdoor unit',
  'p-99': 'Split units installed on an office wall',
  'p-wa-2026-11-18-at-20-25-35': 'Outdoor units installed across a building facade',
};

export const footerNote = `© 2026 ${brand.legal} · Reg. No ${brand.reg}`;
