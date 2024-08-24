import './nodes/index.js';

import type { InlineEditor, InlineRootElement } from '@maxiee/block_inline';
import { html } from 'lit';
import { z } from 'zod';

import type { InlineSpecs } from '../inline-manager.js';
import type { ReferenceNodeConfig } from './nodes/reference-node/reference-config.js';

export type WorkbenchInlineEditor = InlineEditor<WorkbenchTextAttributes>;
export type WorkbenchInlineRootElement = InlineRootElement<WorkbenchTextAttributes>;

export interface WorkbenchTextAttributes {
  bold?: true | null;
  italic?: true | null;
  underline?: true | null;
  strike?: true | null;
  code?: true | null;
  link?: string | null;
  reference?: {
    type: 'Subpage' | 'LinkedPage';
    pageId: string;
  } | null;
  background?: string | null;
  color?: string | null;
}

export const workbenchInlineSpecsWithoutReference: InlineSpecs<WorkbenchTextAttributes>[] =
  [
    {
      name: 'bold',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.bold;
      },
      renderer: delta => {
        return html`<workbench-text .delta=${delta}></workbench-text>`;
      },
    },
    {
      name: 'italic',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.italic;
      },
      renderer: delta => {
        return html`<workbench-text .delta=${delta}></workbench-text>`;
      },
    },
    {
      name: 'underline',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.underline;
      },
      renderer: delta => {
        return html`<workbench-text .delta=${delta}></workbench-text>`;
      },
    },
    {
      name: 'strike',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.strike;
      },
      renderer: delta => {
        return html`<workbench-text .delta=${delta}></workbench-text>`;
      },
    },
    {
      name: 'code',
      schema: z.literal(true).optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.code;
      },
      renderer: delta => {
        return html`<workbench-text .delta=${delta}></workbench-text>`;
      },
    },
    {
      name: 'background',
      schema: z.string().optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.background;
      },
      renderer: delta => {
        return html`<workbench-text .delta=${delta}></workbench-text>`;
      },
    },
    {
      name: 'color',
      schema: z.string().optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.color;
      },
      renderer: delta => {
        return html`<workbench-text .delta=${delta}></workbench-text>`;
      },
    },
  ];

export function getWorkbenchInlineSpecsWithReference(
  referenceNodeConfig: ReferenceNodeConfig
): InlineSpecs<WorkbenchTextAttributes>[] {
  return [
    ...workbenchInlineSpecsWithoutReference,
    {
      name: 'reference',
      schema: z
        .object({
          type: z.enum([
            // @deprecated Subpage is deprecated, use LinkedPage instead
            'Subpage',
            'LinkedPage',
          ]),
          pageId: z.string(),
        })
        .optional()
        .nullable()
        .catch(undefined),
      match: delta => {
        return !!delta.attributes?.reference;
      },
      renderer: (delta, selected) => {
        return html`<workbench-reference
          .delta=${delta}
          .selected=${selected}
          .config=${referenceNodeConfig}
        ></workbench-reference>`;
      },
      embed: true,
    },
    {
      name: 'link',
      schema: z.string().optional().nullable().catch(undefined),
      match: delta => {
        return !!delta.attributes?.link;
      },
      renderer: delta => {
        return html`<workbench-link .delta=${delta}></workbench-link>`;
      },
    },
  ];
}
