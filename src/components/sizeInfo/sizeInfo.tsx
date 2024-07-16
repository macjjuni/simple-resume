import {memo} from 'react';
import './sizeInfo.scss';

function SizeInfo() {
    return (<div className={'size__info'}>A4(794 x 1123, 96 dpi/ppi)</div>);
};

export default memo(SizeInfo);
