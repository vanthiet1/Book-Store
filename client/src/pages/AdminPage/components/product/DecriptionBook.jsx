
const DescriptionBook = (props) => {
    const { description } = props;
    return (
        <div className=" w-[500px] h-[500px] overflow-auto bg-[#fff] box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; p-5 rounded-md">
         <div className="flex justify-end">
            
         </div>
        <h1 className="text-center font-semibold">Mô Tả Sách</h1>
            <p>{description}</p>
        </div>
    );
};

export default DescriptionBook;
