import { Suspense, lazy, useContext } from "react";
import Header from "~/layouts/Header";
import { Uicontext } from "../../contexts/UiContext";

const LazyInforDetail = lazy(() => import("~/layouts/Contents/MainBookDetail/InforDetail"));
const LazyCommentBook = lazy(() => import("~/layouts/Contents/MainBookDetail/CommentBook"));

const BookDetail = () => {
    const { displayComment } = useContext(Uicontext)
    return (
        <div className="bg-[#0b2d2d]">
            <Header />
            <div className="pt-[96px] h-auto px-[30px] ">
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyInforDetail />
                    {displayComment && <LazyCommentBook />}
                </Suspense>
            </div>
        </div>
    );
};

export default BookDetail;
