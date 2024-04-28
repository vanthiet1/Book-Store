import { useEffect, useState } from "react";
import { format } from 'date-fns';
import Success from "@components/notification/Success";
import CheckButton from "../components/button/CheckButton";
import DeleteButton_square from "../components/button/DeleteButton_square";
import { GetAllUser, DeleteUser } from "../service/userService";
import InformationUser from "../components/detailUser/informationUser";
import Close from "~/components/icons/Close";
import { GetAllDetailUser } from "../service/detailUserService";

const User = () => {
    const [allUser, setAllUser] = useState([])
    const [showSuccessDelete, setShowSuccessDelete] = useState(false);
    const [dataInforUser, setDataInforUser] = useState(false);

    const getAllUser = async () => {
        try {
            const response = await GetAllUser();
            setAllUser(response)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllUser()
    }, [])
    const handleDelete = async (id) => {
        try {
            await DeleteUser(id);
            setShowSuccessDelete(true)
            getAllUser()
        } catch (error) {
            console.log(error);
        }
    }
    const getDetailUser = async (userId) => {
        try {
            const infomationUser = await GetAllDetailUser(userId);
            setDataInforUser(infomationUser);
        } catch (error) {
            console.log(error);
        }
    }
  useEffect(()=>{
    getDetailUser()
  },[])
    return (
        <>
            {showSuccessDelete && <Success message="Xóa Sản Phẩm Thành Công" />}
            <div className="fixed z-10">
                <thead className="bg-gray-200 h-16 ">
                    <tr>
                        <th className="text-left px-[100px]">Số điện thoại </th>
                        <th className="text-left px-0">Địa chỉ</th>
                        <th className="text-left px-[80px] cursor-pointer" >
                            <Close
                            // onClick={}
                            />
                        </th>
                    </tr>
                </thead>
                {dataInforUser && (
                    <InformationUser
                        key={dataInforUser._id}
                        phoneNumberUser={dataInforUser.phoneNumber}
                        adressUser={dataInforUser.address}
                    />
                )}
            </div>
            <div className="flex-1  undefine ">
                <table className=" w-full ">
                    <thead className="bg-[#FFFFFF] h-[50px]">
                        <tr >
                            <th></th>
                            <th className="text-left w-[150px]">Tên</th>
                            <th className="text-left w-[150px]">Admin</th>
                            <th className="text-left w-[150px]" >Trạng thái</th>
                            <th className="text-left w-[150px] pl-[50px]">Ngày tạo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser && allUser.map((user, index) => (
                            <tr key={index}>
                                <td className="border-b-0 lg:w-6 before:hidden p-4">
                                    <div className="w-24 h-24 mx-auto lg:w-6 lg:h-6">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Howell-Hand" alt="Howell Hand" className="rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800" />
                                    </div>
                                </td>
                                <td data-label="Name" className="text-left">{user.email && user.email}</td>
                                <td data-label="Company">{user.admin && user.admin === true ? "Admin" : "User"}</td>
                                <td data-label="Status">
                                    {user.status && user.status === true ? (
                                        <span className="text-[#fff] bg-green-600 p-2 rounded-[10px] w-[130px] inline-block text-center">Đã xác thực</span>)
                                        : (<span className="text-[#fff] bg-red-600 rounded-[10px] p-2 w-[130px] inline-block text-center">
                                            Chưa xác thực
                                        </span>)}</td>

                                <td data-label="Created" className="lg:w-1 whitespace-nowrap pl-[50px]">
                                    <small className="text-gray-500 dark:text-slate-400"> {user.createdAt && format(new Date(user.createdAt), 'yyyy-MM-dd HH:mm:ss')}</small>
                                </td>
                                <td className="before:hidden lg:w-1 whitespace-nowrap">
                                    <div className="flex items-center justify-start lg:justify-end undefined -mb-3 flex-nowrap">
                                        <CheckButton clickCheck={
                                            () => {
                                                getDetailUser(user._id)
                                            }} />
                                        <DeleteButton_square clickDelete={() => { handleDelete(user._id) }} />
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

export default User;