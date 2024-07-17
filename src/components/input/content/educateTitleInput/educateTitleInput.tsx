'use client'

import {memo, MutableRefObject, useCallback, useState} from 'react';
import {SubTitle} from '@/components/input';
import {EducateListInputRef} from '@/components/input/content/educateInputList/educateInputList.interface';
import "./educateTitleInput.scss"

function EducateTitleInput({listInputRef}: { listInputRef: MutableRefObject<EducateListInputRef | undefined> }) {

    // region [Hooks]

    const [educateTitle, setEducateTitle] = useState('');

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

    // endregion


    return (
        <>
            <SubTitle value={educateTitle} setValue={setEducateTitle} placeholder={'Education'}
                      className={'educate__title__input'}/>
            <button type={'button'} onClick={onClickAddEducateItem} aria-label="add educate button"
                    className={'simple-resume__add-button'}/>
        </>
    );
};

export default memo(EducateTitleInput);
