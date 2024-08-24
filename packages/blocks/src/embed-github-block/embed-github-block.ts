import { assertExists } from '@maxiee/block_global/utils';
import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH } from '../_common/consts.js';
import { EmbedBlockElement } from '../_common/embed-block-helper/embed-block-element.js';
import { OpenIcon } from '../_common/icons/text.js';
import { getEmbedCardIcons } from '../_common/utils/url.js';
import type { EmbedGithubStyles } from './embed-github-model.js';
import { type EmbedGithubModel, githubUrlRegex } from './embed-github-model.js';
import type { EmbedGithubBlockService } from './embed-github-service.js';
import { GithubIcon, styles } from './styles.js';
import {
  getGithubStatusIcon,
  refreshEmbedGithubStatus,
  refreshEmbedGithubUrlData,
} from './utils.js';

@customElement('workbench-embed-github-block')
export class EmbedGithubBlockComponent extends EmbedBlockElement<
  EmbedGithubModel,
  EmbedGithubBlockService
> {
  static override styles = styles;

  @state()
  private accessor _isSelected = false;

  override _cardStyle: (typeof EmbedGithubStyles)[number] = 'horizontal';

  @property({ attribute: false })
  accessor loading = false;

  private _selectBlock() {
    const selectionManager = this.host.selection;
    const blockSelection = selectionManager.create('block', {
      blockId: this.blockId,
    });
    selectionManager.setGroup('note', [blockSelection]);
  }

  private _handleClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.isInSurface) {
      this._selectBlock();
    }
  }

  private _handleDoubleClick(event: MouseEvent) {
    event.stopPropagation();
    this.open();
  }

  private _handleAssigneeClick(assignee: string) {
    const link = `https://www.github.com/${assignee}`;
    window.open(link, '_blank');
  }

  open = () => {
    let link = this.model.url;
    if (!link.match(/^[a-zA-Z]+:\/\//)) {
      link = 'https://' + link;
    }
    window.open(link, '_blank');
  };

  refreshData = () => {
    refreshEmbedGithubUrlData(this, this.fetchAbortController.signal).catch(
      console.error
    );
  };

  refreshStatus = () => {
    refreshEmbedGithubStatus(this, this.fetchAbortController.signal).catch(
      console.error
    );
  };

  override connectedCallback() {
    super.connectedCallback();

    if (!this.model.owner || !this.model.repo || !this.model.githubId) {
      this.doc.withoutTransact(() => {
        const url = this.model.url;
        const urlMatch = url.match(githubUrlRegex);
        if (urlMatch) {
          const [, owner, repo, githubType, githubId] = urlMatch;
          this.doc.updateBlock(this.model, {
            owner,
            repo,
            githubType: githubType === 'issue' ? 'issue' : 'pr',
            githubId,
          });
        }
      });
    }

    this.doc.withoutTransact(() => {
      if (!this.model.description && !this.model.title) {
        this.refreshData();
      } else {
        this.refreshStatus();
      }
    });

    this.disposables.add(
      this.model.propsUpdated.on(({ key }) => {
        if (key === 'url') {
          this.refreshData();
        }
      })
    );

    this.disposables.add(
      this.selection.slots.changed.on(() => {
        this._isSelected =
          !!this.selected?.is('block') || !!this.selected?.is('surface');
      })
    );

    if (this.isInSurface) {
      const surface = this.surface;
      assertExists(surface);
      this.disposables.add(
        this.model.propsUpdated.on(() => {
          this.requestUpdate();
        })
      );
    }
  }

  override renderBlock() {
    const {
      title = 'GitHub',
      githubType,
      status,
      statusReason,
      owner,
      repo,
      createdAt,
      assignees,
      description,
      image,
      style,
    } = this.model;

    this._cardStyle = style;
    this._width = EMBED_CARD_WIDTH[this._cardStyle];
    this._height = EMBED_CARD_HEIGHT[this._cardStyle];

    const loading = this.loading;
    const { LoadingIcon, EmbedCardBannerIcon } = getEmbedCardIcons();
    const titleIcon = loading ? LoadingIcon : GithubIcon;
    const statusIcon = status
      ? getGithubStatusIcon(githubType, status, statusReason)
      : nothing;
    const statusText = loading ? '' : status;
    const titleText = loading ? 'Loading...' : title;
    const descriptionText = loading ? '' : description;
    const bannerImage =
      !loading && image
        ? html`<object type="image/webp" data=${image} draggable="false">
            ${EmbedCardBannerIcon}
          </object>`
        : EmbedCardBannerIcon;

    let dateText = '';
    if (createdAt) {
      const date = new Date(createdAt);
      dateText = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const day = date.getDate();
      const suffix =
        ['th', 'st', 'nd', 'rd'][((day / 10) | 0) !== 1 ? day % 10 : 4] || 'th';
      dateText = dateText.replace(/\d+/, `${day}${suffix}`);
    }

    return this.renderEmbed(
      () => html`
        <div
          style=${styleMap({
            position: 'relative',
          })}
        >
          <div
            class=${classMap({
              'workbench-embed-github-block': true,
              loading,
              [style]: true,
              selected: this._isSelected,
            })}
            @click=${this._handleClick}
            @dblclick=${this._handleDoubleClick}
          >
            <div class="workbench-embed-github-content">
              <div class="workbench-embed-github-content-title">
                <div class="workbench-embed-github-content-title-icons">
                  <div class="workbench-embed-github-content-title-site-icon">
                    ${titleIcon}
                  </div>

                  ${status && statusText
                    ? html`<div
                        class=${classMap({
                          'workbench-embed-github-content-title-status-icon': true,
                          [githubType]: true,
                          [status]: true,
                          success: statusReason === 'completed',
                          failure: statusReason === 'not_planned',
                        })}
                      >
                        ${statusIcon}

                        <span>${statusText}</span>
                      </div>`
                    : nothing}
                </div>

                <div class="workbench-embed-github-content-title-text">
                  ${titleText}
                </div>
              </div>

              <div class="workbench-embed-github-content-description">
                ${descriptionText}
              </div>

              ${githubType === 'issue' && assignees
                ? html`
                    <div class="workbench-embed-github-content-assignees">
                      <div
                        class="workbench-embed-github-content-assignees-text label"
                      >
                        Assignees
                      </div>

                      <div
                        class="workbench-embed-github-content-assignees-text users"
                      >
                        ${assignees.length === 0
                          ? html`<span
                              class="workbench-embed-github-content-assignees-text-users placeholder"
                              >No one</span
                            >`
                          : repeat(
                              assignees,
                              assignee => assignee,
                              (assignee, index) =>
                                html`<span
                                    class="workbench-embed-github-content-assignees-text-users user"
                                    @click=${() =>
                                      this._handleAssigneeClick(assignee)}
                                    >${`@${assignee}`}</span
                                  >
                                  ${index === assignees.length - 1 ? '' : `, `}`
                            )}
                      </div>
                    </div>
                  `
                : nothing}

              <div class="workbench-embed-github-content-url" @click=${this.open}>
                <span class="workbench-embed-github-content-repo"
                  >${`${owner}/${repo} |`}</span
                >

                ${createdAt
                  ? html`<span class="workbench-embed-github-content-date"
                      >${dateText} |</span
                    >`
                  : nothing}
                <span>github.com</span>

                <div class="workbench-embed-github-content-url-icon">
                  ${OpenIcon}
                </div>
              </div>
            </div>

            <div class="workbench-embed-github-banner">${bannerImage}</div>
          </div>
        </div>
      `
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'workbench-embed-github-block': EmbedGithubBlockComponent;
  }
}