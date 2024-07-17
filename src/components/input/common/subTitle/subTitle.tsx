'use client';

import {ChangeEvent, memo, useCallback, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {SubtitleProps} from '@/components/input/common/subTitle/subTitle.interface';

function SubTitle({ className, value, setValue, onChange, placeholder, align = 'left'}: SubtitleProps) {

    const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue?.((e.target as HTMLInputElement).value);
        onChange?.(e);
    }, [setValue, onChange]);

    return (
        <ResumeInput className={`resume__sub-title ${className}`} value={value} onChange={onChangeValue}
                     placeholder={placeholder} fontSize={18} bold align={align}/>
    );
};

export default memo(SubTitle);
