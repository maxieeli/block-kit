import type { Doc } from '@maxiee/block_store';
import type { TemplateResult } from 'lit';

import type { WorkbenchReference } from './reference-node.js';

export class ReferenceNodeConfig {
  private _customIcon: ((reference: WorkbenchReference) => TemplateResult) | null =
    null;

  private _customTitle: ((reference: WorkbenchReference) => string) | null = null;

  private _customContent:
    | ((reference: WorkbenchReference) => TemplateResult)
    | null = null;

  private _Doc: Doc | null = null;

  private _interactable = true;

  get customIcon() {
    return this._customIcon;
  }

  get customTitle() {
    return this._customTitle;
  }

  get doc() {
    return this._Doc;
  }

  get customContent() {
    return this._customContent;
  }

  get interactable() {
    return this._interactable;
  }

  setInteractable(interactable: boolean) {
    this._interactable = interactable;
  }

  setCustomContent(content: ReferenceNodeConfig['_customContent']) {
    this._customContent = content;
  }

  setCustomIcon(icon: ReferenceNodeConfig['_customIcon']) {
    this._customIcon = icon;
  }

  setCustomTitle(title: ReferenceNodeConfig['_customTitle']) {
    this._customTitle = title;
  }

  setDoc(doc: Doc | null) {
    this._Doc = doc;
  }
}
