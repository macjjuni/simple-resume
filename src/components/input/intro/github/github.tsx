'use client';

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {GithubSvg} from '@/components/svg';
import '@/components/input/intro/intro.common.scss';

function Github() {

    const [value, setValue] = useState('https://github.com/macjjuni');

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue((e.target as HTMLInputElement).value);
    }, []);

    return (
        <div className="simple-resume__contact__item__container">
            <GithubSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={value} onChange={onChange}
                         placeholder={'https://github.com/xxx'} fontSize={12}/>
        </div>
    );
};

export default memo(Github);
