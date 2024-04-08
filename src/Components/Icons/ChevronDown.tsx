import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function ChevronDown(props: SvgProps) {
    return (
        <Svg height="1em" viewBox="0 -960 960 960" width="1em" {...props}>
            <Path d="M480-345L240-585l56-56 184 184 184-184 56 56-240 240z" />
        </Svg>
    );
}

const ChevronDownIcon = React.memo(ChevronDown);
export default ChevronDownIcon;
