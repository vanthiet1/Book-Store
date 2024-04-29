import { useState,useEffect } from "react";
import Slider from "react-slick";
import Settings from "~/components/slider-books/SettingSlider";
import { GetDataBanner } from "~/services/books/BannerService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Section = () => {
    const [banner,setBanner]= useState([])
    const getBanner = async () => {
        try {
            const response = await GetDataBanner();
            setBanner(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getBanner();
    }, []);
    return (
        <div className="relative top-0 z-[1]">
            <Slider {...Settings}>      
                {banner && banner.map((banner,index)=>(
                    <div key={index}>
                    <img loading="lazy" src={banner.image ? banner.image : "Đang cập nhật"} alt="" />
                    </div>
                ))}
            </Slider>
            <div className="w-full absolute h-[50px] bottom-0 gradient max-md:h-[20px]"></div>
        </div>
    );
};




export default Section;
