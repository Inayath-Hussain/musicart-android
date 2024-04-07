import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function Close(props: SvgProps) {
    return (
        <Svg viewBox="0 0 32 32" width="1em" height="1em" {...props}>
            <Path
                fill="none"
                stroke="#666666"
                strokeWidth={4}
                strokeMiterlimit={10}
                d="M6.5 25.5l19-19M6.5 6.5l19 19"
            />
        </Svg>
    );
}

const CloseIcon = React.memo(Close);
export default CloseIcon;
