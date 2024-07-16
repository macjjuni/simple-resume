'use client'

import {memo, useCallback, useState, ChangeEvent} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import "./name.scss";

function Name() {

    const [value, setValue] = useState('');

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue((e.target as HTMLInputElement).value);
    }, []);

    return (<ResumeInput className={'name__input'} value={value} onChange={onChange}
                         placeholder={'Name'} fontSize={48} align={'center'} bold />);
}

export default memo(Name);
