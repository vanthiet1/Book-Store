import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ButtonLeftArrow, ButtonRightArrow } from "@components/button-ui/ButonSilder";

const Section = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <ButtonLeftArrow />,
        nextArrow: <ButtonRightArrow />,
    };

    return (
        <div className="relative top-0 z-[1]">
            <Slider {...settings}>
                <div>
                    <img loading="lazy" src="https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3238.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy"  src="https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3256.jpg?v=1&w=1920&h=600" alt="" />
                </div>

                <div>
                    <img loading="lazy"  src="https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3241.jpg" alt="" />
                </div>

                <div>
                    <img loading="lazy"  src="https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3247.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy"  src="https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner_web_v2/0/0/0/3118.jpg" alt="" />
                </div>

            </Slider>
            <div className="w-full absolute h-[50px] bottom-0 gradient"></div>
        </div>
    );
};




export default Section;
