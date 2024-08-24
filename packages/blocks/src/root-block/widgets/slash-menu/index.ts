import type { UIEventStateContext } from '@maxiee/block-std';
import { WidgetElement } from '@maxiee/block-std';
import {
  assertExists,
  debounce,
  DisposableGroup,
  throttle,
} from '@maxiee/block_global/utils';
import { customElement } from 'lit/decorators.js';

import {
  getCurrentNativeRange,
  getInlineEditorByModel,
  isControlledKeyboardEvent,
  matchFlavours,
} from '../../../_common/utils/index.js';
import { isRootElement } from '../../utils/guard.js';
import { getPopperPosition } from '../../utils/position.js';
import {
  defaultSlashMenuConfig,
  type SlashMenuActionItem,
  type SlashMenuContext,
  type SlashMenuGroupDivider,
  type SlashMenuItem,
  type SlashMenuItemGenerator,
  type SlashMenuStaticConfig,
  type SlashSubMenu,
} from './config.js';
import { SlashMenu } from './slash-menu-popover.js';
import { filterEnabledSlashMenuItems } from './utils.js';

export type WorkbenchSlashMenuContext = SlashMenuContext;
export type WorkbenchSlashMenuItem = SlashMenuItem;
export type WorkbenchSlashMenuActionItem = SlashMenuActionItem;
export type WorkbenchSlashMenuItemGenerator = SlashMenuItemGenerator;
export type WorkbenchSlashSubMenu = SlashSubMenu;
export type WorkbenchSlashMenuGroupDivider = SlashMenuGroupDivider;

let globalAbortController = new AbortController();

function closeSlashMenu() {
  globalAbortController.abort();
}

const showSlashMenu = debounce(
  ({
    context,
    range,
    container = document.body,
    abortController = new AbortController(),
    config,
    triggerKey,
  }: {
    context: SlashMenuContext;
    range: Range;
    container?: HTMLElement;
    abortController?: AbortController;
    config: SlashMenuStaticConfig;
    triggerKey: string;
  }) => {
    globalAbortController = abortController;
    const disposables = new DisposableGroup();
    abortController.signal.addEventListener('abort', () =>
      disposables.dispose()
    );

    const slashMenu = new SlashMenu();
    disposables.add(() => slashMenu.remove());
    slashMenu.context = context;
    slashMenu.abortController = abortController;
    slashMenu.config = config;
    slashMenu.triggerKey = triggerKey;

    // Handle position
    const updatePosition = throttle(() => {
      const slashMenuElement = slashMenu.slashMenuElement;
      assertExists(
        slashMenuElement,
        'You should render the slash menu node even if no position'
      );
      const position = getPopperPosition(slashMenuElement, range);
      slashMenu.updatePosition(position);
    }, 10);

    disposables.addFromEvent(window, 'resize', updatePosition);

    // FIXME(Flrande): It is not a best practice,
    // but merely a temporary measure for reusing previous components.
    // Mount
    container.append(slashMenu);
    // Wait for the Node to be mounted
    setTimeout(updatePosition);
    return slashMenu;
  },
  100
);

export const WORKBENCH_SLASH_MENU_WIDGET = 'workbench-slash-menu-widget';

@customElement(WORKBENCH_SLASH_MENU_WIDGET)
export class WorkbenchSlashMenuWidget extends WidgetElement {
  static DEFAULT_CONFIG = defaultSlashMenuConfig;

  config = WorkbenchSlashMenuWidget.DEFAULT_CONFIG;

  private _getTriggerKey = (event: KeyboardEvent) => {
    if (isControlledKeyboardEvent(event) || event.shiftKey) return undefined;

    const { triggerKeys } = this.config;

    /** The case of IME input
     * 1. under IME mode
     * 2. Before IME start input
     * 3. press a key
     * 4. the pressed key in `triggerKeys`
     */
    let currTriggerKey: string | undefined;

    if (
      event.key === 'Process' &&
      !event.isComposing &&
      event.code === 'Slash' && // TODO may be not slash
      triggerKeys.includes('/')
    ) {
      currTriggerKey = '/';
    }
    // The normal case
    else {
      currTriggerKey = triggerKeys.find(key => key === event.key);
    }

    return currTriggerKey;
  };

  private _onKeyDown = (ctx: UIEventStateContext) => {
    const eventState = ctx.get('keyboardState');
    const event = eventState.raw;

    const triggerKey = this._getTriggerKey(event);
    if (!triggerKey) return;

    const textSelection = this.host.selection.find('text');
    if (!textSelection) return;

    const block = this.host.doc.getBlock(textSelection.blockId);
    assertExists(block);

    const { model } = block;

    if (matchFlavours(model, this.config.ignoreBlockTypes)) return;

    const inlineEditor = getInlineEditorByModel(this.host, model);
    if (!inlineEditor) return;

    inlineEditor.slots.inlineRangeApply.once(() => {
      const rootElement = this.blockElement;
      if (!isRootElement(rootElement)) {
        throw new Error('SlashMenuWidget should be used in RootBlock');
      }

      const config: SlashMenuStaticConfig = {
        ...this.config,
        items: filterEnabledSlashMenuItems(this.config.items, {
          model,
          rootElement,
        }),
      };

      // Wait for dom update
      requestAnimationFrame(() => {
        const curRange = getCurrentNativeRange();
        if (!curRange) return;

        closeSlashMenu();
        showSlashMenu({
          context: { model, rootElement },
          range: curRange,
          triggerKey,
          config,
        });
      });
    });
  };

  override connectedCallback() {
    super.connectedCallback();

    if (this.config.triggerKeys.some(key => key.length === 0)) {
      throw new Error('Trigger key of slash menu should not be empty string');
    }

    this.handleEvent('keyDown', this._onKeyDown);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [WORKBENCH_SLASH_MENU_WIDGET]: WorkbenchSlashMenuWidget;
  }
}
