import React, {memo, useState} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import ResumeInputList from '@/components/input/common/resumeInputList/resumeInputList';
import {SubTitle} from '@/components/input';

function ContentBodyRight() {

    const [workTitle, setWorkTitle] = useState('');
    const [educate, setEducate] = useState('');
    const [skills, setSkills] = useState([]);

    return (
        <div className="simple-resume__content__body__right">
            <div className="simple-resume__content__body__right__header">
                <SubTitle value={workTitle} setValue={setWorkTitle} placeholder={'Work Experience'}/>
            </div>
            <ResumeInput value={educate} setValue={setEducate}
                         placeholder={'XX대학교 - XX 공학'} fontSize={16}/>
            <ResumeInputList value={skills} setValue={setSkills}/>
        </div>
    );
};

export default memo(ContentBodyRight);
