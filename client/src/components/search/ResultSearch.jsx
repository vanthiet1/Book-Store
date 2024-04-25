import { Link } from "react-router-dom";
const ResultSearch = (props) => {
    const {searchResults ,handleScrollToTop} = props;
    return (
        <>
          {searchResults.length > 0 && (
                            <div className="absolute w-[470px] h-dvh bg-black top-[45px] right-[-165px] rounded-md  overflow-auto scrollbar-thin">
                                {searchResults && searchResults.map((productSeach, index) => (
                                    <Link key={index} to={{ pathname: `/ebook/${productSeach._id}`, state: { fromSearch: true } }}>
                                        <div onClick={handleScrollToTop} className="flex gap-4 hover:bg-[#1d5353] p-5 rounded-md duration-300 ease-in">
                                            <div className="relative">
                                                <img className="w-[120px] rounded-md" src={productSeach.imgBook} alt="" />
                                                <div className="absolute bottom-0 left-0 bg-[#26D99A] w-full rounded-t-md">
                                                    <span className=" block text-[#fff] text-center ">{productSeach.labelBook}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className="text-[#fff] font-semibold text-[20px]">{productSeach.nameBook}</h1>
                                                <span className="text-[#fff] block py-2">{productSeach.genres[0].name}</span>
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