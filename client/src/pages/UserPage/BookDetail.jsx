import { useContext } from "react";
import InForDetail from "~/layouts/Contents/MainBookDetail/InforDetail";
import CommentBook from "~/layouts/Contents/MainBookDetail/CommentBook";
import Header from "~/layouts/Header";
import { Uicontext } from "../../contexts/UiContext";

const BookDetail = () => {
    const { displayComment } = useContext(Uicontext)
    return (
        <div className="bg-[#0b2d2d]">
            <Header />
            <div className="pt-[96px] h-auto px-[30px] ">
                <InForDetail />
                {displayComment && <CommentBook />}
            </div>
        </div>
    );
};

export default BookDetail;