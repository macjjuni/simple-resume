'use client';

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {useStore} from "@/store";
import './positionInput.scss';

function PositionInput() {

    const position = useStore(state => state.position);
    const setPosition = useStore(state => state.setPosition);


    const onChangePosition = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPosition(e.target?.value || '');
    }, [setPosition])

    return (
        <ResumeInput className={'simple-resume__position'} value={position} onChange={onChangePosition}
            placeholder={'Position'} fontSize={21} align={'center'} />
    );
};

export default memo(PositionInput);
