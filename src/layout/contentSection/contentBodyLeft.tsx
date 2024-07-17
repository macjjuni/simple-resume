import {memo, useRef, useState} from 'react';
import ResumeInputList from '@/components/input/common/resumeInputList/resumeInputList';
import {EducateInputList, EducateTitleInput, SkillTitleInput} from '@/components/input';
import {ResumeListInputRef} from '@/components/input/common/resumeInputList/resumeInputList.interface';
import {EducateListInputRef} from '@/components/input/content/educateInputList/educateInputList.interface';

function ContentBodyLeft() {

    // region [Hooks]

    const [educate, setEducate] = useState([]);
    const [skills, setSkills] = useState([]);
    const educateListInputRef = useRef<EducateListInputRef>();
    const skillInputListRef = useRef<ResumeListInputRef>();

    // endregion


    return (
        <div className="simple-resume__content__body__left">

            <div className="simple-resume__content__body__left__header">
                <EducateTitleInput listInputRef={educateListInputRef}/>
            </div>

            <div className="simple-resume__content__body__left__body">

                <EducateInputList ref={educateListInputRef} value={educate} setValue={setEducate}/>

                <div className="simple-resume__content__body__left__body__skill__container">
                    <SkillTitleInput listInputRef={skillInputListRef}/>
                    <ResumeInputList ref={skillInputListRef} value={skills} setValue={setSkills}/>
                </div>
            </div>


        </div>
    );
};

export default memo(ContentBodyLeft);
