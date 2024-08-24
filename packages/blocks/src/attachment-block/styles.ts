import { css } from 'lit';

import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH } from '../_common/consts.js';

export const styles = css`
  .workbench-attachment-card {
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    gap: 12px;

    width: 100%;
    height: ${EMBED_CARD_HEIGHT.horizontalThin}px;

    padding: 12px;
    border-radius: 8px;
    border: 1px solid var(--workbench-background-tertiary-color);

    opacity: var(--add, 1);
    background: var(--workbench-background-primary-color);
    user-select: none;
  }

  .workbench-attachment-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex: 1 0 0;

    border-radius: var(--1, 0px);
    opacity: var(--add, 1);
  }

  .workbench-attachment-content-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    align-self: stretch;
    padding: var(--1, 0px);
    border-radius: var(--1, 0px);
    opacity: var(--add, 1);
  }

  .workbench-attachment-content-title-icon {
    display: flex;
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
  }

  .workbench-attachment-content-title-icon svg {
    width: 16px;
    height: 16px;
    fill: var(--workbench-background-primary-color);
  }

  .workbench-attachment-content-title-text {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--workbench-text-primary-color);

    font-family: var(--workbench-font-family);
    font-size: var(--workbench-font-sm);
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
  }

  .workbench-attachment-content-info {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1 0 0;

    word-break: break-all;
    overflow: hidden;
    color: var(--workbench-text-secondary-color);
    text-overflow: ellipsis;

    font-family: var(--workbench-font-family);
    font-size: var(--workbench-font-xs);
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .workbench-attachment-banner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .workbench-attachment-banner svg {
    width: 40px;
    height: 40px;
  }

  .workbench-attachment-card.loading {
    background: var(--workbench-background-secondary-color);

    .workbench-attachment-content-title-text {
      color: var(--workbench-placeholder-color);
    }
  }

  .workbench-attachment-card.error,
  .workbench-attachment-card.unsynced {
    background: var(--workbench-background-secondary-color);
  }

  .workbench-attachment-card.cubeThick {
    width: ${EMBED_CARD_WIDTH.cubeThick}px;
    height: ${EMBED_CARD_HEIGHT.cubeThick}px;

    flex-direction: column-reverse;

    .workbench-attachment-content {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
    }

    .workbench-attachment-banner {
      justify-content: flex-start;
    }
  }

  .workbench-attachment-embed-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .workbench-attachment-iframe-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .workbench-attachment-iframe-overlay.hide {
    display: none;
  }
`;
