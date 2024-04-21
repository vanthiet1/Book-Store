import { useEffect, useState, useContext } from "react";
import AddButton from "../components/button/AddButton";
import CheckButton from "../components/button/CheckButton";
import DeleteButton_square from "../components/button/DeleteButton_square";
import UpdateButton from "../components/button/UpdateButton";
import { GetDataBook, GetNameCategory, DeleteAbook, GetDescription } from "../service/productService";
import DecriptionBook from "../components/product/DecriptionBook";
import AddProductForm from "../components/product/AddProductForm";

import { GetDataAuthor } from "../service/authorService";
import { GetDataCategory } from '../service/categoryService';
import { GetDataGenres } from "../service/genresService";

import { DisplayPopup } from "../contexts/UiContextAdmin";
import { FormatCurrency } from "../Utils/formatCurrency";
import EditProductForm from "../components/product/EditProductForm";

import Success from "@components/notification/Success";
const Product = () => {
  const [dataBook, setDataBook] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [descriptionBook, setDescriprionBook] = useState([]);
  const [editingProductId, setEditingProductId] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listGenres, setListGenres] = useState([]);
  const [listAuthors, setListAuthors] = useState([]);


  const { handleDisplayDescriptionBook, handleHideDescriptionBook, handleDisplayFormAddBook, handleHideFormAddBook } = useContext(DisplayPopup);
  const { showFormAddBookAdmin, showFormDescriptionBookAdmin } = useContext(DisplayPopup);
  const { showFormEditBookAdmin, handleDisplayEditBook ,handleHideEditBook } = useContext(DisplayPopup);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await GetDataBook();
        setDataBook(booksData);
        const names = {};
        await Promise.all(
          booksData.map(async (book) => {
            const categoryName = await GetNameCategory(book.categoryProduct);
            names[book._id] = categoryName;
          })
        );
        setCategoryNames(names);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteBook = async (id) => {
    try {
      await DeleteAbook(id);
      setDataBook(dataBook.filter(dataBook => dataBook._id !== id));
      setShowSuccessDelete(true)

    } catch (error) {
      console.error(error);
    }
  }

  const getDescription = async (idBook) => {
    try {
      const dataDescription = await GetDescription(idBook);
      setDescriprionBook(dataDescription.descriptionBook)
    } catch (error) {
      console.log(error);
    }
  }

  const handleOutsideClick = () => {
    handleHideDescriptionBook();
  };

  useEffect(() => {
    const callDataApi = async () => {
      try {
        const dataCategory = await GetDataCategory();
        const dataGenres = await GetDataGenres();
        const dataAuthor = await  GetDataAuthor();
        setListCategory(dataCategory);
        setListGenres(dataGenres)
        setListAuthors(dataAuthor)
      } catch (error) {
        console.log(error);
      }
    }
    callDataApi()
  }, [])
  // 
  const handleAddBookSuccess = (newBook) => {
    setDataBook([...dataBook, newBook]);
  }


  return (
    <>
      {showFormDescriptionBookAdmin && (
        <>
          <div className=" fixed left-[35%] z-[10]" onClick={handleOutsideClick}>
            <DecriptionBook description={descriptionBook ? descriptionBook : "Mô tả sách tạm thời chưa có"} />
          </div>
        </>
      )}

      {showFormEditBookAdmin && dataBook && dataBook.map((book,index) => (
        editingProductId === book._id && (
          <div className=" fixed left-[35%] z-[10] top-[20px]" key={index._id} >
           <EditProductForm
             book={book} //
             onClick={book._id}
             clickClose={handleHideEditBook} 
             bookId={book._id}   
             categories={listCategory} 
             genres={listGenres} 
             key={book._id}
          />
          </div>
        )
      ))}
      {showFormAddBookAdmin && (
        <>
          <div className=" fixed left-[35%] z-[10] top-[0px] " >
            <AddProductForm
             onAddBookSuccess={handleAddBookSuccess} 
             clickClose={handleHideFormAddBook} 
             categories={listCategory} 
             genres={listGenres} 
              authors={listAuthors}
             />
          </div>
        </>
      )}
      <div className="overflow-y-auto h-[640px] scrollbar-thin">
        <table className="w-full"  >
          <thead className="bg-gray-100 h-16">
            <tr>
              <th className="text-left px-4">Tên</th>
              <th className="text-left px-4">Nhãn</th>
              <th className="text-left px-4">Ảnh</th>
              <th className="text-left px-4">Tác giả</th>
              <th className="text-left px-4">Nhà xuất bản</th>
              <th className="text-left px-4">Thể loại</th>
              <th className="text-left px-4">Danh mục</th>
              <th className="text-left px-4">Giá tiền</th>

              <th className="pr-5 py-2  text-right" colSpan="10">
                <AddButton
                  nameButton="Thêm Sách"
                  click={() => { handleDisplayFormAddBook() }}
                />
              </th>
            </tr>
          </thead>
          <tbody >
            {showSuccessDelete && <Success message="Xóa Sản Phẩm Thành Công" />}
            {dataBook.map((book, index) => (
              <tr className="border-b border-gray-200" key={index}>
                <td className="text-left px-4 py-2">{book.nameBook}</td>
                <td className="text-left px-4 py-2">{FormatCurrency(book.labelBook && book.labelBook)}</td>
                <td className="text-left px-4 py-2">
                  <img
                    className="w-[60px] rounded-[10px]"
                    src={book.imgBook}
                    alt={book.imgBook}
                  />
                </td>

                <td className="text-left px-4 py-2">{book.author[0].name}</td>
                <td className="text-left px-4 py-2">{book.publishingCompany}</td>
                <td className="text-left px-4 py-2">
                  {book.genres[0].name}
                </td>
                <td className="text-left px-4 py-2">  {categoryNames[book._id] ? categoryNames[book._id] : <span>Đang tải...</span>}</td>
                <td className="text-left px-4 py-2">{book.price} VND</td>

                <td className="px-4 py-2"></td>
                <td className="text-left py-2"></td>
                <td className="text-left py-2"></td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center">
                    <CheckButton clickCheck={() => {
                      getDescription(book._id)
                      handleDisplayDescriptionBook()
                    }} />

                    <UpdateButton clickUpdate={() => {
                      setEditingProductId(book._id);
                      handleDisplayEditBook()
                    }} />
                    <DeleteButton_square titleDelete="Xóa Sách" clickDelete={() => deleteBook(book._id)} />
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

export default Product;
