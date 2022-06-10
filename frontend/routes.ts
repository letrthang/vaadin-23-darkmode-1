import { Flow } from '@vaadin/flow-frontend';
import { Route } from '@vaadin/router';
import './views/main-layout';

const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: 'hello-world-hilla',
    component: 'hello-world-hilla-view',
    icon: 'la la-globe',
    title: 'Hello World Hilla',
    action: async (_context, _command) => {
      await import('./views/helloworldhilla/hello-world-hilla-view');
      return;
    },
  },
  {
    path: 'master-detail-hilla',
    component: 'master-detail-hilla-view',
    icon: 'la la-columns',
    title: 'Master Detail Hilla',
    action: async (_context, _command) => {
      await import('./views/masterdetailhilla/master-detail-hilla-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [
      ...views,
      // for server-side, the next magic line sends all unmatched routes:
      ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
    ],
  },
];
