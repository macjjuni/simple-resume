'use client';

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {GithubSvg} from '../../../svg';
import '@/components/input/intro/intro.common.scss';
import {useStore} from "@/store";

const githubKey = 'github';

function GithubInput() {

    const github = useStore(state => state.contectInfo.github);
    const setContectInfo = useStore(state => state.setContectInfo);


    const onChangeGithub = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setContectInfo(githubKey, e.target.value)
    }, [setContectInfo]);


    return (
        <div className="simple-resume__contact__item__container">
            <GithubSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={github} onChange={onChangeGithub}
                         placeholder={'https://github.com/xxx'} fontSize={12}/>
        </div>
    );
};

export default memo(GithubInput);
