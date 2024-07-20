'use client';

import {memo, MutableRefObject, useCallback, useState} from 'react';
import {SubTitle} from '@/components/input';
import './workExperienceTitleInput.scss';
import {WorkExperienceInputListRef} from '@/components/input/content/workExperienceInputList/workExperienceInputList.interface';
import AddButton from '@/components/svg/addButton';

function WorkExperienceTitleInput({listInputRef}: {listInputRef: MutableRefObject<WorkExperienceInputListRef | undefined>}) {

    // region[Privates]

    const [workTitle, setWorkTitle] = useState('');

    // endregion


    // region[Privates]

    const addExperienceItem = useCallback(() => {
        listInputRef.current?.addWorkExperienceList?.();
    }, [listInputRef]);

    // endregion


    // region [Events]

    const onClickAddSkillItem = useCallback(() => {
        addExperienceItem();
    }, [addExperienceItem]);


    return (
        <div className={'simple-resume__work-experience__container'}>
            <SubTitle value={workTitle} setValue={setWorkTitle} className={'work-experience__title__input'} placeholder={'Work Experience'}/>
            <button type={'button'} onClick={onClickAddSkillItem} aria-label="add skill button"
                    className={'simple-resume__add-button'}>
                <AddButton />
            </button>
        </div>
    );
};

export default memo(WorkExperienceTitleInput);
