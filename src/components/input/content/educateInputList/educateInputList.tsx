'use client';

import React, {ChangeEvent, ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle} from 'react';
import {EducateListInputRef, EducateVO} from '@/components/input/content/educateInputList/educateInputList.interface';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import generateRandomString from '@/utils/random';
import useDraggable from '@/utils/useDraggable';
import './educateInputList.scss';
import {useStore} from "@/store";


const EducateInputList = (props: any, ref: ForwardedRef<EducateListInputRef | undefined>) => {


    // region [Hooks]

    const education = useStore(state => state.education)
    const setEducation = useStore(state => state.setEducation)

    const {
        handleDragOver,
        onDragEnd,
        onDrop,
        onMouseUp,
        handleTargetMouseDown
    }
        = useDraggable<EducateVO>(education, setEducation);

    // endregion

    // region [Privates]

    const addEducateItem = useCallback(() => {
        setEducation([...education, {id: generateRandomString(), text: '', date: '', isDate: true}]);
    }, [education, setEducation]);

    const toggleDate = useCallback((idx: number) => {
        const toggledEducation = education.map((item, index) => index === idx ? {...item, isDate: !item.isDate} : item)
        setEducation(toggledEducation);
    }, [education, setEducation]);

    const removeItem = useCallback((idx: number) => {
        const removedEducation = education.filter((item, index) => index !== idx);
        setEducation(removedEducation);
    }, [education, setEducation]);

    // endregion


    // region [Styles]

    const educateDateWrapperStyle = useCallback((isDate: boolean) => {
        if (isDate) {
            return {height: 'auto', justifyContent: 'flex-start'};
        }
        return {height: '0', margin: '0'};
    }, []);

    const educateDateStyle = useCallback((isDate: boolean) => {
        if (isDate) {
            return {display: 'block'};
        }
        return {display: 'none'};
    }, []);

    const toggleStyle = useCallback((isDate: boolean) => {
        if (isDate) {
            return 'simple-resume__input-list__item__toggle-button--on';
        }
        return 'simple-resume__input-list__item__toggle-button--off';
    }, []);

    // endregion


    // region [Events]

    const onChangeEducate = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {

        const newEducation = education.map((item, index) => index === idx ? {...item, text: e.target.value} : item);
        setEducation(newEducation);
    }, [education, setEducation]);

    const onChangeEducateDate = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {

        const newEducation = education.map((item, index) => index === idx ? {...item, date: e.target.value} : item)
        setEducation(newEducation);
    }, [education, setEducation]);

    const onClickRemoveEducateItem = useCallback((idx: number) => {
        removeItem(idx);
    }, [removeItem]);

    const onClickDateToggle = useCallback((idx: number) => {
        toggleDate(idx);
    }, [toggleDate]);

    // endregion


    // region [Life Cycles]


    // region [APIs]

    useImperativeHandle(ref, () => ({
        addEducateItem: () => addEducateItem(),
    }), [addEducateItem]);

    // endregion

    return (
        <ul className={'simple-resume__educate-input-list'}>
            {
                education.map((item, idx) => (
                    <li key={item.id} className={'simple-resume__educate-input-list__item'}
                        draggable={false} onDragOver={(e) => {
                        handleDragOver(e, idx);
                    }}
                        onDragEnd={onDragEnd} onDrop={onDrop} onMouseUp={onMouseUp}>

                        {
                            education.length > 1 && (
                                <div className={'drag-icon'}
                                     onMouseDown={(e) => handleTargetMouseDown(e, idx)} onMouseUp={onMouseUp}>
                                    📌
                                </div>
                            )
                        }

                        <div className={'simple-resume__educate-input-list__item__container'}>
                            <ResumeInput value={item.text} onChange={(e) => {
                                onChangeEducate(e, idx);
                            }}
                                         className={'simple-resume__content__body__left__top__educate'}
                                         placeholder={'XXX학교 - XXXXX 공학'} fontSize={16}/>
                            {
                                education.length > 1 && (
                                    <button type={'button'} aria-label="remove skill button"
                                            className={'simple-resume__input-list__item__remove-button remove-icon'}
                                            onClick={() => {
                                                onClickRemoveEducateItem(idx);
                                            }}/>
                                )
                            }
                        </div>

                        <div className={'simple-resume__educate-input-list__item__container'}
                             style={educateDateWrapperStyle(item.isDate)}>
                            <ResumeInput value={item.date} onChange={(e) => {
                                onChangeEducateDate(e, idx);
                            }}
                                         className={'simple-resume__content__body__left__top__educate-date'}
                                         wrapperStyle={educateDateStyle(item.isDate)}
                                         placeholder={'20xx.xx ~ 20xx.xx'} fontSize={12}/>
                            <button type={'button'} aria-label="remove skill button" onClick={() => {
                                onClickDateToggle(idx);
                            }}
                                    className={`simple-resume__input-list__item__toggle-button ${toggleStyle(item.isDate)}`}/>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};

EducateInputList.displayName = 'EducateInputList';
export default forwardRef(EducateInputList);
