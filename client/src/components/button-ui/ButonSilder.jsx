import { TiChevronLeft, TiChevronRight } from "react-icons/ti";

const ButtonLeftArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="absolute left-[20px] top-[50%] bg-slate-50 w-[50px] h-[50px] flex items-center justify-center rounded-full opacity-[0.2] cursor-pointer z-10  hover:opacity-[0.4] ease-in duration-300" onClick={onClick}>
            <TiChevronLeft  aria-label="arrow-left" />
        </div>
    );
};
const ButtonRightArrow = (props) => {
    const { onClick } = props;
    return (
        <div className=" absolute top-[50%] right-[10px] bg-slate-50 w-[50px] h-[50px] flex items-center justify-center rounded-full opacity-[0.2] cursor-pointer hover:opacity-[0.4] ease-in duration-300" onClick={onClick}>
            <TiChevronRight aria-label="arrow-right" />
        </div>
    );
};
export { ButtonLeftArrow, ButtonRightArrow } 