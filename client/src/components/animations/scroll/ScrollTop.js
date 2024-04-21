import { animateScroll as scroll } from "react-scroll";

const handleScrollToTop = () => {
    scroll.scrollToTop({
      duration: 700, 
      smooth: "ease-in-out" 
    });
  };
  export  {
    handleScrollToTop
  };