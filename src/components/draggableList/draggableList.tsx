import React, {memo} from 'react';
import useDraggable from '@/utils/useDraggable';

function DraggableList() {

    const {items, handleDragOver, onDragEnd, onDrop, onMouseUp, handleTargetMouseDown} = useDraggable(['Item 1', 'Item 2', 'Item 3']);

    return (
        <ul>
            {items.map((item, index) => (
                <li key={item} draggable={false} onDragOver={(e) => { handleDragOver(e, index);}}
                    onDragEnd={onDragEnd} onDrop={onDrop} onMouseUp={onMouseUp}>
                    <div onMouseDown={(e) => handleTargetMouseDown(e, index)}>
                        📌
                    </div>
                    {item}
                </li>
            ))}
        </ul>
    );
}

export default memo(DraggableList);
