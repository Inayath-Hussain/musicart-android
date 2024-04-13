import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function GoBack(props: SvgProps) {
    return (
        <Svg width="1em" height="1em" viewBox="0 0 16 12" fill="none" {...props}>
            <Path
                d="M6.7 11.275c.2-.2.296-.442.288-.725a1.03 1.03 0 00-.313-.725L3.85 7H15a.968.968 0 00.713-.288A.964.964 0 0016 6a.968.968 0 00-.288-.713A.964.964 0 0015 5H3.85L6.7 2.15c.2-.2.3-.438.3-.713a.97.97 0 00-.3-.712c-.2-.2-.438-.3-.713-.3a.97.97 0 00-.712.3L.7 5.3c-.1.1-.171.208-.213.325A1.083 1.083 0 00.425 6c0 .133.021.258.063.375A.888.888 0 00.7 6.7l4.6 4.6a.932.932 0 00.687.275c.275 0 .512-.1.713-.3z"
                fill="#000"
            />
        </Svg>
    );
}

const GoBackIcon = React.memo(GoBack);
export default GoBackIcon;
