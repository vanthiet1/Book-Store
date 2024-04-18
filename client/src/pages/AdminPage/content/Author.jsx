import { useEffect , useState } from "react";
import DeleteButton_square from "../components/button/DeleteButton_square.jsx";
import UpdateButton from "../components/button/UpdateButton.jsx";
import AddButton from "../components/button/AddButton.jsx";
import { GetDataAuthor , GetNameBookInAuthor ,DeleteAuthor } from "../service/authorService.jsx";
const Author = () => {
    const [author, setAuthor] = useState([]);
    const [bookInAuthor,setBookInAuthor] = useState([]);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await GetDataAuthor();
                setAuthor(response);
                const data = await GetNameBookInAuthor(response);
                setBookInAuthor(data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategory();
    }, []);

    // const handleAddAuthor = async () => {
    //     try {
    //         const data = {
    //             name: nameCategory
    //         }
    //         await AddCategory(data);
    //         const updatedCategoryList = await GetDataCategory();
    //         setCategory(updatedCategoryList);
    //         setNameCategory("")
    //         handleHideDisplayAddCategory()
    //         setShowSuccessAdd(true)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <>
          <div className="overflow-y-auto h-[640px] scrollbar-thin">
          <table className="w-full">
                <thead className="bg-gray-100 h-16">
                    <tr>
                        <th className="text-left px-4">Tên Tác Giả</th>
                        <th className="text-left px-4">Sách</th>
                        <th className="px-4 py-2" colSpan="4">
                            <AddButton
                                nameButton="Thêm Danh Tác giả"
                                click={""}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                   {author && author.map((author,index)=>(  
                        <tr className="border-b border-gray-200" key={index} >
                            <td className="text-left px-4 py-2">  {author.name ? author.name : "Đang tải"}</td>
                            <td className="text-left px-4 py-2">
                            {bookInAuthor[author._id]?.map((bookName, index) => (
                                    <div key={index}>Tên - {bookName ? bookName : (<span>Đang tải danh mục....</span>)}</div>
                                ))}
                            </td>

                            <td className="px-4 py-2">
                                <div className="flex items-center justify-center">
                                    <UpdateButton
                                        clickUpdate={''}
                                    />
                                    <DeleteButton_square titleDelete="Xóa tác giả" clickDelete={() => DeleteAuthor(author._id)}/>
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

export default Author;