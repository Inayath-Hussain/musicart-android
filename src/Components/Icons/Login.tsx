import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function Login(props: SvgProps) {
    return (
        <Svg width="1em" height="1em" viewBox="0 0 25 20" fill="none" {...props}>
            <Path
                d="M22.275 9.9V3.712h2.475v7.425h-2.475m0 4.95h2.475v-2.474h-2.475M9.9 11.137c3.304 0 9.9 1.659 9.9 4.95V19.8H0v-3.713c0-3.291 6.596-4.95 9.9-4.95zM9.9 0a4.95 4.95 0 110 9.9 4.95 4.95 0 010-9.9zm0 13.489c-3.675 0-7.549 1.806-7.549 2.598v1.362H17.45v-1.362c0-.791-3.874-2.598-7.549-2.598zm0-11.138a2.599 2.599 0 100 5.198 2.599 2.599 0 000-5.198z"
                fill="#2E0052"
            />
        </Svg>
    );
}

const LoginIcon = React.memo(Login);
export default LoginIcon;
