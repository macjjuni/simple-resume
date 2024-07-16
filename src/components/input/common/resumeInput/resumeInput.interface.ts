import {ChangeEvent, CSSProperties, KeyboardEvent} from 'react';


export interface ResumeInputProps {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void

    className?: string
    placeholder?: string
    style?: CSSProperties
    bold?: boolean
    fontSize?: number
    align?: 'left' | 'center' | 'right'
}
