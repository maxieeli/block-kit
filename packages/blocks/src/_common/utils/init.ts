import type { DocCollection } from '@maxiee/block_store';

export function createDefaultDoc(
  collection: DocCollection,
  options: { id?: string; title?: string } = {}
) {
  const doc = collection.createDoc({ id: options.id });

  doc.load();
  const title = options.title ?? '';
  const rootId = doc.addBlock('workbench:page', {
    title: new doc.Text(title),
  });
  collection.setDocMeta(doc.id, {
    title,
  });
  doc.addBlock('workbench:surface', {}, rootId);
  const noteId = doc.addBlock('workbench:note', {}, rootId);
  doc.addBlock('workbench:paragraph', {}, noteId);
  // To make sure the content of new doc would not be clear
  // By undo operation for the first time
  doc.resetHistory();

  return doc;
}
