'use client';

import {memo, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {GithubSvg} from '@/components/svg';
import '@/components/input/intro/intro.common.scss';

function GithubInput() {

    const [value, setValue] = useState('');

    return (
        <div className="simple-resume__contact__item__container">
            <GithubSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={value} setValue={setValue}
                         placeholder={'https://github.com/xxx'} fontSize={12}/>
        </div>
    );
};

export default memo(GithubInput);
