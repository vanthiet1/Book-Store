
const EditForm = (props) => {
    const { value, onChange, onClick ,placeholder} = props;
    return (
        <div>
            <input 
               className="block border rounded-md p-2 w-full mb-3"
               placeholder={placeholder}
                type="text"
                value={value}
                onChange={onChange}
            />
            <button onClick={onClick} className="w-full bg-blue-500 text-[#fff] p-3 rounded-md">Cập nhật</button>
        </div>
    );
};

export default EditForm;
