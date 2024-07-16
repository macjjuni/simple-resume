import {CSSProperties, memo, useCallback, useMemo, useRef} from 'react';
import './resumeInput.scss'
import {ResumeInputProps} from '@/components/input/common/resumeInput/resumeInput.interface';


const focusClassName = 'simple-resume__input__wrapper--focus';

function ResumeInput({type = 'text', className, value, onChange, placeholder, style, bold, fontSize, align}: ResumeInputProps) {

    // region [Styles]

    const wrapperRef = useRef<HTMLInputElement | null>(null);

    // endregion

    // region [Styles]

    const rootStyle = useMemo(() => {
        const styles: CSSProperties = { ...style }

        if (bold) { styles.fontWeight = 'bold'; }
        if (fontSize) { styles.fontSize = `${fontSize}px`; }
        if (align) { styles.textAlign = align; }

        return styles
    }, [style, bold, fontSize, align]);

    const rootClassName = useMemo(()=> {
        const clazz = [];

        if (className) { clazz.push(className) }

        return clazz.join(' ');
    }, [className])

    // endregion


    // region [Privates]

    const addFocusEffect = useCallback(() => {
        wrapperRef.current?.classList.add(focusClassName)
    }, []);

    const removeFocusEffect = useCallback(() => {
        wrapperRef.current?.classList.remove(focusClassName)
    }, []);

    // endregion


    // region [Events]

    const onFocus = useCallback(() => {
        addFocusEffect()
    }, [addFocusEffect]);

    const onBlur = useCallback(() => {
        removeFocusEffect()
    }, [removeFocusEffect]);

    // endregion


    return (
        <div ref={wrapperRef} className={`simple-resume__input__wrapper ${rootClassName}`}>
            <input type={'text'} className={`simple-resume__input`}
                   value={value} onChange={onChange} style={rootStyle} placeholder={placeholder}
                   onFocus={onFocus} onBlur={onBlur} />
            <div className="simple-resume__input__focus-line" />
        </div>
    );
}

export default memo(ResumeInput);
