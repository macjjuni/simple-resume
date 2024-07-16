import {CSSProperties, memo, useMemo} from 'react';
import {DividerProps} from '@/components/divider/initialize/divider.interface';
import "./divider.scss";

function Divider({direction = 'horizon', margin, height}: DividerProps) {

    const rootClass = useMemo(()=> {
        const clazz = [];

        if (direction) {
            clazz.push(`simple__resume__divider--${direction}`)
        }
        return clazz.join(' ');
    }, [direction])

    const rootStyle = useMemo(() => {
        const styles: CSSProperties = {};

        if (margin) { styles.margin = margin; }
        if (height) { styles.height = height; }

        return styles;
    }, [margin, height])

    return (<div className={`simple__resume__divider ${rootClass}`} style={rootStyle} />);
}

export default memo(Divider);
