'use client';

import {ChangeEvent, memo, useCallback} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {IphoneSvg} from '../../../svg';
import '@/components/input/intro/intro.common.scss';
import {useStore} from "@/store";


const phoneKey = 'phone';

function PhoneInput() {

    const phone = useStore(state => state.contectInfo.phone);
    const setContectInfo = useStore(state => state.setContectInfo);


    const onChangePhone = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setContectInfo(phoneKey, e.target.value)
    }, [setContectInfo]);


    return (
        <div className="simple-resume__contact__item__container">
            <IphoneSvg/>
            <ResumeInput className={'simple-resume__contact__item__input'} value={phone} onChange={onChangePhone}
                         placeholder={'010-xxxx-xxxx'} fontSize={12}/>
        </div>
    );
};

export default memo(PhoneInput);
