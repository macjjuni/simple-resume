'use client';

import {memo, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {WebSvg} from '@/components/svg';
import '@/components/input/intro/intro.common.scss';

function WebInput() {

    const [value, setValue] = useState('');

    return (
        <div className="simple-resume__contact__item__container">
            <WebSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={value} setValue={setValue}
                         placeholder={'https://wwww.xxx.xxx'} fontSize={12}/>
        </div>
    );
};

export default memo(WebInput);
