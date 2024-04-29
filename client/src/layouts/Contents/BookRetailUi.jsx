import { useState, useEffect } from 'react';
import { PropagateLoader } from "react-spinners";
import InforBookUi from '@components/Ui-Books/InforBookUi';
import Sliders from "@components/slider-books/Slider";
import BookUi from "@components/Ui-Books/BookUi";
import { GetInforBook, BookRetailApi } from '../../services/books/BookService';
import { FormatCurrency } from '../../pages/AdminPage/Utils/formatCurrency';
import { handleScrollToTop } from '~/components/animations/scroll/ScrollTop';
import { SizeBoxSlider } from '~/components/responsive/SizeBoxSlider';
const BookRetailUi = () => {
    const slidesToShow = SizeBoxSlider();
    const [dataBookFree, setDataBookFree] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookRetailData = await BookRetailApi();
                const bookDetails = await Promise.all(bookRetailData.map(async (idBook) => {
                    const data = await GetInforBook(idBook);
                    return data;
                }));
                setDataBookFree(bookDetails);
            } catch (error) {
                console.error('Error fetching free books data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <div className="relative max-w-[1500px] h-[auto] cursor-pointer px-3 flex" >
                <Sliders
                    slidesToShow={slidesToShow}
                    autoplaySpeed={5000}
                >
                    {dataBookFree.length > 0 ? (dataBookFree.map((bookFree) => (
                        <div className="relative group" key={bookFree._id}>
                            <BookUi    
                                 bookId={bookFree._id} 
                                bgLabel={bookFree.isFree === true ? " bg-[#27ad7c]" : 'bg-[#dd42a2]'}
                                imgBook={bookFree.imgBook}
                                labelBook={FormatCurrency(bookFree.isFree === false ? (bookFree.labelBook) + " VND" : (bookFree.labelBook)) }
                                nameBook={bookFree.nameBook}
                            />
                            <div className="absolute ease-in duration-300 top-[-1px] left-[-6px] opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-[10]">
                                <InforBookUi
                                    aria-hidden="true" 
                                    onClick={handleScrollToTop}
                                    bookId={bookFree._id}
                                    imgBook={bookFree.imgBook}
                                    nameBook={bookFree.nameBook}
                                    author={bookFree.author[0].name}
                                    labelBook={FormatCurrency(bookFree.isFree === false ? (bookFree.labelBook) + " VND" : (bookFree.labelBook)) }
                                    descriptionBook={bookFree.descriptionBook}
                                />
                            </div>
                        </div>
                    ))) : (
                        <div className="text-center mb-3">
                            <PropagateLoader color="#36d7b7" />
                        </div>
                    )}
                </Sliders>
            </div>
        </>
    );
};

export default BookRetailUi;
