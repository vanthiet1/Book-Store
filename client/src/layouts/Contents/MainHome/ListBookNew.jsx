import BookNewUi from "../BookNewUi";
const ListBookNew = () => {
    return (
        <div className="bg-black w-full h-auto p-10">
            <h1 className="text-white text-[27px] font-bold py-3 w-1/2 pl-[15px]">Sách mới nhất</h1>
            <div className="relative w-full overflow-hidden ">
            <BookNewUi/>
            </div>
        </div>
    );
};

export default ListBookNew;
