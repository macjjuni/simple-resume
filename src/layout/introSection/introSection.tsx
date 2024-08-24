'use client';

import React, {memo, useCallback, useRef, useState} from 'react';
import {EmailInput, GithubInput, PhoneInput, SubTitle, WebInput} from '@/components/input';
import ResumeTextarea from '@/components/input/common/resumeTextarea/resumeTextarea';
import './introSection.scss';

const introPlaceholder = 'Similar to resume summary - about me is an introduction that \n' +
    'provides a brief snapshot of your professional background,\n' +
    'relevant skills, and key accomplishments.';

function IntroSection() {

    // region [Hooks]

    const rootRef = useRef<HTMLDivElement | null>(null);
    const [introTitle, setIntroTitle] = useState('');
    const [intro, setIntro] = useState('');

    // endregion


    // region [Events]

    const onChangeIntro = useCallback((introText: string) => {
        setIntro(introText);
    }, []);

    // endregion


    return (
        <section ref={rootRef} className={'simple-resume__intro'}>
            <div className="simple-resume__intro__left">
                <SubTitle value={introTitle} setValue={setIntroTitle} placeholder={'About Me'}/>
                <ResumeTextarea value={intro} onChange={onChangeIntro} placeholder={introPlaceholder}
                                fontSize={14} minHeight={'86px'} />
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
