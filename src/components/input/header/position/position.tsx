'use client'

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import './position.scss';

function Position() {

    const [value, setValue] = useState('');

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue((e.target as HTMLInputElement).value);
    }, []);

    return (
        <ResumeInput className={'simple-resume__position'} value={value} onChange={onChange}
            placeholder={'Position'} fontSize={21} align={'center'} />
    );
};

export default memo(Position);
