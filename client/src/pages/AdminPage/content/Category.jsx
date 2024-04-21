import { TiDelete } from "react-icons/ti";
import { useContext, useEffect, useState } from "react";


import { GetDataCategory, DeleteCategory, AddCategory, UpdateCategory } from "../service/categoryService";
import { getNameBookInCategory } from "../service/getInforBook";
import { DisplayPopup } from "../contexts/UiContextAdmin";
import AddButton from "../components/button/AddButton";
import UpdateButton from "../components/button/UpdateButton";
import DeleteButton_square from "../components/button/DeleteButton_square";
import AddForm from "../components/form/AddForm";
import EditForm from "../components/form/EditForm";

import Success from "@components/notification/Success";
import Error from "@components/notification/Error";
const Category = () => {
    const [category, setCategory] = useState([]);
    const [booksInCategories, setBooksInCategories] = useState({});

    const [showSuccessDelete, setShowSuccessDelete] = useState(false);
    const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
    const [showSuccessAdd, setShowSuccessAdd] = useState(false);
    const [successCategory, setSuccessCategory] = useState([]);


    const [showError, setShowError] = useState(false);
    const [showErrorValidateFrom, setShowErrorValidateFrom] = useState(false);

    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [nameCategory, setNameCategory] = useState("");
    const {
        showFormAddCategoryAdmin,
        showFormUpdateCategoryAdmin,

        // update
        handleDisplayUpdateCategory,
        handleHideDisplayUpdateCategory,

        // add form
        handleDisplayAddCategory,
        handleHideDisplayAddCategory,
    } = useContext(DisplayPopup);
    const getCategory = async () => {
        try {
            const response = await GetDataCategory();
            setCategory(response);
            const data = await getNameBookInCategory(response);
            setBooksInCategories(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCategory();
    }, []);

    const handleDeleteCategory = async (id) => {
        try {
            const categoryContainsProducts = booksInCategories[id] && booksInCategories[id].length > 0;

            if (!categoryContainsProducts) {
                await DeleteCategory(id);
                setCategory(category.filter(category => category._id !== id));
                setShowSuccessDelete(true)
            } else {
                setShowError(true)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleAddCategory = async () => {
        try {
            const data = {
                name: nameCategory
            }

            if (data.name.length === 0) {
                return setShowErrorValidateFrom(true)
            }
            await AddCategory(data);
            setNameCategory("")
            setSuccessCategory([...successCategory, nameCategory]);
            getCategory()
            setShowSuccessAdd(true)
            setTimeout(() => { setShowSuccessAdd(false), handleHideDisplayAddCategory() }, 500)
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateCategory = async (categoryId) => {
        try {
            const data = {
                name: nameCategory
            }
            await UpdateCategory(categoryId, data);
            const updatedCategoryList = await GetDataCategory();
            setCategory(updatedCategoryList);
            handleHideDisplayUpdateCategory()
            setShowSuccessUpdate(true)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (showSuccessDelete) {
            setTimeout(() => {
                setShowSuccessDelete(false);
            }, 3000);
        } else if (showError) {
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    }, [showSuccessDelete, showError]);
    return (
        <>
            {showFormAddCategoryAdmin && (
                <div className="w-[300px] h-auto fixed shadow left-[45%] p-5 z-[10] bg-white rounded-md">
                    <AddForm
                        placeholder="Nhập tên danh mục"
                        titleForm="Thêm danh mục"
                        onClick={handleHideDisplayAddCategory}
                        onSubmit={handleAddCategory}
                        value={nameCategory}
                        onChange={(e) => setNameCategory(e.target.value)}
                        handleAddCategory={handleAddCategory}
                        nameClick="Thêm danh mục"
                    />
                </div>
            )}
            {showFormUpdateCategoryAdmin && (
                <div className="w-[300px] h-auto fixed shadow left-[45%] p-5 z-[10] bg-white rounded-md">
                    <div className="flex justify-end">
                        <TiDelete onClick={handleHideDisplayUpdateCategory} className="bg-red-500 text-[#fff] rounded-full w-[20px] h-[20px] cursor-pointer" />
                    </div>
                    <h1 className="text-center py-2">Chỉnh sửa danh mục</h1>
                    <div>
                        {category && category.map((categoryItem) => (
                            editingCategoryId === categoryItem._id && (
                                <>
                                    <EditForm
                                        placeholder="Nhập Tên Danh Mục Cần Sữa"
                                        key={categoryItem._id}
                                        value={nameCategory}
                                        onChange={(e) => setNameCategory(e.target.value)}
                                        onClick={() => handleUpdateCategory(categoryItem._id)}
                                    />
                                </>
                            )

                        ))}
                    </div>
                </div>
            )}

            {showErrorValidateFrom && <Error message="Vui lòng nhập Danh Mục" />}
            {showError && <Error message="Không Thể Xóa Danh Mục Đang Chứa Sản Phẩm" />}
            {showSuccessDelete && <Success message="Xóa Danh Mục Thành Công" />}
            {showSuccessUpdate && <Success message="Cập Nhật Danh Mục Thành Công" />}
            {showSuccessAdd && <Success message="Thêm Danh Mục Thành Công" />}
            <div className="overflow-y-auto h-[640px] scrollbar-thin">
                <table className="w-full">
                    <thead className="bg-gray-100 h-16">
                        <tr>
                            <th className="text-left px-4">Tên Danh Mục</th>
                            <th className="text-left px-4">Sách</th>
                            <th className="px-4 py-2" colSpan="4">
                                <AddButton
                                    nameButton="Thêm Danh Mục"
                                    click={handleDisplayAddCategory}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {category && category.map((category) => (
                            <tr className="border-b border-gray-200" key={category._id}>
                                <td className="text-left px-4 py-2">{category.name ? category.name : (<span>Đang tải....</span>)}</td>
                                <td className="text-left px-4 py-2">
                                    {booksInCategories[category._id]?.map((bookName, index) => (
                                        <div key={index}>Tên - {bookName ? bookName : (<span>Đang tải danh mục....</span>)}</div>
                                    ))}
                                </td>

                                <td className="px-4 py-2">
                                    <div className="flex items-center justify-center">
                                        <UpdateButton
                                            clickUpdate={() => {
                                                setEditingCategoryId(category._id);
                                                handleDisplayUpdateCategory()
                                            }}
                                        />
                                        <DeleteButton_square titleDelete="Xóa danh mục" clickDelete={() => handleDeleteCategory(category._id)} />
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

export default Category;
