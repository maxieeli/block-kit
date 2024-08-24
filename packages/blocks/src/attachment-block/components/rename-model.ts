import type { EditorHost } from '@maxiee/block-std';
import { html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

import { toast } from '../../_common/components/toast.js';
import { ConfirmIcon } from '../../_common/icons/index.js';
import type { AttachmentBlockModel } from '../attachment-model.js';
import { renameStyles } from './styles.js';

export const RenameModal = ({
  editorHost,
  model,
  abortController,
}: {
  editorHost: EditorHost;
  model: AttachmentBlockModel;
  abortController: AbortController;
}) => {
  const inputRef = createRef<HTMLInputElement>();
  // Fix auto focus
  setTimeout(() => inputRef.value?.focus());
  const originalName = model.name;
  const nameWithoutExtension = originalName.slice(
    0,
    originalName.lastIndexOf('.')
  );
  const originalExtension = originalName.slice(originalName.lastIndexOf('.'));
  const includeExtension =
    originalExtension.includes('.') &&
    originalExtension.length <= 7 &&
    // including the dot
    originalName.length > originalExtension.length;

  let fileName = includeExtension ? nameWithoutExtension : originalName;
  const extension = includeExtension ? originalExtension : '';

  const onConfirm = () => {
    const newFileName = fileName + extension;
    if (!newFileName) {
      toast(editorHost, 'File name cannot be empty');
      return;
    }
    model.doc.updateBlock(model, {
      name: newFileName,
    });
    abortController.abort();
  };
  const onInput = (e: InputEvent) => {
    fileName = (e.target as HTMLInputElement).value;
  };
  const onKeydown = (e: KeyboardEvent) => {
    e.stopPropagation();

    if (e.key === 'Escape' && !e.isComposing) {
      abortController.abort();
      return;
    }
    if (e.key === 'Enter' && !e.isComposing) {
      onConfirm();
      return;
    }
  };

  return html`
    <style>
      ${renameStyles}
    </style>
    <div
      class="workbench-attachment-rename-overlay-mask"
      @click="${() => abortController.abort()}"
    ></div>
    <div class="workbench-attachment-rename-container">
      <div class="workbench-attachment-rename-input-wrapper">
        <input
          ${ref(inputRef)}
          type="text"
          .value=${fileName}
          @input=${onInput}
          @keydown=${onKeydown}
        />
        <span class="workbench-attachment-rename-extension">${extension}</span>
      </div>
      <icon-button class="workbench-confirm-button" @click=${onConfirm}
        >${ConfirmIcon}</icon-button
      >
    </div>
  `;
};