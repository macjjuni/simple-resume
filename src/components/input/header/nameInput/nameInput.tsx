'use client'

import {memo, useCallback, useState, ChangeEvent} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import "./nameInput.scss";

function NameInput() {

    const [value, setValue] = useState('');

    return (<ResumeInput className={'name__input'} value={value} setValue={setValue} placeholder={'Name'}
                         fontSize={48} align={'center'} bold />);
}

export default memo(NameInput);
