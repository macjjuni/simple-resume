import {CSSProperties} from 'react';

export interface ResumeListInputRef {
    addListItem: () => void;
}

export interface ResumeInputListProps {
    placeholder?: string
    style?: CSSProperties
    bold?: boolean
    fontSize?: number
    align?: 'left' | 'center' | 'right'
    listStyle?: boolean
}
