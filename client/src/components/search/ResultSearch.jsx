import { Link } from "react-router-dom";
const ResultSearch = (props) => {
    const {searchResults ,handleScrollToTop} = props;
    return (
        <>
          {searchResults.length > 0 && (
                            <div className="absolute w-[470px] h-dvh bg-black top-[45px] right-[-165px] rounded-md  overflow-auto scrollbar-thin max-md:[400px] max-md:left-[-100px] max-md:z-10 max-lg:left-[130px]">
                                {searchResults && searchResults.map((productSeach, index) => (
                                    <Link key={index} to={{ pathname: `/ebook/${productSeach._id}`, state: { fromSearch: true } }}>
                                        <div onClick={handleScrollToTop} className="flex gap-4 hover:bg-[#1d5353] p-5 rounded-md duration-300 ease-in">
                                            <div className="relative">
                                                <img className="w-[120px] h-[150px] rounded-md object-cover max-md:w-[80px] max-md:h-[120px]" src={productSeach.imgBook} alt="" />
                                                <div className="absolute bottom-0 left-0 bg-[#26D99A] w-full rounded-t-md">
                                                    <span className=" block text-[#fff] text-center max-lg:text-[13px]">{productSeach.labelBook}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-[#fff] font-semibold text-[20px] max-lg:text-[16px] max-md:w-[200px]">{productSeach.nameBook}</h1>
                                                <span className="text-[#fff] block py-2 max-lg:text-[14px]">{productSeach.genres[0].name}</span>
                                                <span className="text-[#fff] block">{productSeach.author[0].name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )
          }
        </>
    );
};

export default ResultSearch;