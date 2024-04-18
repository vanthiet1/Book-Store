
const ButtonDefault = (props) => {
    const {onClick , content , bgBtn} = props;
    return (
        <>
                 <button onClick={onClick} className={`text-[#fff] ${bgBtn} rounded-full p-2 px-3`}>{content}</button>
        </>
    );
};

export default ButtonDefault;