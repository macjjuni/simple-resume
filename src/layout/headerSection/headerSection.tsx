import {memo} from 'react';
import { Name, Position } from '@/components/input';

function HeaderSection() {
    return (
        <header className={'simple-resume__header'}>
            <Name />
            <Position />
        </header>
    );
};

export default memo(HeaderSection);
