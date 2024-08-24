import { css } from 'lit';

import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH } from '../_common/consts.js';

export const styles = css`
  .workbench-bookmark-card {
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    min-width: 450px;
    height: ${EMBED_CARD_HEIGHT.horizontal}px;

    border-radius: 8px;
    border: 1px solid var(--workbench-background-tertiary-color);

    opacity: var(--add, 1);
    background: var(--workbench-background-primary-color);
    user-select: none;
  }

  .workbench-bookmark-content {
    width: calc(100% - 204px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-self: stretch;
    gap: 4px;
    padding: 12px;
    border-radius: var(--1, 0px);
    opacity: var(--add, 1);
  }

  .workbench-bookmark-content-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    align-self: stretch;
    padding: var(--1, 0px);
    border-radius: var(--1, 0px);
    opacity: var(--add, 1);
  }

  .workbench-bookmark-content-title-icon {
    display: flex;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
  }

  .workbench-bookmark-content-title-icon img,
  .workbench-bookmark-content-title-icon object,
  .workbench-bookmark-content-title-icon svg {
    width: 16px;
    height: 16px;
    fill: var(--workbench-background-primary-color);
  }

  .workbench-bookmark-content-title-text {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--workbench-text-primary-color);

    font-family: var(--workbench-font-family);
    font-size: var(--workbench-font-sm);
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
  }

  .workbench-bookmark-content-description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    flex-grow: 1;

    white-space: normal;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--workbench-text-primary-color);

    font-family: var(--workbench-font-family);
    font-size: var(--workbench-font-xs);
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .workbench-bookmark-content-url {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: max-content;
    max-width: 100%;
    cursor: pointer;
  }

  .workbench-bookmark-content-url > span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    word-break: break-all;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--workbench-text-secondary-color);

    font-family: var(--workbench-font-family);
    font-size: var(--workbench-font-xs);
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
  .workbench-bookmark-content-url:hover > span {
    color: var(--workbench-link-color);
  }
  .workbench-bookmark-content-url:hover .open-icon {
    fill: var(--workbench-link-color);
  }

  .workbench-bookmark-content-url-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 20px;
  }
  .workbench-bookmark-content-url-icon .open-icon {
    height: 12px;
    width: 12px;
    fill: var(--workbench-text-secondary-color);
  }

  .workbench-bookmark-banner {
    margin: 12px 12px 0px 0px;
    width: 204px;
    max-width: 100%;
    height: 102px;
    opacity: var(--add, 1);
  }

  .workbench-bookmark-banner img,
  .workbench-bookmark-banner object,
  .workbench-bookmark-banner svg {
    width: 204px;
    max-width: 100%;
    height: 102px;
    object-fit: cover;
    border-radius: 4px 4px var(--1, 0px) var(--1, 0px);
  }

  .workbench-bookmark-card.loading {
    .workbench-bookmark-content-title-text {
      color: var(--workbench-placeholder-color);
    }
  }

  .workbench-bookmark-card.error {
    .workbench-bookmark-content-description {
      color: var(--workbench-placeholder-color);
    }
  }

  .workbench-bookmark-card.selected {
    .workbench-bookmark-content-url > span {
      color: var(--workbench-link-color);
    }
    .workbench-bookmark-content-url .open-icon {
      fill: var(--workbench-link-color);
    }
  }

  .workbench-bookmark-card.list {
    height: ${EMBED_CARD_HEIGHT.list}px;

    .workbench-bookmark-content {
      width: 100%;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .workbench-bookmark-content-title {
      width: calc(100% - 204px);
    }

    .workbench-bookmark-content-url {
      width: 204px;
      justify-content: flex-end;
    }

    .workbench-bookmark-content-description {
      display: none;
    }

    .workbench-bookmark-banner {
      display: none;
    }
  }

  .workbench-bookmark-card.vertical {
    width: ${EMBED_CARD_WIDTH.vertical}px;
    height: ${EMBED_CARD_HEIGHT.vertical}px;
    flex-direction: column-reverse;

    .workbench-bookmark-content {
      width: 100%;
    }

    .workbench-bookmark-content-description {
      -webkit-line-clamp: 6;
      max-height: 120px;
    }

    .workbench-bookmark-content-url {
      flex-grow: 1;
      align-items: flex-end;
    }

    .workbench-bookmark-banner {
      width: 340px;
      height: 170px;
      margin-left: 12px;
    }

    .workbench-bookmark-banner img,
    .workbench-bookmark-banner object,
    .workbench-bookmark-banner svg {
      width: 340px;
      height: 170px;
    }
  }

  .workbench-bookmark-card.cube {
    width: ${EMBED_CARD_WIDTH.cube}px;
    height: ${EMBED_CARD_HEIGHT.cube}px;

    .workbench-bookmark-content {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }

    .workbench-bookmark-content-title {
      flex-direction: column;
      gap: 4px;
      align-items: flex-start;
    }

    .workbench-bookmark-content-title-text {
      -webkit-line-clamp: 2;
    }

    .workbench-bookmark-content-description {
      display: none;
    }

    .workbench-bookmark-banner {
      display: none;
    }
  }
`;
