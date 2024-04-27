import BookSuggestUi from '../BookSuggestUi';
const ListBookSuggest = () => {
    return (
        <div className="bg-black w-full h-auto px-10 py-5 max-lg:p-1">
            <h1 className="text-white text-[27px] font-bold py-3 w-1/2 pl-[15px] max-lg:text-[25px]">Sách đề xuất</h1>
            <div className="relative w-full overflow-hidden ">
                <BookSuggestUi />
            </div>
        </div>
    );
};

export default ListBookSuggest;
