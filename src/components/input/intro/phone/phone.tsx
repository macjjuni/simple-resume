'use client';

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {IphoneSvg} from '@/components/svg';
import '@/components/input/intro/intro.common.scss';

function Phone() {

    const [value, setValue] = useState('');

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue((e.target as HTMLInputElement).value);
    }, []);

    return (
        <div className="simple-resume__contact__item__container">
            <IphoneSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={value} onChange={onChange}
                         placeholder={'010-XXXX-XXXX'} fontSize={12}/>
        </div>
    );
};

export default memo(Phone);
