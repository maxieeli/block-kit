/// <reference types="vite/client" />
import { BlockElement } from '@maxiee/block-std';
import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { KeymapController } from './keymap-controller.js';
import type { NoteBlockModel } from './note-model.js';
import type { NoteBlockService } from './note-service.js';

@customElement('workbench-note')
export class NoteBlockComponent extends BlockElement<
  NoteBlockModel,
  NoteBlockService
> {
  static override styles = css`
    .workbench-note-block-container {
      display: flow-root;
    }
    .workbench-note-block-container.selected {
      background-color: var(--workbench-hover-color);
    }
  `;

  keymapController = new KeymapController(this);

  override connectedCallback() {
    super.connectedCallback();

    this.keymapController.bind();
  }

  override renderBlock() {
    return html`
      <div class="workbench-note-block-container">
        <div class="workbench-block-children-container">
          ${this.renderChildren(this.model)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-note': NoteBlockComponent;
  }
}
