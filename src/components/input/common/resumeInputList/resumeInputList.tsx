'use client';

import React, {ChangeEvent, forwardRef, ForwardedRef, useCallback, useEffect, useImperativeHandle, useRef, useMemo, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {ResumeInputListProps, ResumeListInputRef} from '@/components/input/common/resumeInputList/resumeInputList.interface';
import generateRandomString from '@/utils/random';
import './resumeInputList.scss';
import useDraggable from '@/utils/useDraggable';

const ResumeListInput = ({ type = 'text', className, onChange, placeholder, style,
        bold, fontSize, align }: ResumeInputListProps, ref: ForwardedRef<ResumeListInputRef>) => {

    // region [Hooks]

    const {items: skills, setItems: setSkills, handleDragOver, onDragEnd, onDrop, onMouseUp, handleTargetMouseDown}
        = useDraggable([]);

    // endregion


    // region [APIs]

    const addListItem = useCallback(() => {
        if(skills.length > 15) {
            return;
        }
        setSkills(prev => ([...prev, {id: generateRandomString(), value: ''}]));
    }, [setSkills]);

    useImperativeHandle(ref, () => ({
        addListItem: () => addListItem(),
    }), [addListItem]);

    // endregion


    // region [Events]

    const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
        setSkills(prev =>
            prev.map((item, index) =>
                index === idx ? {...item, value: e.target.value} : item,
            ),
        );
        onChange?.(e, idx);
    }, [setSkills, onChange]);

    const onClickRemoveItem = useCallback((idx: number) => {
        setSkills(prev => prev.filter((item, index) => index !== idx));
    }, [setSkills]);

    // endregion

    // region [Privates]

    const isShowRemoveButton = useMemo(() => {
        return skills.length > 1;
    }, [skills]);

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
                    skills.map((item, idx) => (
                        <li key={item.id} className={'simple-resume__input-list__item'} draggable={false}
                            onDragEnd={onDragEnd} onDrop={onDrop} onMouseUp={onMouseUp}
                            onDragOver={(e) => { handleDragOver(e, idx);}}>

                            {
                                skills.length > 1 && (
                                    <div className={'simple-resume__input-list__item__drag-icon'}
                                         onMouseDown={(e) => handleTargetMouseDown(e, idx)} onMouseUp={onMouseUp}>
                                        📌
                                    </div>
                                )
                            }

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
