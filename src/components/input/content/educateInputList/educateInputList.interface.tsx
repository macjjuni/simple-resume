import {Dispatch, SetStateAction} from 'react';


interface EducateVO {
    id: string
    text: string
    date: string
}

export interface EducateListInputRef {
    addEducateItem: () => void
}

export interface EducateInputListProps {
    value: EducateVO[]
    setValue: Dispatch<SetStateAction<EducateVO[]>>
}
