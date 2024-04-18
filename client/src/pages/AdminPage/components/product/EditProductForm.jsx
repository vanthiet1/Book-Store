import { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { UpdateBook } from "../../service/productService";
const EditProductForm = (props) => {
    const { categories, genres , clickClose, book , bookId   } = props;
    console.log(book);
    const [nameBook, setNameBook] = useState("");
    const [labelBook, setLabelBook] = useState("");
    const [imgBook, setImgBook] = useState("");
    const [priceBook, setPriceBook] = useState("");
    const [publishingCompany, setPublishingCompany] = useState("");
    const [categoriesBook, setCategories] = useState("");
    const [descriptionBook, setDescriptionBook] = useState("");
    const [categoryProduct, setCategoryProduct] = useState("");
    const [isFree, setIsFree] = useState(false); 
    // show value input
    useEffect(() => {
        if (book) {
            setNameBook(book.nameBook ? book.nameBook : null);
            setLabelBook(book.labelBook ? book.labelBook : null);
            setImgBook(book.imgBook ? book.imgBook : null);
            setPriceBook(book.price ? book.price : null);
            setPublishingCompany(book.publishingCompany ? book.publishingCompany : null);
            setCategories(book.genres[0].name ? book.genres[0].name : null);
            setDescriptionBook(book.descriptionBook ? book.descriptionBook : null);
            setCategoryProduct(book.categoryProduct ? book.categoryProduct : null);
            setIsFree(book.isFree || false);
        }
    }, [book]);

    const handleUpdateBook = async (categoryId) => {
        try {
          const data = {
            nameBook: nameBook,
            labelBook:labelBook,
            imgBook:imgBook,
            price:priceBook,
            publishingCompany:publishingCompany,
            categories:categoriesBook,
            descriptionBook:descriptionBook,
            categoryProduct:categoryProduct,
            isFree:isFree
          }
         const ok =   await UpdateBook(categoryId, data);   
         console.log(ok);
       
        } catch (error) {
          console.log(error);
        }
      }


    return (
        <div className="w-[500px] bg-[#fff] box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; px-5 py-2 rounded-md">
            <div className="flex justify-end">
                <TiDelete onClick={clickClose} className="bg-red-500 text-[#fff] rounded-full w-[20px] h-[20px] cursor-pointer" />
            </div>
            <h1 className="text-[25px] font-semibold text-center">Chỉnh sửa sách</h1>
            {/* Form inputs */}
            <input value={nameBook} onChange={(e) => setNameBook(e.target.value)} type="text" name="nameBook" placeholder="Nhập tên sách" className="w-full p-2 rounded-md border mb-3" />
            <input value={labelBook} onChange={(e) => setLabelBook(e.target.value)} type="text" name="labelBook" placeholder="Nhập Nhãn" className="w-full p-2 rounded-md border mb-3" />
            <input value={imgBook} onChange={(e) => setImgBook(e.target.value)} type="text" name="imgBook" className="w-full p-2 rounded-md border mb-3" />
            <input value={priceBook} onChange={(e) => setPriceBook(e.target.value)} placeholder="Nhập giá tiền" type="number" name="priceBook" className="w-full p-2 rounded-md border mb-3" />
            <input value={publishingCompany} onChange={(e) => setPublishingCompany(e.target.value)} type="text" name="publishingCompany" placeholder="Nhập nhà xuất bản" className="w-full p-2 rounded-md border mb-3" />

            <select value={categoriesBook} onChange={(e) => setCategories(e.target.value)} name="setCategoriesInput" className="w-full border p-2 rounded-md  mb-3">
                <option value="">Chọn thể loại</option>
                {genres.map((genre, index) => (
                    <option key={index} value={genre.name}>{genre.name}</option>
                ))}
            </select>
            
            <textarea value={descriptionBook} onChange={(e) => setDescriptionBook(e.target.value)} name="descriptionBook" placeholder="Nhập Mô Tả Sách" className="w-full p-2 rounded-md border mb-3" />

            <select value={categoryProduct} onChange={(e) => setCategoryProduct(e.target.value)} name="selectedCategory" className="w-full border p-2 rounded-md  mb-3">
                <option value="">Chọn danh mục</option>
                {categories.map((category, index) => (
                    <option key={index} value={category._id}>{category.name}</option>
                ))}
            </select>

            <select value={isFree} onChange={(e) => setIsFree(e.target.value)} className="w-full border p-2 rounded-md  mb-3">
                <option value={false}>Có Phí</option>
                <option value={true}>Miễn Phí</option>
            </select>
            {/* Buttons */}
            <button onClick={()=>{
                handleUpdateBook(bookId)
                clickClose()
            }} className="w-full bg-blue-500 text-[#fff] font-medium p-2 rounded-md hover:bg-blue-600 duration-200 ease-in mt-[15px]">
                Cập nhật sách
            </button>
            <button onClick={clickClose} className="w-full bg-red-500 text-[#fff] font-medium p-2 rounded-md hover:bg-red-600 duration-200 ease-in mt-[5px]">
                Hủy
            </button>
        </div>
    );
};

export default EditProductForm;
