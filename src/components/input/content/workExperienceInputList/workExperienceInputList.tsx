'use client';

import React, {ChangeEvent, MouseEvent, ForwardedRef, forwardRef,
    useCallback, useImperativeHandle, useRef} from 'react';
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


const workExperienceMockData = (): WorkExperienceVO[] => ([
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

    const {
        items: workExperienceList,
        setItems: setWorkExperienceList,
        handleDragOver,
        onDragEnd,
        onDrop,
        onMouseUp,
        handleTargetMouseDown,
    } = useDraggable<WorkExperienceVO[]>(workExperienceMockData());
    const projectInputListRef = useRef<WorkExperienceProjectInputListRef>(null);

    // const {items: projectList, setItems: setProjectList, handleProjectDragOver, onProjectDragEnd, onProjectDrop, onProjectMouseUp, handleProjectTargetMouseDown} = useDraggable<WorkExperienceVO[]>(workExperienceMockData());


    // endregion


    // region [APIs]

    const addWorkExperienceList = useCallback(() => {
        setWorkExperienceList(prev => (
            prev.map(item => item).concat(workExperienceMockData())
        ));
    }, [setWorkExperienceList]);

    const addProject = useCallback((index: number) => {
        console.log(projectInputListRef.current!.getProject())
        setWorkExperienceList(prev => (
            prev.map((item, idx) => {
                if (idx === index) {
                    return {...item, project: [...projectInputListRef.current?.getProject() || [], projectMockData()] }
                }
                return item
            })
        ))
    }, [setWorkExperienceList]);

    // endregion


    // region [Events]

    const onChangeCompanyName = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
        setWorkExperienceList(prev => (
            prev.map((item, index) =>
                index === idx ? {...item, companyName: e.target.value} : item,
            )
        ));
    }, [setWorkExperienceList]);

    const onChangePosition = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
        setWorkExperienceList(prev => (
            prev.map((item, index) =>
                index === idx ? {...item, position: e.target.value} : item,
            )
        ));
    }, [setWorkExperienceList]);

    const onChangeDate = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
        setWorkExperienceList(prev => (
            prev.map((item, index) =>
                index === idx ? {...item, date: e.target.value} : item,
            )
        ));
    }, [setWorkExperienceList]);

    const onClickRemoveWorkExperience = useCallback((e: MouseEvent<HTMLButtonElement>, idx: number) => {
        setWorkExperienceList(prev => (
            prev.filter((item, index) => index !== idx)
        ));
    }, [setWorkExperienceList]);

    const onChangeProject = useCallback((idx: number, project: ProjectVO[]) => {
        setWorkExperienceList(prev => (
            prev.map((item, index) =>
                index === idx ? {...item, project} : item,
            )
        ));
    }, [setWorkExperienceList]);

    // endregion


    // region [Privates]

    useImperativeHandle(ref, () => ({
        addWorkExperienceList: () => addWorkExperienceList(),
    }), [addWorkExperienceList]);

    // endregion


    return (
        <ul className={'work-experience__input__list'}>
            {workExperienceList.map((item, idx) => (
                <li key={item.id} className={'work-experience__input__list__item'} draggable={false}
                    onDragOver={(e) => {
                        handleDragOver(e, idx);
                    }}
                    onDragEnd={onDragEnd} onDrop={onDrop} onMouseUp={onMouseUp}>
                    {
                        workExperienceList.length > 1 && (
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
                        workExperienceList.length > 1 && (
                            <button type={'button'} aria-label="remove skill button"
                                    className={'work-experience__input__list__item__remove-button'}
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
