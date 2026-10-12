import { SPEC } from '@/config/specs';
export interface UseCase {
  slug: string;
  title: string;
  headline: [string, string];
  category: string;
  summary: string;
  overview: string;
  solutions: { title: string; description: string }[];
  recommendations: { label: string; value: string }[];
  scene: 'living' | 'hall' | 'studio';
  gangs: 1 | 2 | 3;
  next: { slug: string; title: string };
}

export const USE_CASES: readonly UseCase[] = [
  {
    slug: 'residential-homes',
    title: 'Modern Residential Living',
    headline: ['Calm walls.', 'Lived-in rooms.'],
    category: 'Residential',
    summary: 'Living rooms, bedrooms and hallways with a single, quiet language of switches.',
    overview:
      'Contemporary homes depend on clean sightlines. Smart Switch replaces a mismatched bank of toggles with one flush plate that feels tactile and stays visually calm.',
    solutions: [
      { title: 'Consolidated hallway consoles', description: 'Bring several lighting circuits onto one multi-gang plate for a tidy, aligned wall.' },
      { title: 'Bedroom-friendly indication', description: 'A soft micro-illumination LED confirms state without the glare of a touchscreen.' },
      { title: 'Corridor and stair control', description: 'Multi-way arrangements are planned with your electrician at the design stage.' },
    ],
    recommendations: [
      { label: 'Suggested finish', value: 'Architectural White or Matte Charcoal' },
      { label: 'Suggested gangs', value: '2-gang and 3-gang' },
      { label: 'Wiring', value: 'Neutral wire in the back-box' },
      { label: 'Installer', value: 'Licensed electrician' },
    ],
    scene: 'living',
    gangs: 3,
    next: { slug: 'architectural-renovations', title: 'Architectural Renovations' },
  },
  {
    slug: 'architectural-renovations',
    title: 'Architectural Renovations',
    headline: ['Respect the wall.', 'Upgrade the control.'],
    category: 'Renovation & heritage',
    summary: 'Retrofit-minded plates that sit quietly in refined and period interiors.',
    overview:
      'Renovations come with shallow boxes, delicate plaster and strict aesthetic briefs. Smart Switch is designed to fit standard gang boxes without enlarging the wall opening.',
    solutions: [
      { title: 'Concealed fixings', description: 'A clean faceplate with no visible hardware is the design intent for uneven openings.' },
      { title: 'Finishes that sit well', description: 'Brushed Aluminum and Matte Charcoal complement brass, bronze and timber detailing.' },
      { title: 'Independent of the signal', description: 'Thick masonry can weaken Wi-Fi. A local-first design keeps the wall switch useful regardless.' },
    ],
    recommendations: [
      { label: 'Suggested finish', value: 'Brushed Aluminum or Matte Charcoal' },
      { label: 'Back-box', value: `Standard gang box, ${SPEC.boxDepth} minimum depth` },
      { label: 'Survey', value: 'Wiring audit before ordering' },
      { label: 'Installer', value: 'Licensed electrician' },
    ],
    scene: 'hall',
    gangs: 2,
    next: { slug: 'commercial-studios', title: 'Commercial Studios' },
  },
  {
    slug: 'commercial-studios',
    title: 'Commercial Studios',
    headline: ['Consistent control.', 'Everywhere.'],
    category: 'Studios & boutique offices',
    summary: 'A uniform, durable switching experience for studios, galleries and executive suites.',
    overview:
      'Commercial spaces want one visual and tactile standard across many rooms. Smart Switch gives studios and offices the same quiet plate in every space.',
    solutions: [
      { title: 'One standard, many rooms', description: 'Identical look and feel from meeting rooms to galleries keeps the interior coherent.' },
      { title: 'Planned for lighting loads', description: 'Load suitability is reviewed per project against the provisional per-gang rating.' },
      { title: 'Simple ownership', description: 'Core switching is designed to be local, so day-to-day use stays simple for facilities teams.' },
    ],
    recommendations: [
      { label: 'Suggested finish', value: 'Matte Charcoal or Brushed Aluminum' },
      { label: 'Load review', value: `${SPEC.loadPerGang} per gang (provisional)` },
      { label: 'Project scale', value: 'Share your schedule for a tailored review' },
      { label: 'Installer', value: 'Licensed electrician' },
    ],
    scene: 'studio',
    gangs: 2,
    next: { slug: 'residential-homes', title: 'Modern Residential Living' },
  },
];

export const getUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);
