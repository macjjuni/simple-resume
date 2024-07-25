'use client';

import {ChangeEvent, CSSProperties, forwardRef, useCallback, useImperativeHandle, useMemo, useRef} from 'react';
import {
    ResumeTextareaProps,
    ResumeTextareaRefs
} from '@/components/input/common/resumeTextarea/resumeTextarea.interface';
import './resumeTextarea.scss';

const focusClassName = 'simple-resume__textarea__wrapper--focus';


const ResumeTextarea = forwardRef<ResumeTextareaRefs, ResumeTextareaProps>((
    { className, value, onChange, placeholder, style, bold, fontSize, align, onResize, minHeight = '80px' },
    ref
) => {

    // region [Hooks]

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const rootRef = useRef<HTMLTextAreaElement | null>(null);

    // endregion


    // region [Imperative Handle]

    useImperativeHandle(ref, () => ({
        getRef: () => rootRef.current,
    }));

    // endregion

    // region [Styles]

    const rootStyle = useMemo(() => {
        const styles: CSSProperties = {...style};

        if (bold) {
            styles.fontWeight = 'bold';
        }
        if (fontSize) {
            styles.fontSize = `${fontSize}px`;
        }
        if (align) {
            styles.textAlign = align;
        }
        if (minHeight) {
            styles.minHeight = minHeight;
            styles.height = minHeight;
        }

        return styles;
    }, [minHeight, style, bold, fontSize, align]);

    const rootClassName = useMemo(() => {
        const clazz = [];

        if (className) {
            clazz.push(className);
        }

        return clazz.join(' ');
    }, [className]);

    const focusLineClassName = useMemo(() => {
        if (value.length === 0) {
            return 'simple-resume__textarea__focus-line--empty'
        }
        return '';
    }, [value])

    // endregion


    // region [Privates]

    const addFocusEffect = useCallback(() => {
        wrapperRef.current?.classList.add(focusClassName);
    }, []);

    const removeFocusEffect = useCallback(() => {
        wrapperRef.current?.classList.remove(focusClassName);
    }, []);

    const handleResizeHeight = useCallback(() => {

        if (rootRef.current) {
            rootRef.current!.style.height = 'auto';
            onResize?.(rootRef.current!.scrollHeight);
            rootRef.current!.style.height = `${rootRef.current!.scrollHeight}px`;
        }
    }, [onResize]);

    // endregion


    // region [Events]

    const onFocus = useCallback(() => {
        addFocusEffect();
    }, [addFocusEffect]);

    const onBlur = useCallback(() => {
        removeFocusEffect();
    }, [removeFocusEffect]);

    const onChangeTextArea = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        handleResizeHeight();
        onChange(e);
    }, [handleResizeHeight, onChange]);

    // endregion

    return (
        <div ref={wrapperRef} className={'simple-resume__textarea__wrapper'}>
            <textarea ref={rootRef} className={`simple-resume__textarea ${rootClassName}`}
                      value={value} onChange={onChangeTextArea} style={rootStyle} placeholder={placeholder}
                      onFocus={onFocus} onBlur={onBlur} rows={1}/>
            <div className={`simple-resume__textarea__focus-line ${focusLineClassName}`}/>
        </div>
    );
});

ResumeTextarea.displayName = 'ResumeTextarea';
export default ResumeTextarea;
