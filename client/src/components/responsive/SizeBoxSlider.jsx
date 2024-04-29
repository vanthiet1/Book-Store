import { useState, useEffect } from 'react';

export const SizeBoxSlider = () => {
    const [slidesToShow, setSlidesToShow] = useState(5);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 300) {
                setSlidesToShow(2); 
            } else if (window.innerWidth < 768) {
                setSlidesToShow(3);
            } else {
                setSlidesToShow(5); 
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return slidesToShow;
};
