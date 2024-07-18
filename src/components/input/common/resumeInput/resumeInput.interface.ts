import {ChangeEvent, CSSProperties, Dispatch, KeyboardEvent, SetStateAction} from 'react';


export interface ResumeInputProps {
    value: string
    setValue?: Dispatch<SetStateAction<string>>
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void

    className?: string
    placeholder?: string
    wrapperStyle?: CSSProperties
    style?: CSSProperties
    bold?: boolean
    fontSize?: number
    align?: 'left' | 'center' | 'right'
}
