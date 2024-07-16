'use client';

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';

function SubTitle({placeholder, align = 'left'}: { placeholder?: string, align: 'left' | 'center' | 'right' }) {

    const [value, setValue] = useState('');

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue((e.target as HTMLInputElement).value);
    }, []);

    return (
        <ResumeInput className={'resume__sub-title'} value={value} onChange={onChange}
                     placeholder={placeholder} fontSize={18} bold align={align}/>
    );
};

export default memo(SubTitle);
