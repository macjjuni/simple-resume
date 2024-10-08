'use client'

import {
    useState,
    useCallback,
    useRef,
    DragEvent,
    MouseEvent,
    CSSProperties,
} from 'react';

interface DraggableListProps<T> {
    handleDragStart: (e: MouseEvent<HTMLDivElement>, index: number) => void;
    handleDragOver: (e: DragEvent<HTMLLIElement>, index: number) => void;
    onDrop: () => void;
    onDragEnd: () => void;
    handleTargetMouseDown: (e: MouseEvent<HTMLDivElement>, index: number) => void;
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

const useDraggable = <T, >(items: T[], onChange: (List: T[]) => void): DraggableListProps<T[]> => {

    // region [Hooks]

    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
    const [overIndex, setOverIndex] = useState<number | null>(null);
    const dragItemRef = useRef<HTMLElement | null>(null);

    // endregion


    // region [Styles]

    const applyDragStyles = useCallback((style: CSSProperties) => {
        if (dragItemRef.current) {
            Object.keys(style).forEach((key) => {
                dragItemRef.current!.style[key as any] = style[key as keyof CSSProperties] as string;
            });
        }
    }, []);

    // endregion


    // region [Privates]
    // endregion


    // region [Events]

    const handleDragStart = useCallback((e: MouseEvent<HTMLDivElement>, index: number) => {
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
            onChange?.(newItems);
            setDraggedItemIndex(index);
        }
    }, [draggedItemIndex, items, overIndex]);


    const onDrop = useCallback(() => {
        resetDragStyles();
    }, [resetDragStyles]);

    const onDragEnd = useCallback(() => {
        resetDragStyles();
    }, [resetDragStyles]);

    const handleTargetMouseDown = useCallback((e: MouseEvent<HTMLDivElement>, index: number) => {
        const target = e.target as HTMLElement;
        dragItemRef.current = target.closest('li');
        if (dragItemRef.current) {
            dragItemRef.current!.draggable = true;
        }
        handleDragStart(e, index);
    }, [handleDragStart]);

    const onMouseUp = useCallback(() => {
        if (dragItemRef.current) {
            applyDragStyles(dragOffStyle);
            dragItemRef.current!.draggable = false;
            dragItemRef.current = null;
        }
    }, [applyDragStyles]);

    // endregion


    return {
        handleDragStart,
        handleDragOver,
        onDrop,
        onDragEnd,
        handleTargetMouseDown,
        onMouseUp,
    };
};

export default useDraggable;
