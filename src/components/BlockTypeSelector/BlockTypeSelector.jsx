import { useState } from 'react';
import { $getSelection, $setBlocksType } from 'lexical';
import { $createHeadingNode, $createParagraphNode } from '@lexical/rich-text';

const BlockTypeSelector = () => {
  const [selectedBlock, setSelectedBlock] = useState('paragraph');

  const handleBlockChange = (blockType) => {
    setSelectedBlock(blockType);

    const selection = $getSelection();
    if (blockType === 'h1') {
      $setBlocksType(selection, () => $createHeadingNode('h1'));
    } else if (blockType === 'h2') {
      $setBlocksType(selection, () => $createHeadingNode('h2'));
    } else {
      $setBlocksType(selection, () => $createParagraphNode());
    }
  };

  return (
    <select value={selectedBlock} onChange={(e) => handleBlockChange(e.target.value)} className="border p-1 rounded">
      <option value="paragraph">Paragraph</option>
      <option value="h1">Heading 1</option>
      <option value="h2">Heading 2</option>
    </select>
  );
};

export default BlockTypeSelector;
