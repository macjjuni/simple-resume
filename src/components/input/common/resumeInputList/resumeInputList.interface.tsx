import {ChangeEvent, CSSProperties, Dispatch, SetStateAction} from 'react';

interface ListProps {
    id: string
    value: string
}

export interface ResumeListInputRef {
    addListItem: () => void;
}

export interface ResumeInputListProps {
    value: ListProps[]
    setValue?: Dispatch<SetStateAction<ListProps[]>>
    onChange?: (e: ChangeEvent<HTMLInputElement>, index: number) => void

    placeholder?: string
    style?: CSSProperties
    bold?: boolean
    fontSize?: number
    align?: 'left' | 'center' | 'right'
}
