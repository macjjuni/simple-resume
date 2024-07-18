import {memo, useState} from 'react';
import {SubTitle} from '@/components/input';
import DraggableList from '@/components/draggableList/draggableList';

function ContentBodyRight() {

    const [workTitle, setWorkTitle] = useState('');
    const [list, setList] = useState(['123', '321']);

    return (
        <div className="simple-resume__content__body__right">
            <div className="simple-resume__content__body__right__header">
                <SubTitle value={workTitle} setValue={setWorkTitle} placeholder={'Work Experience'}/>
            </div>
            <div className="simple-resume__content__body__right__body">
                <DraggableList {...{list, setList}} />
            </div>
        </div>
    );
};

export default memo(ContentBodyRight);
