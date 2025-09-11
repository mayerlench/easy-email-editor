import { cloneDeep } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import TableColumnTool from './tableTool';
import { getShadowRoot, useBlock, useFocusIdx } from '@cubxinc/easy-email-editor';

export function TableOperation() {
  const shadowRoot = getShadowRoot();
  const { focusIdx } = useFocusIdx();
  const { focusBlock, change } = useBlock();
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const tool = useRef<TableColumnTool>(null);

  useEffect(() => {
    const shadowBody = shadowRoot?.querySelector('body');
    if (!shadowBody) {
      return; // Exit early if shadow body is not available
    }

    const borderTool: any = {
      top: topRef.current,
      bottom: bottomRef.current,
      left: leftRef.current,
      right: rightRef.current,
    };
    tool.current = new TableColumnTool(borderTool, shadowBody);
    return () => {
      tool.current?.destroy();
    };
  }, [shadowRoot]); // Add shadowRoot as dependency to retry when it changes

  useEffect(() => {
    if (tool.current) {
      tool.current.changeTableData = (data: any[][]) => {
        change(`${focusIdx}.data.value.tableSource`, cloneDeep(data));
      };
      tool.current.tableData = cloneDeep(focusBlock?.data?.value?.tableSource || []);
    }
  }, [focusIdx, focusBlock]);

  const shadowBody = shadowRoot?.querySelector('body');

  return (
    <>
      {shadowRoot &&
        shadowBody &&
        createPortal(
          <>
            <div>
              <div ref={topRef} />
              <div ref={bottomRef} />
              <div ref={leftRef} />
              <div ref={rightRef} />
            </div>
          </>,
          shadowBody,
        )}
    </>
  );
}
