import { TiDelete } from "react-icons/ti";
import { useState, useContext } from "react";
import { AddBook } from "../../service/productService";
import Success from "../../../../components/notification/Success";
import { DisplayPopup } from "../../contexts/UiContextAdmin";
const AddProductForm = (props) => {

    const { clickClose, categories, onAddBookSuccess, genres , authors } = props;
    const { handleHideFormAddBook } = useContext(DisplayPopup)

    const [nameBook, setNameBook] = useState("");
    const [labelBook, setLabelBook] = useState("");
    const [imgBook, setImgBook] = useState("");
    const [price, setPriceBook] = useState(0);
    const [isFree, setIsFree] = useState(false);
    const [author, setAuthor] = useState("");
    const [publishingCompany, setPublishingCompany] = useState("");
    const [categoriesInput, setCategoriesInput] = useState("");
    const [descriptionBook, setDescriptionBook] = useState("");
    const [categoryProduct, setCategoryProduct] = useState("");
    const [showSuccessAddBook, setShowSuccessAddBook] = useState(false)
    const handleAddBook = async () => {
        try {
            const dataToSend = {
                labelBook,
                imgBook,
                nameBook,
                descriptionBook,
                price,
                isFree,
                author: {
                    name: author
                },
                publishingCompany,
                categories: [{ name: categoriesInput }],
                categoryProduct
            };
            setShowSuccessAddBook(true);

            if (dataToSend) {
                const response = await AddBook(dataToSend);
                if (response._id) {
                    onAddBookSuccess(response);
                    handleHideFormAddBook();
                    
                }
            }

        } catch (error) {
            console.error('Error adding book:', error);
        }
    };
    return (
        <>
            {showSuccessAddBook && <Success message="Thêm Sách Thành Công" />}
            <div className="w-[500px] bg-[#fff] box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; px-5 py-2 rounded-md">
                <div className="flex justify-end">
                    <TiDelete onClick={clickClose} className="bg-red-500 text-[#fff] rounded-full w-[20px] h-[20px] cursor-pointer" />
                </div>
                <h1 className="text-[25px] font-semibold text-center">Thêm sách</h1>
                {/* name book */}
                <input onChange={(e) => setNameBook(e.target.value)} type="text" name="nameBook" placeholder="Nhập tên sách" className="w-full p-2 rounded-md border mb-3" />
                {/* nhãn sách */}
                <input onChange={(e) => setLabelBook(e.target.value)} type="text" name="labelBook" placeholder="Nhập Nhãn" className="w-full p-2 rounded-md border mb-3" />
                {/* ảnh sách */}
                <input onChange={(e) => setImgBook(e.target.value)} type="text" name="imgBook" className="w-full p-2 rounded-md border mb-3" />
                {/* Giá tiền */}
                <input onChange={(e) => setPriceBook(e.target.value)} placeholder="Nhập giá tiền"  type="number" name="priceBook" className="w-full p-2 rounded-md border mb-3"  />
                {/* tác giả */}
               
                <select onChange={(e) => setAuthor(e.target.value)} name="setCategoriesInput" className="w-full border p-2 rounded-md  mb-3">
                    <option value="">Chọn tác giả</option>
                    {authors.map((author, index) => (
                        <option key={index} value={author.name}>{author.name}</option>
                    ))}
                </select>
                {/* nhà xuất bản */}
                <input onChange={(e) => setPublishingCompany(e.target.value)} type="text" name="publishingCompany" placeholder="Nhập nhà xuất bản" className="w-full p-2 rounded-md border mb-3" />
                {/* thể loại sách */}
                {/* <input onChange={(e) => setCategoriesInput(e.target.value)} type="text" name="categories" placeholder="Nhập thể loại" className="w-full p-2 rounded-md border mb-3" /> */}
                <select onChange={(e) => setCategoriesInput(e.target.value)} name="setCategoriesInput" className="w-full border p-2 rounded-md  mb-3">
                    <option value="">Chọn thể loại</option>
                    {genres.map((genres, index) => (
                        <option key={index} value={genres.name}>{genres.name}</option>
                    ))}
                </select>
                {/* mô tả sách */}
                <textarea onChange={(e) => setDescriptionBook(e.target.value)} name="descriptionBook" placeholder="Nhập Mô Tả Sách" className="w-full p-2 rounded-md border mb-3" />

                {/* chọn danh mục */}
                <select onChange={(e) => setCategoryProduct(e.target.value)} name="selectedCategory" className="w-full border p-2 rounded-md  mb-3">
                    <option value="">Chọn danh mục</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category._id}>{category.name}</option>
                    ))}
                </select>
                {/* chọn trạng thái miễn phí hay có phí */}
                <select
                    value={isFree}
                    onChange={(e) => setIsFree(e.target.value)}
                    className="w-full border p-2 rounded-md  mb-3"
                >
                    <option value={false}>Có Phí</option>
                    <option value={true}>Miễn Phí</option>
                </select>
                <button onClick={handleAddBook} className="w-full bg-blue-500 text-[#fff] font-medium p-2 rounded-md hover:bg-blue-600 duration-200 ease-in mt-[15px]">
                    Thêm sách
                </button>
                <button onClick={clickClose} className="w-full bg-red-500 text-[#fff] font-medium p-2 rounded-md hover:bg-red-600 duration-200 ease-in mt-[5px]">
                    Hủy
                </button>
            </div>
        </>

    );
};

export default AddProductForm;
