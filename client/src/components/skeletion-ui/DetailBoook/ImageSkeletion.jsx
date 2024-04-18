const ImageSkeletion = () => {
    return (
        <>
            <div className="w-full mx-0 max-md:p-[5px] max-md:m-0 max-lg:grid">
                <div className="h-max shadow-md rounded-md items-center w-full max-md:mr-0 ">
                    <div className="p-1 " style={{ height: '500px' }}>
                        <div data-placeholder className="max-md:w-[100%]  mb-2 w-[335px] h-[100%] overflow-hidden relative bg-gray-400 rounded-xl animate-pulse">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImageSkeletion;
