import {Dispatch, SetStateAction} from 'react';


interface EducateVO {
    id: string
    text: string
    date: string
    isDate: boolean
}

export interface EducateListInputRef {
    addEducateItem: () => void
}
