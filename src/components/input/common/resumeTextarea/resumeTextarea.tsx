'use client';

import {ChangeEvent, CSSProperties, useCallback, useEffect, useMemo, useRef} from 'react';
import {ResumeTextareaProps,} from '@/components/input/common/resumeTextarea/resumeTextarea.interface';
import './resumeTextarea.scss';

const focusClassName = 'simple-resume__textarea__wrapper--focus';

const blankHtml = ['<div><br></div>', '<br>'];


const ResumeTextarea = (
    {
        className,
        value,
        onChange,
        placeholder,
        style,
        bold,
        fontSize,
        align,
        minHeight = '80px'
    }: ResumeTextareaProps
) => {

    // region [Hooks]

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);

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
        }

        return styles;
    }, [minHeight, style, bold, fontSize, align]);

    const placeholderStyle = useMemo(() => {
        if (fontSize) {
            return {fontSize: fontSize};
        }
        return {}
    }, [fontSize]);

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
    }, [value]);

    const placeholderClassName = useMemo(() => {
        if (value !== '') {
            return 'simple-resume__textarea__placeholder--hidden';
        }
        return '';
    }, [value]);

    // endregion


    // region [Privates]

    const initializeContent = useCallback((value: string) => {
        rootRef.current!.innerHTML = value;
    }, []);

    const addFocusEffect = useCallback(() => {
        wrapperRef.current?.classList.add(focusClassName);
    }, []);

    const removeFocusEffect = useCallback(() => {
        wrapperRef.current?.classList.remove(focusClassName);
    }, []);

    // endregion


    // region [Events]

    const onInput = useCallback((e: ChangeEvent<HTMLDivElement>) => {
        const html = e.target.innerHTML;
        if (blankHtml.includes(html)) {
            onChange?.('');
        } else {
            onChange?.(e.target.innerHTML);
        }
    }, [onChange]);

    const onFocus = useCallback(() => {
        addFocusEffect();
    }, [addFocusEffect]);

    const onBlur = useCallback(() => {
        removeFocusEffect();
    }, [removeFocusEffect]);

    const onClickPlaceholder = useCallback(() => {
        rootRef.current!.focus();
    }, []);

    // endregion


    // region [Life Cycles]

    useEffect(() => {
        if (value !== '') {
            initializeContent(value);
        }
    }, []);

    // endregion


    return (
        <div ref={wrapperRef} className={'simple-resume__textarea__wrapper'}>
            <span className={`simple-resume__textarea__placeholder ${placeholderClassName}`} style={placeholderStyle}
                  onClick={onClickPlaceholder}>
                {placeholder}
            </span>
            <div ref={rootRef} className={`simple-resume__textarea ${rootClassName}`} contentEditable onInput={onInput}
                 onFocus={onFocus} onBlur={onBlur} style={rootStyle} suppressContentEditableWarning/>
            <div className={`simple-resume__textarea__focus-line ${focusLineClassName}`}/>
        </div>
    );
};

ResumeTextarea.displayName = 'ResumeTextarea';
export default ResumeTextarea;
