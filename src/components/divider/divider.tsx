import {memo, useMemo} from 'react';
import {DividerProps} from '@/components/divider/initialize/divider.interface';
import "./divider.scss";

function Divider({direction = 'horizon', margin}: DividerProps) {

    const rootClass = useMemo(()=> {
        const clazz = [];

        if (direction) {
            clazz.push(`simple__resume__divider--${direction}`)
        }
        return clazz.join(' ');
    }, [direction])

    const rootStyle = useMemo(() => {
        if (margin) {
            return { margin }
        }
    }, [margin])

    return (<div className={`simple__resume__divider ${rootClass}`} style={rootStyle} />);
}

export default memo(Divider);
