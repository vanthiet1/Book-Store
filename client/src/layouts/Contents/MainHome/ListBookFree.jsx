import BookFreeUi from "../BookFreeUi";
const ListBookFree = () => {
    return (
        <div className="bg-black w-full h-auto p-10">
            <h1 className="text-white text-[27px] font-bold py-3 w-1/2 pl-[15px]">Sách miễn phí</h1>
            <div className="relative w-full overflow-hidden ">
                <BookFreeUi />
            </div>
        </div>
    );
};

export default ListBookFree;
