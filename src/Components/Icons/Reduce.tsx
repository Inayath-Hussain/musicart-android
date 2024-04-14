import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function Reduce(props: SvgProps) {
    return (
        <Svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
            <Path
                d="M6 12h12"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

const ReduceIcon = React.memo(Reduce);
export default ReduceIcon;
