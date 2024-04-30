import { useParams } from "react-router-dom";
import { getCommentUser } from "../../../services/books/CommentBookService";
import { useEffect, useState } from "react";
import { getInforUserComment } from "../../../services/books/CommentBookService";
import { AvatarUser } from "~/components/image/AvatarDefault";

const CommnentUser = () => {
    const [comments, setComments] = useState([]);
    const bookId = useParams()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCommentUser(bookId.id);
                const userData = data.map((comment) => comment.user);
                const userDataPromises = userData.map(userId => getInforUserComment(userId));
                const userDataResults = await Promise.all(userDataPromises);
                const commentsWithUserData = data.map((comment, index) => ({
                    ...comment,
                    user: userDataResults[index]
                }));
                setComments(commentsWithUserData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [bookId])

    return (
        <>
         {comments.length > 0 ? comments.map((dataComment, index) => (
    <div className="bg-[#303030] w-[500px] p-3 rounded-[10px] my-2 " key={index}>
        <div className="flex justify-between">
            <div className="flex gap-2">
                <img className="w-[30px] rounded-full" src={dataComment.user && dataComment.user.avatar ? dataComment.user.avatar : AvatarUser} alt="" />
                <span className="text-[#fff]">{dataComment.user && dataComment.user.email} {dataComment.user && dataComment.user.admin && '( Admin )'}</span>
            </div>
            <div>
                <span className="text-[#fff]">5{dataComment.createdAt}</span>
            </div>
        </div>
        <div className="py-3">
            <p className="text-[#fff]">{dataComment.content}</p>
        </div>
    </div>
)) : (
    <div className="w-[50%] max-md:w-full">
        <img className="w-full h-full" src="https://waka.vn/images/comment-empty.png" alt="" />
        <h1 className="text-center text-[#fff]">Chưa có bình luận nào</h1>
    </div>
)}

        </>
    );
};

export default CommnentUser;