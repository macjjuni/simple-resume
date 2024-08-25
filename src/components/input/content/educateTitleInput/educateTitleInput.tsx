'use client'

import {ChangeEvent, memo, MutableRefObject, useCallback, useState} from 'react';
import {SubTitle} from '@/components/input';
import {EducateListInputRef} from '@/components/input/content/educateInputList/educateInputList.interface';
import "./educateTitleInput.scss"
import AddButton from '@/components/svg/addButton';
import {useStore} from "@/store";

function EducateTitleInput({listInputRef}: { listInputRef: MutableRefObject<EducateListInputRef | undefined> }) {

    // region [Hooks]

    const educationTitle = useStore(state => state.educationTitle);
    const setEducateTitle = useStore(state => state.setEducationTitle);

    // endregion


    // region[Privates]

    const addEducateItem = useCallback(() => {
        listInputRef.current?.addEducateItem();
    }, []);


    // endregion


    // region [Events]

    const onClickAddEducateItem = useCallback(() => {
        addEducateItem();
    }, [addEducateItem]);

    const onChangTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEducateTitle(e.target.value)
    }, [setEducateTitle])

    // endregion


    return (
        <>
            <SubTitle value={educationTitle} onChange={onChangTitle} placeholder={'Education'}
                      className={'educate__title__input'}/>
            <button type={'button'} onClick={onClickAddEducateItem} aria-label="add educate button"
                    className={'simple-resume__add-button'}>
                <AddButton />
            </button>
        </>
    );
};

export default memo(EducateTitleInput);
