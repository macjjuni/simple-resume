'use client';

import React, {ChangeEvent, memo, useCallback, useRef, useState} from 'react';
import {EmailInput, PhoneInput, SubTitle, WebInput, GithubInput} from '@/components/input';
import ResumeTextarea from '@/components/input/common/resumeTextarea/resumeTextarea';
import {ResumeTextareaRefs} from '@/components/input/common/resumeTextarea/resumeTextarea.interface';
import './introSection.scss';

const introPlaceholder = 'Similar to resume summary - about me is an introduction that \n' +
    'provides a brief snapshot of your professional background,\n' +
    'relevant skills, and key accomplishments.';

function IntroSection() {

    // region [Hooks]

    const rootRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<ResumeTextareaRefs | null>(null);
    const [introTitle, setIntroTitle] = useState('');
    const [intro, setIntro] = useState('');

    // endregion


    // region [Events]

    const onChangeIntro = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setIntro(e.target.value);
    }, []);

    const onResizeTextarea = useCallback((size: number) => {
        // textarea height + padding + root padding + intro height + gap size
        const newSize = size + 9 + 32 + 12 + 25;
        console.log(newSize)
        rootRef.current!.style.height = `${newSize}px`;
        rootRef.current!.style.minHeight = `${newSize}px`;
    }, []);

    // endregion

    return (
        <section ref={rootRef} className={'simple-resume__intro'}>
            <div className="simple-resume__intro__left">
                <SubTitle value={introTitle} setValue={setIntroTitle} placeholder={'About Me'}/>
                <ResumeTextarea ref={textareaRef} className="simple-resume__intro__textarea"
                                value={intro} onChange={onChangeIntro} placeholder={introPlaceholder}
                                fontSize={14} onResize={onResizeTextarea}/>
            </div>
            <div className="simple-resume__intro__right">
                <PhoneInput/>
                <EmailInput/>
                <WebInput/>
                <GithubInput/>
            </div>
        </section>
    );
}

export default memo(IntroSection);
