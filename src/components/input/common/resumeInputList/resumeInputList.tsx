'use client';

import React, {ChangeEvent, ForwardedRef, forwardRef, useCallback, useImperativeHandle, useMemo} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import {
    ResumeInputListProps,
    ResumeListInputRef,
    ResumeSkillVO
} from '@/components/input/common/resumeInputList/resumeInputList.interface';
import generateRandomString from '@/utils/random';
import useDraggable from '@/utils/useDraggable';
import Dot from '@/components/svg/dot';
import {useStore} from "@/store";
import './resumeInputList.scss';

const ResumeListInput = ({ placeholder, bold, fontSize, align, listStyle = true }: ResumeInputListProps, ref: ForwardedRef<ResumeListInputRef | undefined>) => {

    // region [Hooks]

    const skills = useStore(state => state.skills);
    const setSkills = useStore(state => state.setSkills);


    const {items, setItems, handleDragOver, onDragEnd, onDrop,
        onMouseUp, handleTargetMouseDown} = useDraggable<ResumeSkillVO>(skills);

    // endregion


    // region [Styles]

    const rootStyle = useMemo(() => {
        if (listStyle) {
            return 'simple-resume__input-list__wrapper--dot';
        }
        return '';
    }, [listStyle]);

    // endregion


    // region [APIs]

    const addListItem = useCallback(() => {
        if (items.length > 15) {
            return;
        }

        const newList = [...items, {id: generateRandomString(), text: ''}];
        setItems(newList);
        setSkills(newList);
    }, [items, setItems, setSkills]);

    useImperativeHandle(ref, () => ({
        addListItem: () => addListItem(),
    }), [addListItem]);

    // endregion


    // region [Events]

    const onChangeValue = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {

        const newList = items.map((item, index) =>
            index === idx ? {...item, text: e.target.value} : item);

        setItems(newList);
        setSkills(newList);
    }, [items, setItems, setSkills]);

    const onClickRemoveItem = useCallback((idx: number) => {

        const removedList = items.filter((item, index) => index !== idx);

        setItems(removedList);
        setSkills(removedList);
    }, [items, setItems, setSkills]);

    // endregion

    // region [Privates]

    const isShowRemoveButton = useMemo(() => {
        return items.length > 1;
    }, [items]);

    // endregion


    return (
        <div className={`simple-resume__input-list__wrapper ${rootStyle}`}>
            <ul className={'simple-resume__input-list'}>
                {
                    items.map((item, idx) => (
                        <li key={item.id} className={'simple-resume__input-list__item'} draggable={false}
                            onDragEnd={onDragEnd} onDrop={onDrop} onMouseUp={onMouseUp}
                            onDragOver={(e) => {
                                handleDragOver(e, idx);
                            }}>

                            {
                                items.length > 1 && (
                                    <div className={'drag-icon'}
                                         onMouseDown={(e) => handleTargetMouseDown(e, idx)} onMouseUp={onMouseUp}>
                                        📌
                                    </div>
                                )
                            }
                            {listStyle && <Dot/>}
                            <ResumeInput value={item.text} onChange={(e) => {
                                onChangeValue(e, idx);
                            }}
                                         className={'simple-resume__input-list__item__input'} placeholder={placeholder}
                                         bold={bold} fontSize={fontSize} align={align}/>
                            {
                                isShowRemoveButton && (
                                    <button type={'button'} aria-label="remove skill button" onClick={() => {
                                        onClickRemoveItem(idx);
                                    }}
                                            className={'simple-resume__input-list__item__remove-button remove-icon'}/>
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
