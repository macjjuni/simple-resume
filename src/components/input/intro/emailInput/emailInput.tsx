'use client';

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {MailSvg} from '../../../svg';
import '@/components/input/intro/intro.common.scss';
import {useStore} from "@/store";

const emailKey = 'email';

function EmailInput() {

    const email = useStore(state => state.contectInfo.email);
    const setContectInfo = useStore(state => state.setContectInfo);


    const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setContectInfo(emailKey, e.target.value)
    }, [setContectInfo]);

    return (
        <div className="simple-resume__contact__item__container">
            <MailSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={email} onChange={onChangeEmail}
                         placeholder={'xxxxx@xxx.com'} fontSize={12}/>
        </div>
    );
};

export default memo(EmailInput);
