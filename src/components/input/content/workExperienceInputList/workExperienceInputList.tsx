'use client';

import React, {
    ChangeEvent, MouseEvent, ForwardedRef, forwardRef,
    useCallback, useImperativeHandle, useRef
} from 'react';
import ResumeInput from '@/components/input/common/resumeInput/resumeInput';
import useDraggable from '@/utils/useDraggable';
import {
    ProjectVO,
    WorkExperienceInputListRef,
    WorkExperienceVO,
} from '@/components/input/content/workExperienceInputList/workExperienceInputList.interface';
import generateRandomString from '@/utils/random';
import './workExperienceInputList.scss';
import WorkExperienceProjectInputList
    , {
    WorkExperienceProjectInputListRef
} from '@/components/input/content/workExperienceInputList/workExperienceProjectInputList';
import {useStore} from "@/store";


export const workExperienceMockData = (): WorkExperienceVO[] => ([
    {
        id: generateRandomString(),
        companyName: '',
        position: '',
        date: '',
        project: [{id: generateRandomString(), projectTitle: '', projectDetail: ''}, {
            id: generateRandomString(),
            projectTitle: '',
            projectDetail: ''
        }],
    },
]);

const projectMockData = (): ProjectVO => (
    {
        id: generateRandomString(),
        projectTitle: '',
        projectDetail: '',
    }
);


function WorkExperienceInputList(_: any, ref: ForwardedRef<WorkExperienceInputListRef>) {

    // region [Hooks]

    const experience = useStore(state => state.experience);
    const setExperience = useStore(state => state.setExperience);

    const {
        handleDragOver,
        onDragEnd,
        onDrop,
        onMouseUp,
        handleTargetMouseDown,
    } = useDraggable(experience, setExperience);
    const projectInputListRef = useRef<WorkExperienceProjectInputListRef>(null);

    // const {items: projectList, setItems: setProjectList, handleProjectDragOver, onProjectDragEnd, onProjectDrop, onProjectMouseUp, handleProjectTargetMouseDown} = useDraggable<WorkExperienceVO[]>(workExperienceMockData());


    // endregion


    // region [APIs]

    const addWorkExperienceList = useCallback(() => {
        setExperience(experience.map(item => item).concat(workExperienceMockData()));
    }, [experience, setExperience]);

    const addProject = useCallback((index: number) => {

        const newProjectExperience = experience.map((item, idx) => {
            if (idx === index) {
                return {...item, project: [...projectInputListRef.current?.getProject() || [], projectMockData()]}
            }
            return item;
        });

        setExperience(newProjectExperience);
    }, [experience, setExperience]);

    // endregion


    // region [Events]

    const onChangeCompanyName = useCallback((e: ChangeEvent<HTMLInputElement>, index: number) => {

        const newCompanyNameExperience = experience.map((item, idx) =>
            index === idx ? {...item, companyName: e.target.value} : item
        );

        setExperience(newCompanyNameExperience);
    }, [experience, setExperience]);

    const onChangePosition = useCallback((e: ChangeEvent<HTMLInputElement>, index: number) => {

        const newPositionNameExperience = experience.map((item, idx) =>
            index === idx ? {...item, companyName: e.target.value} : item
        );

        setExperience(newPositionNameExperience);
    }, [experience, setExperience]);

    const onChangeDate = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {

        const newDateNameExperience = experience.map((item, index) =>
            index === idx ? {...item, date: e.target.value} : item,
        );

        setExperience(newDateNameExperience);
    }, [experience, setExperience]);

    const onClickRemoveWorkExperience = useCallback((e: MouseEvent<HTMLButtonElement>, index: number) => {

        const removedExperience = experience.filter((item, idx) => index !== idx)

        setExperience(removedExperience);
    }, [experience, setExperience]);

    const onChangeProject = useCallback((index: number, project: ProjectVO[]) => {

        const changedProjectExperience = experience.map((item, idx) =>
            index === idx ? {...item, project} : item,
        );

        setExperience(changedProjectExperience);
    }, [experience, setExperience]);

    // endregion


    // region [Privates]

    useImperativeHandle(ref, () => ({
        addWorkExperienceList: () => addWorkExperienceList(),
    }), [addWorkExperienceList]);

    // endregion


    return (
        <ul className={'work-experience__input__list'}>
            {experience.map((item, idx) => (
                <li key={item.id} className={'work-experience__input__list__item'} draggable={false}
                    onDragOver={(e) => {
                        handleDragOver(e, idx);
                    }}
                    onDragEnd={onDragEnd} onDrop={onDrop} onMouseUp={onMouseUp}>
                    {
                        experience.length > 1 && (
                            <div className={'drag-icon work-experience__input__list__item__drag-icon'}
                                 onMouseDown={(e) => handleTargetMouseDown(e, idx)}>
                                📌
                            </div>
                        )
                    }
                    <ResumeInput className={'work-experience__input__list__item__company-title'}
                                 value={item.companyName} onChange={(e) => {
                        onChangeCompanyName(e, idx);
                    }}
                                 placeholder={'Company'} fontSize={16} bold/>
                    {
                        experience.length > 1 && (
                            <button type={'button'} aria-label="remove skill button"
                                    className={'remove-icon'}
                                    onClick={(e) => {
                                        onClickRemoveWorkExperience(e, idx);
                                    }}/>
                        )
                    }

                    <ResumeInput className={'work-experience__input__list__item__position'} fontSize={12}
                                 value={item.position} onChange={(e) => {
                        onChangePosition(e, idx);
                    }}
                                 placeholder={'Your role/position'}/>
                    <ResumeInput className={'work-experience__input__list__item__date'} fontSize={12}
                                 value={item.date} onChange={(e) => {
                        onChangeDate(e, idx);
                    }}
                                 placeholder={'Date'}/>
                    <WorkExperienceProjectInputList ref={projectInputListRef} idx={idx} projectList={item.project}
                                                    addProject={addProject} onChangeProject={onChangeProject}/>
                </li>
            ))}
        </ul>
    );
}

export default forwardRef(WorkExperienceInputList);
