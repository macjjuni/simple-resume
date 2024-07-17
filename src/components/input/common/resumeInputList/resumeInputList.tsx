'use client';

import React, {ChangeEvent, forwardRef, ForwardedRef, useCallback, useEffect, useImperativeHandle, useRef, useMemo} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {ResumeInputListProps, ResumeListInputRef} from '@/components/input/common/resumeInputList/resumeInputList.interface';
import generateRandomString from '@/utils/random';
import './resumeInputList.scss';

const ResumeListInput = (
    {
        type = 'text',
        className,
        value,
        setValue,
        onChange,
        placeholder,
        style,
        bold,
        fontSize,
        align,
    }: ResumeInputListProps, ref: ForwardedRef<ResumeListInputRef>,
) => {

    // region [APIs]

    const addListItem = useCallback(() => {
        if(value.length > 15) {
            return;
        }
        setValue?.(prev => ([...prev, {id: generateRandomString(), value: ''}]));
    }, [setValue]);

    useImperativeHandle(ref, () => ({
        addListItem: () => addListItem(),
    }), [addListItem]);

    // endregion


    // region [Events]

    const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
        setValue?.(prev =>
            prev.map((item, index) =>
                index === idx ? {...item, value: e.target.value} : item,
            ),
        );
        onChange?.(e, idx);
    }, [setValue, onChange]);

    const onClickRemoveItem = useCallback((idx: number) => {
        setValue?.(prev => prev.filter((item, index) => index !== idx));
    }, [setValue]);

    // endregion

    // region [Privates]

    const isShowRemoveButton = useMemo(() => {
        return value.length > 1;
    }, [value]);

    // endregion

    // region [Life Cycles]

    useEffect(() => {
        addListItem();
    }, [addListItem]);

    // endregion


    return (
        <div className={'simple-resume__input-list__wrapper'}>
            <ul className={'simple-resume__input-list'}>
                {
                    value.map((item, idx) => (
                        <li key={item.id} className={'simple-resume__input-list__item'}>
                            <ResumeInput value={item.value} onChange={(e) => { onChangeValue(e, idx); }}
                                         className={'simple-resume__input-list__item__input'} placeholder={placeholder}
                                         bold={bold} fontSize={fontSize} align={align}/>
                            {
                                isShowRemoveButton && (
                                    <button type={'button'} aria-label="remove skill button" onClick={() => { onClickRemoveItem(idx) }}
                                            className={'simple-resume__input-list__item__remove-button'}/>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

ResumeListInput.displayName = 'ResumeListInput';

export default forwardRef(ResumeListInput);
