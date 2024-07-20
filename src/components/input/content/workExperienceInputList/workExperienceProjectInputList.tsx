'use client';

import {ChangeEvent, ForwardedRef, forwardRef, memo, useCallback, useImperativeHandle, useRef} from 'react';
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


const projectMockData = (): ProjectVO[] => ([
    {
        id: generateRandomString(),
        projectTitle: '',
        projectDescription: {
            id: generateRandomString(),
            text: '',
        },
    }]);


function WorkExperienceProjectInputList(_, ref: ForwardedRef<WorkExperienceInputListRef>) {

    // region [Hooks]

    const {
        items: projectList,
        setItems: setProjectList,
        handleDragOver,
        onDragEnd,
        onDrop,
        onMouseUp,
        handleTargetMouseDown,
    } = useDraggable<ProjectVO[]>(projectMockData());

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


    // const onChangeProjectDescription = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
    //     setProjectList(prev => (
    //         prev.map((item, index) =>
    //             index === idx ? {...item, projectDescription: e.target.value} : item,
    //         )
    //     ));
    // }, [setProjectList]);


    // endregion


    // region [Privates]

    useImperativeHandle(ref, () => ({
        addWorkExperienceList: () => addWorkExperienceList(),
    }), [addWorkExperienceList]);

    // endregion


    return (
        <ul className={'work-experience__project__list'}>
            {projectList.map((item, idx) => (
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
                    </div>
                    <div className="work-experience__project__list__item__detail__item">
                        <ResumeTextarea value={''} />
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default forwardRef(WorkExperienceProjectInputList);
