import { BasicType, AdvancedType } from '@cubxinc/easy-email-core';

export function isTableBlock(blockType: any) {
  return blockType === AdvancedType.TABLE;
}
