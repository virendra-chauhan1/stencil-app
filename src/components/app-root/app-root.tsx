import { Component, Host, h } from '@stencil/core';
import { defineCustomElements as stencilCheckboxComponent } from "@storage/stencil-checkbox/dist/loader";
import { defineCustomElements as stencilModalComponent } from "@storage/stencil-modal/dist/loader";
import { defineCustomElements as stencilAnchorComponent } from "@storage/stencil-anchor/dist/loader";

stencilCheckboxComponent(window, {
  transformTagName: (tagName) => `app-${tagName}`,
} as any);

stencilModalComponent(window, {
  transformTagName: (tagName) => `app-${tagName}`,
} as any);

stencilAnchorComponent(window, {
  transformTagName: (tagName) => `app-${tagName}`,
} as any);

@Component({
  tag: 'app-root',
  shadow: true,
})
export class AppRoot {
  render() {
    const showModal = true;

    return (
      <Host>
        <h1> This is App Root Page </h1>
        <h2> This is stencil app running... successfully... </h2>
        {/* Checkbox */}
        <app-stencil-checkbox />

        <br />

        <app-stencil-anchor  />

        {/* Modal */}
        <button
          class="primary small sc-stencil-button sc-stencil-button-s"
          onClick={() => { }}
        >
          Info Modal
        </button>
        <app-stencil-modal-container
          type="info"
          open={showModal}
        >
          <app-stencil-modal-header
            slot="header"
            header-title="Info modal"
            show-close="true"
            icon-type="info"
          />
          <app-stencil-modal-content slot="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </app-stencil-modal-content>
          <app-stencil-modal-footer slot="footer" primary-label="Ok" dataTestId='footer-id' />
        </app-stencil-modal-container>
      </Host>
    );
  }
}
