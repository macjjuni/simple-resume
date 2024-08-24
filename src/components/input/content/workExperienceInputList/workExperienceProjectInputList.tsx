'use client';

import React, {ChangeEvent, ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import useDraggable from '@/utils/useDraggable';
import {ProjectVO,} from '@/components/input/content/workExperienceInputList/workExperienceInputList.interface';
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
    idx: number,
    projectList: ProjectVO[]
    addProject: (idx: number) => void
    onChangeProject: (idx: number, project: ProjectVO[]) => void
}

export interface WorkExperienceProjectInputListRef {
    getProject: () => ProjectVO[]
}


function WorkExperienceProjectInputList(
    {
        idx,
        projectList,
        addProject,
        onChangeProject
    }: WorkExperienceProjectInputListProps, ref: ForwardedRef<WorkExperienceProjectInputListRef>) {

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

    const onChangeProjectDetail = useCallback((text: string, index: number) => {
        setProjectList(prev => (
            prev.map((item, idx) => (
                idx === index ? {...item, projectDetail: text} : item
            ))
        ))
    }, [setProjectList]);

    const onClickAddProject = useCallback(() => {
        addProject(idx);
    }, [idx, addProject]);

    // endregion


    // region [Privates]

    useImperativeHandle(ref, () => ({
        getProject: () => items,
    }), [addWorkExperienceList, items]);

    // endregion

    // region [Life Cycles]

    useEffect(() => {
        setProjectList(projectList);
    }, [projectList]);

    // endregion


    return (
        <ul className={'work-experience__project__list'}>
            {items?.map((item, idx) => (
                <li key={item.id} className={'work-experience__project__list__item'} draggable={false}
                    onDragOver={(e) => {
                        handleDragOver(e, idx);
                    }}
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
                                     value={item.projectTitle} onChange={(e) => {
                            onChangeProjectTitle(e, idx);
                        }}
                                     placeholder={'Project Title'} fontSize={14} bold/>
                        {
                            idx === 0 ?
                                (
                                    <button type={'button'} aria-label="add project button" onClick={onClickAddProject}
                                            className={'simple-resume__add-button'}>
                                        <AddButton/>
                                    </button>
                                )
                                :
                                (<button type={'button'} aria-label="remove project button" className={'remove-icon'} />)
                        }

                    </div>
                    <div className="work-experience__project__list__item__detail__item">
                        <ResumeTextarea value={item.projectDetail} onChange={(text) => {
                            onChangeProjectDetail(text, idx)
                        }} fontSize={14} minHeight={'18px'}/>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default forwardRef(WorkExperienceProjectInputList);
