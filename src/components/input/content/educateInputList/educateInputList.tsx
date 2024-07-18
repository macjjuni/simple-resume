'use client';

import {ChangeEvent, ForwardedRef, forwardRef, memo, useCallback, useEffect, useImperativeHandle} from 'react';
import {EducateInputListProps, EducateListInputRef} from '@/components/input/content/educateInputList/educateInputList.interface';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import generateRandomString from '@/utils/random';
import './educateInputList.scss';

const EducateInputList = ({value, setValue}: EducateInputListProps, ref: ForwardedRef<EducateListInputRef>) => {


    // region [Privates]

    const addEducateItem = useCallback(() => {
        setValue(prev => ([...prev, {id: generateRandomString(), text: '', date: '', isDate: true}]));
    }, [setValue]);

    const toggleDate = useCallback((idx: number) => {
        setValue(prev => (
            prev.map((item, index) =>
                index === idx ? {...item, isDate: !item.isDate} : item,
            )
        ));
    }, [setValue]);

    const removeItem = useCallback((idx: number) => {
        setValue(prev => (
            prev.filter((item, index) => index !== idx)
        ));
    }, [setValue]);

    // endregion


    // region [Styles]

    const educateDateWrapperStyle = useCallback((isDate: boolean) => {
        if (isDate) {
            return { height: 'auto', justifyContent: 'flex-start' }
        }
        return { height: '0', margin: '0' }
    }, [])

    const educateDateStyle = useCallback((isDate: boolean) => {
        if (isDate) {
            return { display: 'block' }
        }
        return { display: 'none' }
    }, [])

    const toggleStyle = useCallback((isDate: boolean) => {
        if (isDate) { return 'simple-resume__input-list__item__toggle-button--on' }
        return 'simple-resume__input-list__item__toggle-button--off'
    }, [])

    // endregion


    // region [Events]

    const onChangeEducate = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
        setValue(prev => (
            prev.map((item, index) =>
                index === idx ? {...item, text: e.target.value} : item,
            )
        ));
    }, [setValue]);

    const onChangeEducateDate = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
        setValue(prev => (
            prev.map((item, index) =>
                index === idx ? {...item, date: e.target.value} : item,
            )
        ));
    }, [setValue]);

    const onClickRemoveEducateItem = useCallback((idx: number) => {
        removeItem(idx);
    }, [removeItem])

    const onClickDateToggle = useCallback((idx: number) => {
        toggleDate(idx);
    }, [toggleDate]);

    // endregion


    // region [Life Cycles]

    useEffect(() => {
        addEducateItem();
    }, [addEducateItem]);

    // endregion

    // region [APIs]

    useImperativeHandle(ref, () => ({
        addEducateItem: () => addEducateItem(),
    }), [addEducateItem]);

    // endregion

    return (
        <ul className={'simple-resume__educate-input-list'}>
            {
                value.map((item, idx) => (
                    <li key={item.id} className={'simple-resume__educate-input-list__item'}>
                        <div className={'simple-resume__educate-input-list__item__container'}>
                            <ResumeInput value={item.text} onChange={(e) => { onChangeEducate(e, idx); }}
                                         className={'simple-resume__content__body__left__top__educate'}
                                         placeholder={'XXX학교 - XXXXX 공학'} fontSize={16}/>
                            {
                                value.length > 1 && (
                                    <button type={'button'} aria-label="remove skill button" className={'simple-resume__input-list__item__remove-button'}
                                            onClick={() => { onClickRemoveEducateItem(idx) }}/>
                                )
                            }

                        </div>

                        <div className={'simple-resume__educate-input-list__item__container'} style={educateDateWrapperStyle(item.isDate)}>
                            <ResumeInput value={item.date} onChange={(e) => { onChangeEducateDate(e, idx); }}
                                         className={'simple-resume__content__body__left__top__educate-date'} wrapperStyle={educateDateStyle(item.isDate)}
                                         placeholder={'20xx.xx ~ 20xx.xx'} fontSize={12}/>
                            <button type={'button'} aria-label="remove skill button" onClick={() => { onClickDateToggle(idx); }}
                                    className={`simple-resume__input-list__item__toggle-button ${toggleStyle(item.isDate)}`}/>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};

export default forwardRef(EducateInputList);
