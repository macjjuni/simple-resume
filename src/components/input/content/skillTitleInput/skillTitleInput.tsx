'use client'

import {ChangeEvent, memo, MutableRefObject, useCallback, useState} from 'react';
import {SubTitle} from '@/components/input';
import {ResumeListInputRef} from '@/components/input/common/resumeInputList/resumeInputList.interface';
import AddButton from '@/components/svg/addButton';
import {useStore} from "@/store";
import "./skillTitleInput.scss";

function SkillTitleInput({listInputRef}: {listInputRef: MutableRefObject<ResumeListInputRef | undefined>}) {

    // region [Hooks]

    const skillTitle = useStore(state => state.skillTitle);
    const setSkillTitle = useStore(state => state.setSkillTitle);

    // endregion


    // region[Privates]

    const addSkillItem = useCallback(() => {
        listInputRef.current?.addListItem();
    }, [listInputRef]);

    // endregion


    // region [Events]

    const onClickAddSkillItem = useCallback(() => {
        addSkillItem();
    }, [addSkillItem]);

    const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSkillTitle(e.target?.value || '');
    }, [setSkillTitle]);

    // endregion


    return (
        <div className={'skill-title-input__container'}>
            <SubTitle className="skill__title__input"
                      value={skillTitle} onChange={onChangeTitle} placeholder={'Skills'} />
            <button type={'button'} onClick={onClickAddSkillItem} aria-label="add skill button"
                    className={'simple-resume__add-button'}>
                <AddButton />
            </button>
        </div>
    );
};

export default memo(SkillTitleInput);
