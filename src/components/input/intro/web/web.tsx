'use client';

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {WebSvg} from '@/components/svg';
import '@/components/input/intro/intro.common.scss';

function Web() {

    const [value, setValue] = useState('');

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue((e.target as HTMLInputElement).value);
    }, []);

    return (
        <div className="simple-resume__contact__item__container">
            <WebSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={value} onChange={onChange}
                         placeholder={'https://wwww.xxx.xxx'} fontSize={12}/>
        </div>
    );
};

export default memo(Web);
