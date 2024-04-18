
const ButtonComment = (props) => {
    const { content, icon, showComment } = props
    return (
        <>
            <button onClick={showComment} className="bg-[#139F7B] text-white p-1 rounded-full w-[160px] py-1 text-[15px] hover:bg-[#1f6f5b]
                                ease-in duration-200 flex gap-2 items-center justify-center h-[50px]">
                {icon}
                <span className="font-">{content}</span>
            </button>
        </>
    );
};

export default ButtonComment;