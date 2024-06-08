
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TiChevronRight } from "react-icons/ti";
import { useContext } from "react";
import { GetDetailBookFree } from "../../../services/books/BookDetailService";
import BookUi from "@components/Ui-Books/BookUi";
import ReadBookUi from "@components/button-ui/ReadBookUi";

import ButtonHeart from "@components/button-ui/ButtonHeart";
import ButtonShare from "@components/button-ui/ButtonShare";

import ImageSkeletion from "@components/skeletion-ui/DetailBoook/ImageSkeletion";
import TextSkeletion from "@components/skeletion-ui/DetailBoook/TextSkeletion";
import ButtonComment from "@components/button-ui/ButtonComment";
import { IoBookOutline } from '@components/icons/Book';
import Success from "@components/notification/Success";
import DescriptionBook from "./DescriptionBook";
import { Uicontext } from "../../../contexts/UiContext";
import CommnentUser from "./CommnentUser";
import { UseCart } from "../../../contexts/CartContext";

import BookSuggestUi from "../BookSuggestUi";
import BookFreeUi from "../BookFreeUi";
import BookNewUi from "../BookNewUi";

const InforDetail = () => {
    const { id } = useParams();
    const { handleDisplayComment , scrollTop} = useContext(Uicontext);
    const { addToCart } = UseCart();
    const [showSuccess, setSuccess] = useState(false);
    

    const dataBookDetailFree = GetDetailBookFree(id);
    const [skeletonImage, setSkeletonImage] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setSkeletonImage(false);
        }, 500);
    }, [dataBookDetailFree]);

    useEffect(() => {
        if (dataBookDetailFree) {
            document.title = `${dataBookDetailFree.nameBook || 'Loading...'}`;
        }
    }, [dataBookDetailFree]);

    const handleAddToCart = () => {
        if (!dataBookDetailFree) return;
        const product = {
            productId: dataBookDetailFree._id,
            imgBook: dataBookDetailFree.imgBook,
            name: dataBookDetailFree.nameBook,
            price: dataBookDetailFree.isFree ? 0 : dataBookDetailFree.price,
            quantity: 1,
        };
        addToCart(product);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 500);
    };
    useEffect(() => {
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }, [scrollTop]);
    
    return (
        <>
            {showSuccess && (<Success message="Đã thêm vào giỏ hàng" />)}
            <div className="flex items-center pb-3 pl-2 gap-2 max-md:p-0">
                <Link to={'/'}>
                    <span className="text-white font-semibold text-[13px]">Trang chủ</span>
                </Link>
                <span>
                    <TiChevronRight className="text-white font-semibold text-[13px]" />
                </span>
                <span className="text-white font-semibold text-[13px]">
                    {dataBookDetailFree ? dataBookDetailFree.nameBook : <TextSkeletion height="h-5" width="w-[250px]" />}
                </span>
            </div>
            <div className="flex gap-5 justify-start max-md:flex-col">
                <div className="w-[27%] p-2">
                    {skeletonImage ? (
                        <ImageSkeletion />
                    ) : (
                        <>
                            {dataBookDetailFree && (
                                <BookUi                                         
                                    bgLabel={dataBookDetailFree.isFree === true ? "bg-[#26D99A]" : 'bg-[#f645B3]'}
                                    imgBook={dataBookDetailFree.imgBook}
                                    labelBook={dataBookDetailFree.isFree ? dataBookDetailFree.labelBook : dataBookDetailFree.price.toLocaleString() + " VND"}
                                    width="w-[100%]"
                                />
                            )}
                        </>
                    )}
                </div>
                <div className="w-[80%] p-1 pl-[20px] relative overflow-scroll h-[600px] scroll-content-detail max-md:w-full max-md:px-5">
                    <h1 className="text-[35px] text-white font-bold w-[700px] max-md:text-[16px] max-md:w-[250px]">
                        {dataBookDetailFree ? dataBookDetailFree.nameBook : <TextSkeletion height="h-6" width="w-[650px]" />}
                    </h1>
                    <div className="flex items-center gap-3 max-md:py-3">
                        <div className="flex gap-2">
                            <span className="text-white">5.0</span>
                            <img loading="lazy" src="https://res.cloudinary.com/dz93cdipw/image/upload/v1713802129/Book-Store/Icon/icon-star.svg" alt="Star" />
                        </div>
                        <span className="text-white">5 đánh giá</span>
                    </div>

                    <div className="flex justify-between w-[40%] max-lg:w-[400px]max-md:flex-col max-md:w-full">
                        <div>
                            <span className="block text-[#959695] font-semibold">Tác giả</span>
                            <span className="text-white block">
                                {dataBookDetailFree && dataBookDetailFree.author ? dataBookDetailFree.author[0].name : <TextSkeletion height="h-5" width="w-[100px]" />}
                            </span>
                        </div>

                        <div >
                            <span className="block text-[#959695] font-semibold">Thể Loại</span>
                            <span className="text-white block">
                                {dataBookDetailFree && dataBookDetailFree.genres ? dataBookDetailFree.genres[0].name : <TextSkeletion height="h-5" width="w-[100px]" />}
                            </span>
                        </div>

                    </div>

                    <div className="flex justify-between w-[30%] pt-2 max-lg:w-[330px]  max-md:w-full">
                        <div>
                            <span className="block text-[#959695] font-semibold">Nhà xuất bản</span>
                            <span className="text-white block">
                                {dataBookDetailFree && dataBookDetailFree.publishingCompany ? dataBookDetailFree.publishingCompany : <TextSkeletion height="h-5" width="w-[100px]" />}
                            </span>
                        </div>
                        <div>
                            <span className="block text-[#959695] font-semibold">Gói cước</span>
                            <span className="text-white block">
                                {dataBookDetailFree ? (
                                    dataBookDetailFree.isFree ? (
                                        dataBookDetailFree.labelBook
                                    ) : (
                                        dataBookDetailFree.price.toLocaleString() + " VND"
                                    )
                                ) : (
                                    <TextSkeletion height="h-5" width="w-[100px]" />
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="w-[60%] h-[1px] bg-[#2A443F] mt-2"></div>
                    <div className="flex py-5 gap-5">
                        <ReadBookUi content={"Đọc Sách"} icon={<IoBookOutline />} bgStatus={' bg-[#139F7B]'} />
                        {dataBookDetailFree && dataBookDetailFree.isFree === false ? (
                            <ReadBookUi addToCart={() => handleAddToCart()} content={"Thêm giò hàng"} icon={<FaShoppingCart />} bgStatus={' bg-[#F94D17]'} />
                        ) : (
                            <ReadBookUi content={dataBookDetailFree && dataBookDetailFree.labelBook ? dataBookDetailFree.labelBook : <TextSkeletion height="h-5" width="w-[100px]" />} icon={<IoBookOutline />} bgStatus={' bg-[#139F7B]'} />
                        )}
                        <ButtonHeart />
                        <ButtonShare />
                    </div>
                    <div className="max-w-[500px]">
                        <DescriptionBook />
                    </div>
                    <div className="pt-[40px]">
                        <h1 className="text-white text-[25px] max-md:text-[20px]">
                            Độc giả nói gì về  {dataBookDetailFree ? `" ${dataBookDetailFree.nameBook} "` : <TextSkeletion height="h-6" width="w-[650px]" />}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 border-b-1 w-[60%] border-b-1 pb-4 max-md:w-full max-md:gap-5 max-md:pt-4">
                        <span className={`text-white text-[17px] font-semibold cursor-pointer`}>Bình luận</span>
                        <ButtonComment
                            showComment={handleDisplayComment}
                            content={"Viết bình luận"}
                            icon={<FaRegPenToSquare className="text-[20px]" />}
                        />
                    </div>
                    <div className="pt-2">
                        <CommnentUser />
                    </div>
                </div>
            </div>
            <div>
                <h1 className="p-5 text-[#fff] text-[30px]">Những sách liên quan</h1>
                {dataBookDetailFree && dataBookDetailFree.isFree ? (
                    <>
                        <BookFreeUi />
                        <BookSuggestUi />
                    </>
                ) : (
                    <>
                        <BookNewUi />
                        <BookSuggestUi />
                    </>
                )}
            </div>
        </>
    );
};

export default InforDetail;

