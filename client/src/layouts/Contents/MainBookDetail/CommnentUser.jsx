import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { getCommentUser } from "../../../services/books/CommentBookService";
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
    <div className="bg-[#303030] w-[500px] p-3 rounded-[10px] my-2 max-lg:w-full" key={index}>
        <div className="flex justify-between">
            <div className="flex gap-2">
                <img className="w-[50px] rounded-full" src={dataComment.user && dataComment.user.avatar ? dataComment.user.avatar : AvatarUser} alt="" />
                 <div>
   
                 <span className="text-[#fff] max-lg:block">
                 { dataComment.user?.email } {dataComment.user && dataComment.user.admin && '( Admin )'}
                 </span>

                <small className="text-[#fff]">5{dataComment.createdAt && format(new Date(dataComment.createdAt), 'yyyy-MM-dd HH:mm:ss')}</small>
                 </div>
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