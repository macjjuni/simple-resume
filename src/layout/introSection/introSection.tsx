'use client';

import React, {ChangeEvent, memo, useCallback, useEffect, useRef, useState} from 'react';
import {EmailInput, GithubInput, PhoneInput, SubTitle, WebInput} from '@/components/input';
import ResumeTextarea from '@/components/input/common/resumeTextarea/resumeTextarea';
import './introSection.scss';
import {useStore} from "@/store";
import {store} from "@/store/store";
import {ResumeTextareaRefs} from "@/components/input/common/resumeTextarea/resumeTextarea.interface";

const introPlaceholder = 'Similar to resume summary - about me is an introduction that \n' +
    'provides a brief snapshot of your professional background,\n' +
    'relevant skills, and key accomplishments.';

const initialText = store.introText;


function IntroSection() {

    // region [Hooks]

    const rootRef = useRef<HTMLDivElement | null>(null);
    const introTitle = useStore(state => state.introTitle);
    const setIntroTitle = useStore(state => state.setIntroTitle);
    const introText = useStore(state => state.introText);
    const setIntroText = useStore(state => state.setIntroText);

    const introTextRef = useRef<ResumeTextareaRefs>(null);

    // endregion


    // region [Privates]

    const initializeIntroText = useCallback(() => {
        introTextRef.current?.initializeContent(initialText);
    }, []);

    // endregion


    // region [Events]

    const onChangeIntroTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setIntroTitle(e.target?.value || '');
    }, [setIntroTitle]);

    // endregion

    useEffect(() => {
        initializeIntroText();
    }, [initializeIntroText]);


    return (
        <section ref={rootRef} className={'simple-resume__intro'}>
            <div className="simple-resume__intro__left">
                <SubTitle value={introTitle} onChange={onChangeIntroTitle} placeholder={'About Me'}/>
                <ResumeTextarea ref={introTextRef} value={introText} onChange={setIntroText}
                                placeholder={introPlaceholder} fontSize={14} minHeight={'86px'} />
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
