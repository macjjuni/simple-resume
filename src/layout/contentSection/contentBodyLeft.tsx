import {memo, useRef} from 'react';
import {EducateInputList, EducateTitleInput, SkillTitleInput} from '@/components/input';
import {ResumeListInputRef} from '@/components/input/common/resumeInputList/resumeInputList.interface';
import {EducateListInputRef} from '@/components/input/content/educateInputList/educateInputList.interface';
import ResumeInputList from '@/components/input/common/resumeInputList/resumeInputList';

function ContentBodyLeft() {

    // region [Hooks]

    const educateListInputRef = useRef<EducateListInputRef>();
    const skillInputListRef = useRef<ResumeListInputRef>();

    // endregion


    return (
        <div className="simple-resume__content__body__left">

            <div className="simple-resume__content__body__left__header">
                <EducateTitleInput listInputRef={educateListInputRef}/>
            </div>

            <div className="simple-resume__content__body__left__body">

                <EducateInputList ref={educateListInputRef} />

                <div className="simple-resume__content__body__left__body__skill__container">
                    <SkillTitleInput listInputRef={skillInputListRef} />
                    <ResumeInputList ref={skillInputListRef} fontSize={16} />
                </div>

            </div>


        </div>
    );
};

export default memo(ContentBodyLeft);
