import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Csp parser',
  path: '/csp-parser',
  description: '',
  keywords: ['csp', 'parser'],
  component: () => import('./csp-parser.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2025-06-12'),
});