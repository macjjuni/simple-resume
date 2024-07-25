import {ChangeEvent, Dispatch, SetStateAction} from 'react';


export interface SubtitleProps {
    value: string
    setValue?: Dispatch<SetStateAction<string>>
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void

    className?: string
    wrapperClassName?: string
    placeholder?: string
    align?: 'left' | 'center' | 'right'
}
