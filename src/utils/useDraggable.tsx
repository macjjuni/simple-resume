import {useState, useCallback, useRef, DragEvent, MouseEvent as ReactMouseEvent, Dispatch, SetStateAction, CSSProperties} from 'react';

interface DraggableListProps<T> {
    items: T;
    setItems: Dispatch<SetStateAction<T>>;
    handleDragStart: (e: ReactMouseEvent<HTMLDivElement>, index: number) => void;
    handleDragOver: (e: DragEvent<HTMLLIElement>, index: number) => void;
    onDrop: () => void;
    onDragEnd: () => void;
    handleTargetMouseDown: (e: ReactMouseEvent<HTMLDivElement>, index: number) => void;
    onMouseUp: () => void;
}

const dragOffStyle = {
    transform: 'scale(1)',
    boxShadow: 'none',
    border: 'none',
};

const dragOnStyle = {
    transform: 'translateX(4px) scale(1.032)',
    border: '1px dashed #aaaaaa',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const useDraggable = <T,>(initialItems: T): DraggableListProps<T> => {

    // region [Hooks]

    const [items, setItems] = useState<T>(initialItems);
    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const [overIndex, setOverIndex] = useState<number | null>(null);
    const dragItemRef = useRef<HTMLElement | null>(null);

    // endregion


    // region [Styles]

    const applyDragStyles = useCallback((style: CSSProperties) => {
        if (dragItemRef.current) {
            Object.keys(style).forEach((key) => {
                dragItemRef.current!.style[key] = style[key];
            });
        }
    }, []);

    // endregion


    // region [Events]

    const handleDragStart = useCallback((e: ReactMouseEvent<HTMLDivElement>, index: number) => {
        setDraggedItemIndex(index);
        dragItemRef.current = e.currentTarget.closest('li');
        applyDragStyles(dragOnStyle);
    }, [applyDragStyles]);


    const resetDragStyles = useCallback(() => {
        if (dragItemRef.current) {
            applyDragStyles(dragOffStyle);
        }
        setDraggedItemIndex(null);
        setOverIndex(null);
    }, [applyDragStyles]);

    const handleDragOver = useCallback((e: DragEvent<HTMLLIElement>, index: number) => {
        e.preventDefault();
        if (index !== overIndex) {
            setOverIndex(index);
            const newItems = [...items];
            const [draggedItem] = newItems.splice(draggedItemIndex!, 1);
            newItems.splice(index, 0, draggedItem);
            setItems(newItems);
            setDraggedItemIndex(index);
        }
    }, [draggedItemIndex, items, overIndex]);

    const onDrop = useCallback(() => {
        resetDragStyles();
    }, [resetDragStyles]);

    const onDragEnd = useCallback(() => {
        resetDragStyles();
    }, [resetDragStyles]);

    const handleTargetMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>, index: number) => {
        const target = e.target as HTMLElement;
        dragItemRef.current = target.closest('li');
        if (dragItemRef.current) {
            dragItemRef.current!.draggable = true;
        }
        handleDragStart(e, index);
    }, [handleDragStart]);

    const onMouseUp = useCallback(() => {
        console.log(dragItemRef.current);
        if (dragItemRef.current) {
            applyDragStyles(dragOffStyle);
            dragItemRef.current!.draggable = false;
            dragItemRef.current = null;
        }
    }, []);

    // endregion


    return {
        items,
        setItems,
        handleDragStart,
        handleDragOver,
        onDrop,
        onDragEnd,
        handleTargetMouseDown,
        onMouseUp,
    };
};

export default useDraggable;
