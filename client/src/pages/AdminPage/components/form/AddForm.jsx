
const AddForm = (props) => {
    const { onClick, onSubmit, value, onChange, nameClick, titleForm ,placeholder } = props;
    return (
        <>
            <h1 className="py-2 text-center font-semibold">{titleForm}</h1>
            <input
                placeholder={placeholder}
                className="border w-full p-2 mb-2 rounded-md"
                type="text"
                value={value}
                onChange={onChange}
            />
            <button onClick={onSubmit} className="block w-full bg-blue-500 hover:bg-blue-600 duration-200 text-white font-medium rounded-md p-2 mb-2">{nameClick}</button>
            <button onClick={onClick} className="block w-full bg-red-500 hover:bg-red-600 duration-200 ease-in text-white font-medium rounded-md p-2 ">Hủy</button>
        </>
    );
};

export default AddForm;
