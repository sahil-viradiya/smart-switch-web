import { SPEC } from '@/config/specs';

export interface UseCase {
  slug: string;
  title: string;
  headline: [string, string?];
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
    title: 'Family homes',
    headline: ['Switches that match', 'in every room.'],
    category: 'Homes',
    summary: 'Living rooms, bedrooms and hallways with one set of matching switches.',
    overview:
      'In many homes the switches come from different years and different ranges. Smart Switch gives every room the same plate, with a real paddle and a small status light.',
    solutions: [
      { title: 'One plate for several circuits', description: 'Put downlights, wall lights and a lamp circuit on one multi-gang plate instead of three separate switches.' },
      { title: 'A light that does not glare', description: 'The status LED is dim, so it will not light up a bedroom the way a touchscreen does.' },
      { title: 'Hallways and stairs', description: 'Multi-way switching is planned with your electrician before the plates are ordered.' },
    ],
    recommendations: [
      { label: 'Finish', value: 'Architectural White or Matte Charcoal' },
      { label: 'Plates', value: '2-gang and 3-gang' },
      { label: 'Wiring', value: 'Neutral wire in the back-box' },
      { label: 'Installer', value: 'Licensed electrician' },
    ],
    scene: 'living',
    gangs: 3,
    next: { slug: 'architectural-renovations', title: 'Renovations' },
  },
  {
    slug: 'architectural-renovations',
    title: 'Renovations',
    headline: ['Upgrade the switch,', 'keep the wall.'],
    category: 'Renovation',
    summary: 'Plates that fit older walls without enlarging the box.',
    overview:
      'Older houses often have shallow boxes, fragile plaster and strict design briefs. Smart Switch is made to fit standard gang boxes, so the wall opening does not need to change.',
    solutions: [
      { title: 'Hidden fixings', description: 'The faceplate has no visible screws, which helps cover an uneven wall opening.' },
      { title: 'Finishes that suit old details', description: 'Brushed Aluminum and Matte Charcoal sit well next to brass, bronze and timber.' },
      { title: 'Works in thick walls', description: 'Stone and masonry weaken Wi-Fi. The paddle is designed to switch locally, so the switch still does its main job.' },
    ],
    recommendations: [
      { label: 'Finish', value: 'Brushed Aluminum or Matte Charcoal' },
      { label: 'Back-box', value: `Standard gang box, ${SPEC.boxDepth} minimum depth` },
      { label: 'Before ordering', value: 'Have the wiring checked' },
      { label: 'Installer', value: 'Licensed electrician' },
    ],
    scene: 'hall',
    gangs: 2,
    next: { slug: 'commercial-studios', title: 'Studios and offices' },
  },
  {
    slug: 'commercial-studios',
    title: 'Studios and offices',
    headline: ['The same switch', 'on every floor.'],
    category: 'Studios and offices',
    summary: 'One consistent switch for studios, galleries and small offices.',
    overview:
      'A studio or office usually wants one standard across many rooms. Smart Switch gives meeting rooms, galleries and private offices the same plate and the same feel.',
    solutions: [
      { title: 'One standard for many rooms', description: 'The same plate and finish in every space keeps the interior consistent.' },
      { title: 'Check the loads first', description: `We review the lighting load on each project against the provisional rating of ${SPEC.loadPerGang} per gang.` },
      { title: 'Simple to run', description: 'Basic switching is designed to be local, so staff can use it without any set-up.' },
    ],
    recommendations: [
      { label: 'Finish', value: 'Matte Charcoal or Brushed Aluminum' },
      { label: 'Load check', value: `${SPEC.loadPerGang} per gang (provisional)` },
      { label: 'Project size', value: 'Send your switch schedule for a review' },
      { label: 'Installer', value: 'Licensed electrician' },
    ],
    scene: 'studio',
    gangs: 2,
    next: { slug: 'residential-homes', title: 'Family homes' },
  },
];

export const getUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);
