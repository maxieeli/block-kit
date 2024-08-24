import { css, html } from 'lit';

import { EMBED_CARD_HEIGHT } from '../_common/consts.js';

export const styles = css`
  .workbench-embed-youtube-block {
    margin: 0 auto;
    box-sizing: border-box;
    width: 100%;
    height: ${EMBED_CARD_HEIGHT.video}px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 12px;

    border-radius: 8px;
    border: 1px solid var(--workbench-background-tertiary-color);

    opacity: var(--add, 1);
    background: var(--workbench-background-primary-color);
    user-select: none;
  }

  .workbench-embed-youtube-video {
    width: 100%;
    height: 100%;
    opacity: var(--add, 1);
  }

  .workbench-embed-youtube-video img,
  .workbench-embed-youtube-video object,
  .workbench-embed-youtube-video svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px 4px var(--1, 0px) var(--1, 0px);
  }

  .workbench-embed-youtube-video-iframe-container {
    position: relative;
  }

  .workbench-embed-youtube-video-iframe-container > iframe {
    width: 100%;
    height: 410px;
    border-radius: 4px 4px var(--1, 0px) var(--1, 0px);
  }

  .workbench-embed-youtube-video-iframe-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .workbench-embed-youtube-video-iframe-overlay.hide {
    display: none;
  }

  .workbench-embed-youtube-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: var(--1, 0px);
    opacity: var(--add, 1);
  }

  .workbench-embed-youtube-content-header {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;

    align-self: stretch;
    padding: var(--1, 0px);
    border-radius: var(--1, 0px);
    opacity: var(--add, 1);
  }

  .workbench-embed-youtube-content-title-icon {
    display: flex;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
  }

  .workbench-embed-youtube-content-title-icon img,
  .workbench-embed-youtube-content-title-icon object,
  .workbench-embed-youtube-content-title-icon svg {
    width: 20px;
    height: 20px;
    fill: var(--workbench-background-primary-color);
  }

  .workbench-embed-youtube-content-title-text {
    flex: 1 0 0;

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

  .workbench-embed-youtube-content-creator-image {
    display: flex;
    width: 16px;
    height: 16px;
    flex-direction: column;
    align-items: flex-start;
  }

  .workbench-embed-youtube-content-creator-image img,
  .workbench-embed-youtube-content-creator-image object,
  .workbench-embed-youtube-content-creator-image svg {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    fill: var(--workbench-background-primary-color);
  }

  .workbench-embed-youtube-content-creator-text {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    color: var(--workbench-text-primary-color);
    text-align: justify;
    font-family: var(--workbench-font-family);
    font-size: var(--workbench-font-xs);
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .workbench-embed-youtube-content-description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    flex: 1 0 0;
    align-self: stretch;

    word-break: break-word;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--workbench-text-primary-color);

    font-family: var(--workbench-font-family);
    font-size: var(--workbench-font-xs);
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  .workbench-embed-youtube-content-url {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: max-content;
    max-width: 100%;
    cursor: pointer;
  }
  .workbench-embed-youtube-content-url > span {
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
  .workbench-embed-youtube-content-url:hover > span {
    color: var(--workbench-link-color);
  }
  .workbench-embed-youtube-content-url:hover .open-icon {
    fill: var(--workbench-link-color);
  }

  .workbench-embed-youtube-content-url-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
  }
  .workbench-embed-youtube-content-url-icon .open-icon {
    height: 12px;
    width: 12px;
    fill: var(--workbench-text-secondary-color);
  }

  .workbench-embed-youtube-block.loading {
    .workbench-embed-youtube-content-title-text {
      color: var(--workbench-placeholder-color);
    }
  }

  .workbench-embed-youtube-block.selected {
    .workbench-embed-youtube-content-url > span {
      color: var(--workbench-link-color);
    }
    .workbench-embed-youtube-content-url .open-icon {
      fill: var(--workbench-link-color);
    }
  }
`;

export const YoutubeIcon = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M17.5672 5.99344C17.4763 5.64032 17.2992 5.3184 17.0533 5.05972C16.8075 4.80104 16.5015 4.61464 16.1659 4.51907C14.9372 4.1665 9.99202 4.1665 9.99202 4.1665C9.99202 4.1665 5.04662 4.17718 3.81791 4.52974C3.48228 4.62532 3.1763 4.81173 2.93045 5.07042C2.6846 5.32911 2.50744 5.65105 2.41664 6.00417C2.04498 8.30113 1.90081 11.8012 2.42684 14.0062C2.51766 14.3594 2.69482 14.6813 2.94067 14.94C3.18652 15.1986 3.49249 15.385 3.82811 15.4806C5.05683 15.8332 10.0021 15.8332 10.0021 15.8332C10.0021 15.8332 14.9473 15.8332 16.176 15.4806C16.5116 15.385 16.8176 15.1986 17.0635 14.94C17.3093 14.6813 17.4865 14.3594 17.5773 14.0062C17.9693 11.706 18.0901 8.20821 17.5672 5.9935V5.99344Z"
    fill="#FF0000"
  />
  <path d="M8.33325 12.5L12.4999 10L8.33325 7.5V12.5Z" fill="white" />
</svg>`;
