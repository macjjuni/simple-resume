'use client';

import React, {ChangeEvent, forwardRef, ForwardedRef, useCallback, useEffect, useImperativeHandle, useRef, useMemo, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {ResumeInputListProps, ResumeListInputRef} from '@/components/input/common/resumeInputList/resumeInputList.interface';
import generateRandomString from '@/utils/random';
import useDraggable from '@/utils/useDraggable';
import './resumeInputList.scss';
import Dot from '@/components/svg/dot';

const ResumeListInput = ({
    type = 'text', className, onChange, placeholder, style,
    bold, fontSize, align, listStyle = true,
}: ResumeInputListProps, ref: ForwardedRef<ResumeListInputRef>) => {

    // region [Hooks]

    const {items, setItems, handleDragOver, onDragEnd, onDrop, onMouseUp, handleTargetMouseDown}
        = useDraggable([]);

    // endregion


    // region [Styles]

    const rootStyle = useMemo(() => {
        if (listStyle) { return 'simple-resume__input-list__wrapper--dot'; }
        return '';
    }, [listStyle]);


    // endregion


    // region [APIs]

    const addListItem = useCallback(() => {
        if (items.length > 15) { return; }

        setItems(prev => ([...prev, {id: generateRandomString(), value: ''}]));
    }, [setItems]);

    useImperativeHandle(ref, () => ({
        addListItem: () => addListItem(),
    }), [addListItem]);

    // endregion


    // region [Events]

    const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
        setItems(prev =>
            prev.map((item, index) =>
                index === idx ? {...item, value: e.target.value} : item,
            ),
        );
        onChange?.(e, idx);
    }, [setItems, onChange]);

    const onClickRemoveItem = useCallback((idx: number) => {
        setItems(prev => prev.filter((item, index) => index !== idx));
    }, [setItems]);

    // endregion

    // region [Privates]

    const isShowRemoveButton = useMemo(() => {
        return items.length > 1;
    }, [items]);

    // endregion

    // region [Life Cycles]

    useEffect(() => {
        addListItem();
    }, [addListItem]);

    // endregion


    return (
        <div className={`simple-resume__input-list__wrapper ${rootStyle}`}>
            <ul className={'simple-resume__input-list'}>
                {
                    items.map((item, idx) => (
                        <li key={item.id} className={'simple-resume__input-list__item'} draggable={false}
                            onDragEnd={onDragEnd} onDrop={onDrop} onMouseUp={onMouseUp}
                            onDragOver={(e) => { handleDragOver(e, idx);}}>

                            {
                                items.length > 1 && (
                                    <div className={'drag-icon'}
                                         onMouseDown={(e) => handleTargetMouseDown(e, idx)} onMouseUp={onMouseUp}>
                                        📌
                                    </div>
                                )
                            }
                            {listStyle && <Dot/>}
                            <ResumeInput value={item.value} onChange={(e) => { onChangeValue(e, idx); }}
                                         className={'simple-resume__input-list__item__input'} placeholder={placeholder}
                                         bold={bold} fontSize={fontSize} align={align}/>
                            {
                                isShowRemoveButton && (
                                    <button type={'button'} aria-label="remove skill button" onClick={() => { onClickRemoveItem(idx); }}
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
