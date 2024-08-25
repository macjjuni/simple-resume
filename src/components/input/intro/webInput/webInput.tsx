'use client';

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {WebSvg} from '../../../svg';
import '@/components/input/intro/intro.common.scss';
import {useStore} from "@/store";

const webKey = 'web';


function WebInput() {

    const web = useStore(state => state.contectInfo.web);
    const setContectInfo = useStore(state => state.setContectInfo);

    const onChangeWeb = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setContectInfo(webKey, e.target.value)
    }, [setContectInfo]);

    return (
        <div className="simple-resume__contact__item__container">
            <WebSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={web} onChange={onChangeWeb}
                         placeholder={'https://wwww.xxx.xxx'} fontSize={12}/>
        </div>
    );
};

export default memo(WebInput);
