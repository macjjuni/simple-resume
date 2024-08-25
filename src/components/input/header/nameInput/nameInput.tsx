'use client'

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import "./nameInput.scss";
import {useStore} from "@/store";

function NameInput() {

    const name = useStore(state => state.name);
    const setName = useStore(state => state.setName);


    const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target?.value || '');
    }, [setName]);


    return (<ResumeInput className={'name__input'} value={name} onChange={onChangeName} placeholder={'Name'}
                         fontSize={48} align={'center'} bold />);
}

export default memo(NameInput);
