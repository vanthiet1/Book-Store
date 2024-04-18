const TextSkeletion = (props) => {
    const {width,height,bg} = props;
    return (
        <>
            <span className={` ${bg} w-full mx-0 max-md:p-[5px] max-md:m-0 max-lg:grid block`}>
                <span className="h-max shadow-md rounded-md items-center w-full max-md:mr-0 block">
                    <span className={`p-1 ${height} block`} >
                        <span data-placeholder className={`max-md:w-[100%] mb-2 h-[100%] overflow-hidden relative bg-gray-400 rounded-xl animate-pulse block ${width}`}>
                        </span>
                    </span>
                </span>
            </span>
        </>
    );
};

export default TextSkeletion;
