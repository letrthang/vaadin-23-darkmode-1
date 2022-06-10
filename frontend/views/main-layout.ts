import '@vaadin/app-layout';
import { AppLayout } from '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/avatar/vaadin-avatar';
import '@vaadin/context-menu';
import '@vaadin/tabs';
import '@vaadin/tabs/vaadin-tab';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { router } from '../index';
import { appStore } from '../stores/app-store';
import { Layout } from './view';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

@customElement('main-layout')
export class MainLayout extends Layout {
  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <header class="view-header" slot="navbar">
          <vaadin-drawer-toggle aria-label="Menu toggle" class="view-toggle" theme="contrast"></vaadin-drawer-toggle>
          <h1 class="view-title">${appStore.currentViewTitle}</h1>
        </header>
        <section class="drawer-section" slot="drawer">
          <h2 class="app-name">${appStore.applicationName}</h2>
          <nav aria-labelledby="views-title" class="menu-item-container">
            <ul class="navigation-list">
              ${this.getMenuRoutes().map(
                (viewRoute) => html`
                  <li>
                    <a
                      ?highlight=${viewRoute.path == appStore.location}
                      class="menu-item-link"
                      href=${router.urlForPath(viewRoute.path)}
                    >
                      <span class="${viewRoute.icon} menu-item-icon"></span>
                      <span class="menu-item-text">${viewRoute.title}</span>
                    </a>
                  </li>
                `
              )}
            </ul>
          </nav>
          <footer class="footer"></footer>
        </section>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('block', 'h-full');
    this.reaction(
      () => appStore.location,
      () => {
        AppLayout.dispatchCloseOverlayDrawerEvent();
      }
    );
  }

  private getMenuRoutes(): RouteInfo[] {
    return [
      {
        path: 'hello-world-java',
        title: 'Hello World Java',
        icon: 'la la-globe',
      },

      {
        path: 'master-detail-java',
        title: 'Master Detail Java',
        icon: 'la la-columns',
      },

      {
        path: 'master-detail-designer',
        title: 'Master Detail Designer',
        icon: 'la la-columns',
      },

      {
        path: 'hello-world-designer',
        title: 'Hello World Designer',
        icon: 'la la-globe',
      },

      {
        path: 'hello-world-hilla',
        title: 'Hello World Hilla',
        icon: 'la la-globe',
      },

      {
        path: 'master-detail-hilla',
        title: 'Master Detail Hilla',
        icon: 'la la-columns',
      },

      {
        path: 'collaborative-master-detail-java',
        title: 'Collaborative Master Detail Java',
        icon: 'la la-columns',
      },
    ];
  }
}
