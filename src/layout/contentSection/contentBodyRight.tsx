import {memo, useRef} from 'react';
import {WorkExperienceInputList, WorkExperienceTitleInput} from '@/components/input';
import {WorkExperienceInputListRef} from '@/components/input/content/workExperienceInputList/workExperienceInputList.interface';

function ContentBodyRight() {

    const workExperienceListRef = useRef<WorkExperienceInputListRef>();


    return (
        <div className="simple-resume__content__body__right">
            <div className="simple-resume__content__body__right__header">
                <WorkExperienceTitleInput listInputRef={workExperienceListRef} />

            </div>
            <div className="simple-resume__content__body__right__body">
                <WorkExperienceInputList ref={workExperienceListRef} />
            </div>
        </div>
    );
};

export default memo(ContentBodyRight);
