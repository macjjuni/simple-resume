'use client';

import {memo, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {IphoneSvg} from '../../../svg';
import '@/components/input/intro/intro.common.scss';

function PhoneInput() {

    const [value, setValue] = useState('');

    return (
        <div className="simple-resume__contact__item__container">
            <IphoneSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={value} setValue={setValue}
                         placeholder={'010-xxxx-xxxx'} fontSize={12}/>
        </div>
    );
};

export default memo(PhoneInput);
