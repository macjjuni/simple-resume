'use client';

import {memo, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import './positionInput.scss';

function PositionInput() {

    const [value, setValue] = useState('');

    return (
        <ResumeInput className={'simple-resume__position'} value={value} setValue={setValue}
            placeholder={'Position'} fontSize={21} align={'center'} />
    );
};

export default memo(PositionInput);
