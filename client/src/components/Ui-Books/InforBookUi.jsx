import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import ReadBookUi from "../button-ui/ReadBookUi";


const Infor = (props) => {
    const {onClick,  imgBook, nameBook, author, labelBook, descriptionBook, bookId } = props;
    return (
        <>
            <div onClick={onClick} className={` bg-[#1a1a1c] w-[104%] h-[auto]  rounded-[10px]  blur-[0.5px] overflow-hidden p-4 px-4 backdrop-filter backdrop-blur-xl backdrop-saturate-150 backdrop-grayscale-50  `}>
                <Link to={`/ebook/${bookId}`}>
                    <div className="w-[700px] flex items-center gap-4 ">
                        <img loading="lazy" className="rounded-[10px] w-[250px] h-[350px] object-cover" src={imgBook} alt="" />
                        <div className="w-full">
                            <h1 className="text-white font-bold cursor-pointer text-[14px] w-[80%] py-4">{nameBook} </h1>
                            <span className="text-white">{author}</span>
                            <div className="flex w-full justify-between items-center gap-2 py-5">
                                <div className="flex w-full justify-between gap-3 items-center">
                                    <div>
                                        <span className="text-[#26D99A] font-bold block w-max">{labelBook}</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <ReadBookUi bgStatus={"bg-[#1f6f5b]"} content={"Đọc sách"} />
                                        <button aria-label="Like" className="bg-[#272729] opacity-[0.8]  flex items-center justify-center rounded-full w-[50px] h-[50px] text-white hover:bg-[#373739] ">
                                            <CiHeart className="text-[40px]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-white">
                                <p className="w-[450px] line-clamp-3">{descriptionBook ? descriptionBook : "Mô tả sách tạm thời chưa được cập nhật."} </p>
                            </div>
                            <div>
                                <span className="text-green-600 font-bold">Chi tiết</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Infor;