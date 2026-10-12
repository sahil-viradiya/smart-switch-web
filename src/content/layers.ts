export interface Layer { id: string; name: string; text: string }

/** A simple illustration of how a panel is put together, front to back. Not an engineering drawing. */
export const LAYERS: readonly Layer[] = [
  { id: 'panel', name: 'Glass or acrylic panel', text: 'The front you touch, with a slim border around it.' },
  { id: 'touch', name: 'Touch and light layer', text: 'Senses your touch and lights each icon or touch point.' },
  { id: 'module', name: 'Control module', text: 'Switches the load and connects the panel over Wi-Fi or Zigbee.' },
  { id: 'frame', name: 'Mounting frame and wall box', text: 'Fixes the panel into the wall box.' },
];
