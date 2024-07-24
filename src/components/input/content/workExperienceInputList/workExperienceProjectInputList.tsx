'use client';

import React, {ChangeEvent, ForwardedRef, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import useDraggable from '@/utils/useDraggable';
import {
    ProjectVO,
    WorkExperienceInputListRef,
} from '@/components/input/content/workExperienceInputList/workExperienceInputList.interface';
import generateRandomString from '@/utils/random';
import Dot from '@/components/svg/dot';
import ResumeTextarea from '@/components/input/common/resumeTextarea/resumeTextarea';
import './workExperienceProjectInputList.scss';
import AddButton from '@/components/svg/addButton';


const projectMockData = (): ProjectVO[] => ([
    {
        id: generateRandomString(),
        projectTitle: '',
        projectDetail: '',
    }]);

interface WorkExperienceProjectInputListProps {
    projectList: ProjectVO[]
    addProject: (idx: number) => void
    onChangeProject: (e: any, index: number) => void
}


function WorkExperienceProjectInputList({projectList, addProject, onChangeProject}: WorkExperienceProjectInputListProps, ref: ForwardedRef<WorkExperienceInputListRef>) {

    // region [Hooks]

    const {
        items,
        setItems: setProjectList,
        handleDragOver,
        onDragEnd,
        onDrop,
        onMouseUp,
        handleTargetMouseDown,
    } = useDraggable<ProjectVO[]>(projectList);

    // endregion


    // region [APIs]

    const addWorkExperienceList = useCallback(() => {
        setProjectList(prev => (
            prev.map(item => item).concat(projectMockData())
        ));
    }, [setProjectList]);

    // endregion


    // region [Events]

    const onChangeProjectTitle = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
        setProjectList(prev => (
            prev.map((item, index) =>
                index === idx ? {...item, projectTitle: e.target.value} : item,
            )
        ));
    }, [setProjectList]);

    const onChangeProjectDetail = useCallback((e: ChangeEvent<HTMLTextAreaElement>, index: number) => {
        setProjectList(prev => (
            prev.map((item, idx) => (
                idx === index ? {...item, projectDetail: e.target.value} : item
            ))
        ))
    }, [setProjectList]);

    // endregion


    // region [Privates]

    useImperativeHandle(ref, () => ({
        addWorkExperienceList: () => addWorkExperienceList(),
    }), [addWorkExperienceList]);

    // endregion

    // region [Life Cycles]

    useEffect(() => {
        console.log(projectList);
    }, [projectList]);

    // endregion


    return (
        <ul className={'work-experience__project__list'}>
            {items?.map((item, idx) => (
                <li key={item.id} className={'work-experience__project__list__item'} draggable={false}
                    onDragOver={(e) => { handleDragOver(e, idx);}}
                    onDragEnd={onDragEnd} onDrop={onDrop} onMouseUp={onMouseUp}>
                    <div className="work-experience__project__list__item__title__item">
                        {
                            projectList.length > 1 && (
                                <div className={'work-experience__project__list__item__drag-icon'}
                                     onMouseDown={(e) => handleTargetMouseDown(e, idx)}>
                                    📌
                                </div>
                            )
                        }
                        <Dot/>
                        <ResumeInput className={'work-experience__project__list__item__project-title'}
                                     value={item.projectTitle} onChange={(e) => { onChangeProjectTitle(e, idx); }}
                                     placeholder={'Project Title'} fontSize={14} bold/>
                        <button type={'button'} aria-label="add project button" className={'simple-resume__add-button'}>
                            <AddButton />
                        </button>
                    </div>
                    <div className="work-experience__project__list__item__detail__item">
                        <ResumeTextarea value={item.projectDetail} onChange={(e) => { onChangeProjectDetail(e, idx) }} fontSize={14} minHeight={'18px'} />
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default forwardRef(WorkExperienceProjectInputList);
