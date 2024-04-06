import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function Home(props: SvgProps) {
    return (
        <Svg width="1em" height="1em" viewBox="0 0 21 24" fill="none" {...props}>
            <Path
                d="M6.875 22.625H1V8.375l9.5-7.125L20 8.375v14.25h-5.875v-7.588a1.6 1.6 0 00-1.6-1.6h-4.05a1.6 1.6 0 00-1.6 1.6v7.588z"
                fill="#fff"
                stroke="#2E0052"
                strokeWidth={2}
            />
        </Svg>
    );
}

const HomeIcon = React.memo(Home);
export default HomeIcon;
