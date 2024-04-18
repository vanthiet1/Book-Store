import { useState } from "react";
import TextSkeletion from "../../../components/skeletion-ui/DetailBoook/TextSkeletion";
import { GetDetailBookFree } from "../../../services/books/BookDetailService";
const DescriptionBook = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const BookData = GetDetailBookFree();
    return (
        <>
               <p className={`text-white block tracking-wider ${isExpanded ? 'overflow-visible' : 'overflow-hidden h-[215px]'}`}>
                            {BookData && BookData.descriptionBook ? (
                                <>
                                    {isExpanded ? (
                                        BookData.descriptionBook
                                    ) : (
                                        <>
                                            {BookData.descriptionBook.slice(0, 500)}
                                            <span
                                                className="cursor-pointer text-blue-500"
                                                onClick={handleToggleExpand}
                                            >
                                                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                                            </span>

                                        </>

                                    )}
                                    {isExpanded && (
                                        <span
                                            className="cursor-pointer text-blue-500"
                                            onClick={handleToggleExpand}
                                        >
                                            Thu gọn
                                        </span>
                                    )}
                                </>
                            ) : (
                                <TextSkeletion height="h-[200px]" width="w-[500px]" />
                            )}

                        </p>
        </>
    );
};

export default DescriptionBook;