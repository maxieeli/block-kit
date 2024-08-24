import type {
  FromSnapshotPayload,
  SnapshotReturn,
  ToSnapshotPayload,
} from '@maxiee/block_store';
import { BaseBlockTransformer } from '@maxiee/block_store';

import type { AttachmentBlockProps } from './attachment-model.js';

export class AttachmentBlockTransformer extends BaseBlockTransformer<AttachmentBlockProps> {
  override async toSnapshot(payload: ToSnapshotPayload<AttachmentBlockProps>) {
    const snapshot = super.toSnapshot(payload);
    const sourceId = payload.model.sourceId;
    if (sourceId) await payload.assets.readFromBlob(sourceId);

    return snapshot;
  }

  override async fromSnapshot(
    payload: FromSnapshotPayload
  ): Promise<SnapshotReturn<AttachmentBlockProps>> {
    const snapshotRet = await super.fromSnapshot(payload);
    const sourceId = snapshotRet.props.sourceId;
    if (!payload.assets.isEmpty() && sourceId)
      await payload.assets.writeToBlob(sourceId);

    return snapshotRet;
  }
}
