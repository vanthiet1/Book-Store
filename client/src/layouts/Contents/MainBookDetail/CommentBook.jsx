import { useContext, useState } from "react";
import { DataUser } from '../../../contexts/authContext/DataUserLogin';
import { Uicontext } from "../../../contexts/UiContext";
import { postCommentBook } from "../../../services/books/CommentBookService";
import { GetDetailBookFree } from "../../../services/books/BookDetailService";
import Error from "../../../components/notification/Error";
import Success from "../../../components/notification/Success";
const CommentBook = () => {
    const [comment, setComment] = useState('');
    const { handleHideComment } = useContext(Uicontext);
    const { inforUser } = useContext(DataUser);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);




    const userId = inforUser ? inforUser._id : null;
    const getBookId = GetDetailBookFree();
    const bookId = getBookId ? getBookId._id : null;


    const submitComment = async () => {
        try {
            if (!userId || !bookId) {
                setShowError(true)
                return;
            }
            const data = {
                user: userId,
                bookId: bookId,
                content: comment
            };
            setShowSuccess(true)
            await postCommentBook(bookId, data);
            setComment(" ")
            handleHideComment()
        } catch (error) {
            console.log('Lỗi khi gửi bình luận:', error);
        }
    }

    return (
        <>
            {showError && <Error message="Vui lòng đăng nhập để bình luận" />}
            {showSuccess && <Success message="Đăng bình luận thành công" />}
            <div className="w-[450px] h-auto fixed z-10 top-[20%] left-[35%] bg-[#161618] p-5 rounded-[20px] border border-gray-700 opacity-[0.98] ">
                <div className="flex justify-end" onClick={handleHideComment}>
                    <img className="cursor-pointer" src="https://waka.vn/svgs/icon-close-white.svg" alt="" />
                </div>
                <h1 className="text-white text-center py-3 text-[30px]">Nhận xét</h1>
                <div>
                    <span className="block text-white">Nhận xét</span>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="view-textarea bg-transparent w-full border-white-600 border py-2 px-4 outline-none text-white-default rounded-xl text-15-15 min-h-30 my-3 text-white"
                        placeholder="Hãy cho chúng mình một vài nhận xét và đóng góp ý kiến nhé...!"
                        name=""
                        id=""
                        cols="20"
                        rows="5"
                    ></textarea>

                    <button onClick={submitComment} className={`w-full bg-[#333333] p-3 rounded-[50px] text-white ${comment && 'bg-green-700'}`}>Gửi nhận xét</button>
                </div>
            </div>
        </>
    );
};

export default CommentBook;
