import type { LucideIcon } from 'lucide-react';
import { Building2, Paintbrush, Trees, Map, Hammer, PencilRuler, Compass } from 'lucide-react';

import imgConstruction from '../assets/service-construction.webp';
import imgInterior from '../assets/service-interior-design.webp';
import imgLandscape from '../assets/service-landscape.webp';
import imgSurvey from '../assets/service-survey-works.webp';
import imgStructural from '../assets/service-structural-design.webp';
import imgArchitectural from '../assets/service-architectural-planning.webp';
import imgVastu from '../assets/service-vastu.webp';

export type Service = {
  id: string;
  /** URL fragment for the service's card on /services */
  slug: string;
  title: string;
  /** Short label for compact UI (Services hero tiles) */
  short: string;
  desc: string;
  /** Supporting line, reused from the About page copy */
  detail?: string;
  /** Scope keywords, drawn from existing site copy */
  scope: string[];
  icon: LucideIcon;
  image: string;
};

/* Single source for the seven SRV disciplines (home Services section + /services). */
export const SERVICES: Service[] = [
  {
    id: '01',
    slug: 'construction',
    title: 'Constructions',
    short: 'Construction',
    desc: 'End-to-end building and construction services focusing on uncompromised structural integrity and superior quality.',
    detail: 'End-to-end project oversight ensuring timely delivery and quality assurance.',
    scope: ['Building construction', 'Project management', 'Quality assurance'],
    icon: Building2,
    image: imgConstruction,
  },
  {
    id: '02',
    slug: 'interior-design',
    title: 'Interior Designs & 3D Walkthrough',
    short: 'Interiors & 3D',
    desc: 'Immersive and bespoke interior concepts, visualized through highly detailed 3D walkthroughs for precise planning.',
    detail: 'Transform spaces with personalized interior designs and 3D visualizations.',
    scope: ['Interior design', '3D walkthroughs', 'Personalized concepts'],
    icon: Paintbrush,
    image: imgInterior,
  },
  {
    id: '03',
    slug: 'landscape-elevations',
    title: 'Landscape & Elevations',
    short: 'Landscape',
    desc: 'Striking exterior elevations and lush landscape planning designed to harmonize with the built environment.',
    scope: ['Exterior elevations', 'Landscape development'],
    icon: Trees,
    image: imgLandscape,
  },
  {
    id: '04',
    slug: 'survey-works',
    title: 'Survey Works',
    short: 'Survey',
    desc: 'Accurate site surveying and topographical mappings to establish perfect foundations for any development.',
    detail: 'Precise land surveys, topographic mapping, and comprehensive site planning.',
    scope: ['Land surveying', 'Topographic mapping', 'Site planning'],
    icon: Map,
    image: imgSurvey,
  },
  {
    id: '05',
    slug: 'structural-design',
    title: 'Structural Designs',
    short: 'Structural',
    desc: 'Advanced engineering and structural framing that ensure durability, safety, and architectural brilliance.',
    detail: 'Expert structural design, analysis, and consultation for buildings of all types and scales.',
    scope: ['RCC structural design', 'Structural analysis', 'Consultation'],
    icon: Hammer,
    image: imgStructural,
  },
  {
    id: '06',
    slug: 'architectural-planning',
    title: 'Architectural Planning',
    short: 'Architecture',
    desc: 'Strategic layout and blueprint design optimizing spatial flow, utility, and modern aesthetics.',
    detail: 'Creative architectural solutions blending functionality with stunning aesthetics.',
    scope: ['Layout planning', 'Blueprint design', 'Spatial flow'],
    icon: PencilRuler,
    image: imgArchitectural,
  },
  {
    id: '07',
    slug: 'vastu',
    title: 'Vastu Consultant & Architecture',
    short: 'Vastu',
    desc: 'Harmonious architectural design rooted in traditional Vastu principles for balanced, positive living spaces.',
    detail: 'Harmonize traditional Vastu principles with modern engineering excellence.',
    scope: ['Vastu consultancy', 'Traditional principles', 'Modern engineering'],
    icon: Compass,
    image: imgVastu,
  },
];
