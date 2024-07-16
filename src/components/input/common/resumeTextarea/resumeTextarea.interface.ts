import {ChangeEvent, CSSProperties } from 'react';


export interface ResumeTextareaRefs {
    getRef: () => HTMLTextAreaElement | null;
}

export interface ResumeTextareaProps {
    value: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void

    className?: string
    placeholder?: string
    style?: CSSProperties
    bold?: boolean
    fontSize?: number
    align?: 'left' | 'center' | 'right'

    onResize: (height: number) => void
}
