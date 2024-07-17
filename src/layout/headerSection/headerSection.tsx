import {memo} from 'react';
import { NameInput, PositionInput } from '@/components/input';

function HeaderSection() {
    return (
        <header className={'simple-resume__header'}>
            <NameInput />
            <PositionInput />
        </header>
    );
};

export default memo(HeaderSection);
