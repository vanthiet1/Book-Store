import { useEffect, useState, useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { getNameBookInGenres } from "../service/getInforBook";
import { GetDataGenres } from "../service/genresService";
import { AddGenres, DeleteGenres } from "../service/genresService";
import { UpdateGenres } from "../service/genresService";

import AddButton from "../components/button/AddButton";
import UpdateButton from "../components/button/UpdateButton";
import DeleteButton_square from "../components/button/DeleteButton_square";
import { DisplayPopup } from "../contexts/UiContextAdmin";
import AddForm from "../components/form/AddForm";
import EditForm from "../components/form/EditForm";

import Error from "@components/notification/Error";
import Success from "@components/notification/Success";
const Genres = () => {
    const {
        showFormGenresBookAdmin,
        // handle click
        handleHideGenresBook,
        handleDisplayGenresBook,
        showFormUpdateGenresBookAdmin,
        handleHideFormUpdateGenresBook,
        handleDisplayFormUpdateGenresBook,
    } = useContext(DisplayPopup);
    const [genres, setGenres] = useState([]);
    const [nameGenres, setNameGenres] = useState("");
    const [editingGenresId, setEditingGenresId] = useState(null);

    const [nameBooksInGenres, setNameBooksInGenres] = useState({});
    const [showSuccessAdd, setShowSuccessAdd] = useState(false);
    const [showSuccessDelete, setShowSuccessDelete] = useState(false);
    const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const getGenres = async () => {
            try {
                const response = await GetDataGenres();
                setGenres(response);
                const data = await getNameBookInGenres(response);
                setNameBooksInGenres(data);
            } catch (error) {
                console.log(error);
            }
        }
        getGenres();
    }, []);
    const handleAddGenres = async () => {
        try {
            const data = {
                name: nameGenres
            }
            await AddGenres(data);
            const updatedCategoryList = await GetDataGenres();
            setGenres(updatedCategoryList);
            setNameGenres("")
            handleHideGenresBook()
            setShowSuccessAdd(true)
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteGenres = async (id) => {
        try {
            // const categoryContainsProducts = booksInCategories[id] && booksInCategories[id].length > 0;
            await DeleteGenres(id);
            setGenres(genres.filter(category => category._id !== id));
            setShowSuccessDelete(true)

        } catch (error) {
            setShowError(true)
            console.error(error);

        }
    }
    const handleUpdateGenres = async (id) => {
        try {
            const data = {
                name: nameGenres,
            }
            await UpdateGenres(id, data);
            const updatedGenresList = await GetDataGenres();
            setGenres(updatedGenresList);
            handleHideFormUpdateGenresBook()
            setShowSuccessUpdate(true)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {showFormGenresBookAdmin && (
                <div className="w-[300px] h-auto fixed shadow left-[45%] p-5 z-[10] bg-white rounded-md">
                    <AddForm
                        placeholder="Nhập tên thể loại"
                        titleForm="Thêm thể loại"
                        onClick={handleHideGenresBook}
                        onSubmit={handleAddGenres}
                        value={nameGenres}
                        onChange={(e) => setNameGenres(e.target.value)}
                        nameClick="Thêm"
                    />
                </div>
            )}
            {showFormUpdateGenresBookAdmin && (
                <div className="w-[300px] h-auto fixed shadow left-[45%] p-5 z-[10] bg-white rounded-md">
                    <div className="flex justify-end">
                        <TiDelete onClick={handleHideFormUpdateGenresBook} className="bg-red-500 text-[#fff] rounded-full w-[20px] h-[20px] cursor-pointer" />
                    </div>
                    <h1 className="text-center py-2">Chỉnh sửa danh mục</h1>
                    <div>

                        {genres && genres.map((genresItem, index) => (
                            editingGenresId === genresItem._id && (
                                <>
                                    <EditForm
                                        placeholder="Nhập Tên Thể Loại Cần Sửa"
                                        key={index}
                                        value={nameGenres}
                                        onChange={(e) => setNameGenres(e.target.value)}
                                        onClick={() => handleUpdateGenres(genresItem._id)}
                                    />
                                </>
                            )

                        ))}
                    </div>
                </div>
            )}

            {showSuccessAdd && <Success message="Thêm Thể Loại Thành Công" />}
            {showError && <Error message="Không Thể Xóa Thể Loại Vì Đang Chứa Sản Phẩm" />}
            {showSuccessDelete && <Success message="Xóa Thể Loại Thành Công" />}
            {showSuccessUpdate && <Success message="Cập Nhật Thể Loại Thành Công" />}

           <div className="overflow-y-auto h-[640px] scrollbar-thin">
           <table className="w-full">
                <thead className="bg-gray-100 h-16">
                    <tr>
                        <th className="text-left px-4">Thể Loại Sách</th>
                        <th className="text-left px-4">Sách</th>
                        <th className="px-4 py-2" colSpan="4">
                            <AddButton
                                nameButton={"Thêm Thể Loại"}
                                click={handleDisplayGenresBook}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {genres && genres.map((genres, index) => (
                        <tr className="border-b border-gray-200" key={index}>
                            <td className="text-left px-4 py-2">{genres.name}</td>

                           <td className="text-left px-4 py-2">
                                {nameBooksInGenres[genres._id]?.map((bookName, index) => (
                                    <div key={index}>Tên - {bookName ? bookName : (<span>Đang tải danh mục....</span>)}</div>
                                ))}
                            </td>
                            <td className="px-4 py-2">
                                <div className="flex items-center justify-center">
                                    <UpdateButton clickUpdate={() => {
                                        setEditingGenresId(genres._id)
                                        handleDisplayFormUpdateGenresBook()
                                    }} />
                                    <DeleteButton_square titleDelete="Xóa thể loại" clickDelete={() => handleDeleteGenres(genres._id)} />
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

export default Genres;