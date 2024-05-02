import { useEffect, useState } from "react";
import { format } from "date-fns";
import CheckButton from "../components/button/CheckButton";
import DeleteButton_square from "../components/button/DeleteButton_square";
import { GetDataComment, GetNameBookInComment, GetNameUserInComment, DeleteComment } from "../service/commentService";
import Success from "~/components/notification/Success";
import Error from "~/components/notification/Error";

const Comment = () => {
    const [dataComment, setDataComment] = useState([]);
    const [bookNames, setBookNames] = useState([]);
    const [userNames, setUserNames] = useState([]);
    const [deleteSucess, setDeleteSucess] = useState(false);
    const [deleteError, setDeleteError] = useState(false);


    const fetchData = async () => {
        try {
            const comments = await GetDataComment();
            setDataComment(comments);
            const bookNames = await GetNameBookInComment(comments);
            setBookNames(bookNames);
            const userNames = await GetNameUserInComment(comments);
             console.log(userNames);
            setUserNames(userNames);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const DeleteCommentUser =  async (id)=>{
        try {
             if(id === undefined || id === null){
                return setDeleteError(true)
             }
           await DeleteComment(id);
           setDeleteSucess(true)
           fetchData()
        } catch (error) {
             console.log(error);
        }
    }
    return (
        <>
         {deleteSucess && (<Success message={"Xóa thành công"}/>)}
         {deleteError && (<Error message={"Xóa không thành công"}/>)}

            <div className="flex-1 undefine">
                <table className="w-full">
                    <thead className="bg-[#FFFFFF] h-[50px]">
                        <tr>
                            <th></th>
                            <th className="text-left w-[150px]">Tên</th>
                            <th className="text-left w-[150px]">Sách</th>
                            <th className="text-left w-[150px]">Nội dung bình luận</th>
                            <th className="text-left w-[150px] pl-[50px]">Ngày bình luận</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataComment.map((comment, index) => (
                            <tr key={index}>
                                <td className="border-b-0 lg:w-6 before:hidden p-4">
                                    <div className="w-24 h-24 mx-auto lg:w-6 lg:h-6">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Howell-Hand" alt="Howell Hand" className="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800" />
                                    </div>
                                </td>
                                <td data-label="User" className="text-left">{userNames.length > 0 ? userNames[index] : ""}</td>
                                <td data-label="Book">{bookNames.length > 0 ? bookNames[index] : ""}</td>
                                <td data-label="Coment">{comment.content}</td>
                                <td data-label="Created" className="lg:w-1 whitespace-nowrap pl-[50px]">
                                    <small className="text-gray-500 dark:text-slate-400"> {comment.createdAt && format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm:ss')}</small>
                                </td>
                                <td className="before:hidden lg:w-1 whitespace-nowrap">
                                    <div className="flex items-center justify-start lg:justify-end undefined -mb-3 flex-nowrap">
                                        <CheckButton />
                                        <DeleteButton_square
                                            clickDelete={
                                                ()=>DeleteCommentUser(comment._id)
                                            } />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Comment;

