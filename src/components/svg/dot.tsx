import {memo} from 'react';


function Dot() {
    return (
        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none">
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round" />
            <g>
                <circle cx="12" cy="12" r="3" fill="#000000" />
            </g>
        </svg>
    )
}

export default memo(Dot);
