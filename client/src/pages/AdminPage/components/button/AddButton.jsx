
const AddButton = (props) => {
    const { nameButton, click } = props;
    return (
        <>
            <button onClick={click} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none">
                {nameButton}
            </button>
        </>
    );
};

export default AddButton;