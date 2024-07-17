'use client';

import {ChangeEvent, ForwardedRef, memo, useCallback, useEffect, useImperativeHandle} from 'react';
import {EducateInputListProps, EducateListInputRef} from '@/components/input/content/educateInputList/educateInputList.interface';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import generateRandomString from '@/utils/random';
import './educateInputList.scss';

const EducateInputList = ({value, setValue}: EducateInputListProps, ref: ForwardedRef<EducateListInputRef>) => {

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

    // endregion

    // region [Privates]

    const addEducateItem = useCallback(() => {
        setValue(prev => ([...prev, {id: generateRandomString(), text: '', date: ''}]));
    }, [setValue]);

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
                            <button type={'button'} aria-label="remove skill button"
                                    className={'simple-resume__input-list__item__remove-button'}/>
                        </div>
                        <div className={'simple-resume__educate-input-list__item__container'}>
                            <ResumeInput value={item.date} onChange={(e) => { onChangeEducateDate(e, idx); }}
                                         className={'simple-resume__content__body__left__top__educate-date'}
                                         placeholder={'20xx.xx ~ 20xx.xx'} fontSize={12}/>
                            <button type={'button'} aria-label="remove skill button"
                                    className={'simple-resume__input-list__item__hide-button'}/>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};

export default memo(EducateInputList);
