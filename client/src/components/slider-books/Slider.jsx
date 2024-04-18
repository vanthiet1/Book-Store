import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ButtonLeftArrow,ButtonRightArrow } from "../button-ui/ButonSilder";

const Sliders = (props) => {
    const { slidesToShow , autoplaySpeed,children } = props
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: autoplaySpeed,
        prevArrow: <ButtonLeftArrow onClick={() => setCurrentSlide(currentSlide - 1)} />,
        nextArrow: <ButtonRightArrow onClick={() => setCurrentSlide(currentSlide + 1)} />,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex)
    };

    return (
        <div className="relative w-full overflow-hidden">
            <Slider {...settings} className="overflow-hidden">
                {children}
            </Slider>
        </div>
    );
};

export default Sliders;
