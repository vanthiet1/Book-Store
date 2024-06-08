import { PropagateLoader } from "react-spinners";
import { useState, useEffect } from 'react';
import InforBookUi from '../../components/Ui-Books/InforBookUi';
import Sliders from "../../components/slider-books/Slider";
import BookUi from "../../components/Ui-Books/BookUi";
import { GetInforBook, BookFreeApi } from "../../services/books/BookService";
import { SizeBoxSlider } from "~/components/responsive/SizeBoxSlider";
import { handleScrollToTop } from '~/components/animations/scroll/ScrollTop';
const BookFreeUi = () => {
    const [dataBookFree, setDataBookFree] = useState([]);
    const slidesToShow = SizeBoxSlider();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookFreeData = await BookFreeApi();
                const bookDetails = await Promise.all(bookFreeData.map(async (idBook) => {
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
            <div className="relative max-w-[1500px] h-[auto] cursor-pointer px-3 flex " >
                <Sliders
                    slidesToShow={slidesToShow}
                    autoplaySpeed={5000}
                >
                    {dataBookFree && dataBookFree.length > 0 ? (
                        dataBookFree.map((bookFree) => (
                            <div className="relative group flex " key={bookFree._id}>
                                <BookUi   
                                    bookId={bookFree._id}
                                    bgLabel={bookFree.isFree === true ? "bg-[#27ad7c]" : 'bg-[#dd42a2]'}
                                    imgBook={bookFree.imgBook ? bookFree.imgBook : <h1 className='text-white'>Đang tải...</h1>}
                                    labelBook={bookFree.labelBook}
                                    nameBook={bookFree.nameBook}
                                />
                                <div className="absolute ease-in duration-300 top-[-1px] left-[-6px] opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-[10]">
                                    <InforBookUi
                                       aria-hidden="true" 
                                        onClick={handleScrollToTop}
                                        bookId={bookFree._id}
                                        imgBook={bookFree.imgBook}
                                        nameBook={bookFree.nameBook}
                                        author={bookFree.author && bookFree.author.length > 0 ? bookFree.author[0].name : ''}
                                        labelBook={bookFree.labelBook}
                                        descriptionBook={bookFree.descriptionBook}
                                    />
                                </div>
                            </div>

                        ))
                    ) : (
                        <div className="text-center mb-3">
                            <PropagateLoader color="#36d7b7" />
                        </div>
                    )}
                </Sliders>
            </div>
        </>
    );
};

export default BookFreeUi;
