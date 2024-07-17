'use client';

import {memo, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {MailSvg} from '@/components/svg';
import '@/components/input/intro/intro.common.scss';

function EmailInput() {

    const [value, setValue] = useState('');

    return (
        <div className="simple-resume__contact__item__container">
            <MailSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={value} setValue={setValue}
                         placeholder={'xxxxx@xxx.com'} fontSize={12}/>
        </div>
    );
};

export default memo(EmailInput);
