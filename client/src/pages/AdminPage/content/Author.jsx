import { useEffect , useState } from "react";
import DeleteButton_square from "../components/button/DeleteButton_square";
import UpdateButton from "../components/button/UpdateButton";
import AddButton from "../components/button/AddButton";
import AddForm from "../components/form/AddForm";
import { GetDataAuthor , GetNameBookInAuthor ,DeleteAuthor ,AddAuthor } from "../service/authorService";
import Success from "@components/notification/Success";
import Error from "@components/notification/Error";
const Author = () => {
    const [author, setAuthor] = useState([]);
    const [bookInAuthor,setBookInAuthor] = useState([]);
    const [showFormAddAuthor,setShowFormAddAuthor] = useState(false);
   const [nameAuthor , setNameAuthor] = useState("");
  const [showSucessAdd,setShowSuccessAdd] = useState(false);
  const [showSucessDelete,setShowSuccessDelete] = useState(false);
  const [showErrorDelete, setShowErrorDelete] = useState(false);

  const [showErrorValidateForm,setShowErrorValidateForm] = useState(false);
  const [successAuthors, setSuccessAuthors] = useState([]);


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
    useEffect(() => {   
        getCategory();
    }, []);

    const handleAddAuthor = async () => {
        try {
            const data = {
                name: nameAuthor
            }
            if(nameAuthor === ""){
                return setShowErrorValidateForm(true)
            }
            await AddAuthor(data);
            setNameAuthor("");
            setSuccessAuthors([...successAuthors, nameAuthor]);
            getCategory();
            setShowSuccessAdd(true);
            setTimeout(() => {setShowSuccessAdd(false) , setShowFormAddAuthor(false) }, 500)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteAuthor = async (id) => {
        try {
            const authorContainsProducts = bookInAuthor[id] && bookInAuthor[id].length > 0;
            if (!authorContainsProducts) {
                await DeleteAuthor(id);
                setAuthor(author.filter(author => author._id !== id));
                setShowSuccessDelete(true)
            } else {
                setShowErrorDelete(true)
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (showSucessDelete) {
            setTimeout(() => {
                setShowSuccessDelete(false);
            }, 3000);
        } else if (showErrorDelete) {
            setTimeout(() => {
                setShowErrorDelete(false);
            }, 3000);
        }
    }, [showSucessDelete, showErrorDelete]);

    return (
        <>
         { showSucessAdd && <Success message={'Thêm thành công'}/>}
         { showErrorValidateForm && <Error message={"Vui lòng nhập Tác Giả"}/>}
         {showSucessDelete &&  <Success message={'Xóa Thành Công '}/>}
         { showErrorDelete && <Error message={"Không thể xóa vì tác giả có chứa sản phẩm"}/>}
              {showFormAddAuthor && (
                <div className="w-[300px] h-auto fixed shadow left-[45%] p-5 z-[10] bg-white rounded-md">
                    <AddForm
                        placeholder="Nhập Tên Tác Giả"
                        titleForm="Thêm Tác Giả"
                        onClick={()=>setShowFormAddAuthor(false)}
                        onSubmit={handleAddAuthor}
                        value={nameAuthor}
                        onChange={(e) => setNameAuthor(e.target.value)}
                        nameClick="Thêm Tác Giả"
                    />
                </div>
            )}
          <div  className="overflow-y-auto h-[640px] scrollbar-thin">
          <table className="w-full">
                <thead className="bg-gray-100 h-16">
                    <tr>
                        <th className="text-left px-4">Tên Tác Giả</th>
                        <th className="text-left px-4">Sách</th>
                        <th className="px-4 py-2" colSpan="4">
                            <AddButton
                                nameButton="Thêm Danh Tác giả"
                                click={()=>{setShowFormAddAuthor(true)}}
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
                                    <DeleteButton_square titleDelete="Xóa tác giả" clickDelete={() => handleDeleteAuthor(author._id)}/>
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