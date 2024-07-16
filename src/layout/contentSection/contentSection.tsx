'use client'

import {ChangeEvent, memo, useCallback, useState} from 'react';
import {SubTitle} from '@/components/input';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import "./contentSection.scss";

function ContentSection() {

    const [educate, setEducate] = useState('');

    const onChangeEducate = useCallback((e: ChangeEvent<HTMLInputElement>)=> {
        setEducate(e.target.value);
    }, [])

    return (
        <section className={'simple-resume__content__container'}>
            <div className="simple-resume__content__header">
                <div className="simple-resume__content__header__left">
                    <SubTitle placeholder={'Education'} />
                </div>
                <div className="simple-resume__content__header__right">
                    <SubTitle placeholder={'Work Experience'} />
                </div>
            </div>
            <div className="simple-resume__content__body">
                <div className="simple-resume__content__body__left">
                    <ResumeInput value={educate} onChange={onChangeEducate}
                                 placeholder={'OO대학교 - 소프트웨어 공학'} fontSize={16} />
                </div>
                <div className="simple-resume__content__body__right">

                </div>
            </div>
        </section>
    );
};

export default memo(ContentSection);
