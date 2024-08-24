import {ChangeEvent, CSSProperties, Dispatch, SetStateAction} from 'react';


export interface ResumeTextareaProps {
    value: string
    onChange: (value: string) => void

    className?: string
    placeholder?: string
    style?: CSSProperties
    bold?: boolean
    fontSize?: number
    align?: 'left' | 'center' | 'right'
    minHeight?: string

    onResize?: (height: number) => void
}
