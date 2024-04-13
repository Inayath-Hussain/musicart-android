import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function CarouselArrow(props: SvgProps) {
    return (
        <Svg width="1em" height="1em" viewBox="0 0 11 10" fill="none" {...props}>
            <Path
                d="M1.627 4.715a.594.594 0 000 1.07L8.743 9.21a.594.594 0 00.851-.535V1.826a.594.594 0 00-.851-.535L1.627 4.715z"
                fill="#fff"
                stroke="#A1A1A1"
                strokeWidth={1.312}
            />
        </Svg>
    );
}

const CarouselArrowIcon = React.memo(CarouselArrow);
export default CarouselArrowIcon;
