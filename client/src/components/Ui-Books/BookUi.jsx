import {Link} from 'react-router-dom';
const BookUi = (props) => {
    const {imgBook, labelBook, nameBook , width ,bgLabel ,bookId} = props;
    const containerBookUi = `relative mx-2 ${width} `
    return (
        <div>
            <div className={`${containerBookUi}`}>
                <img loading="lazy"  className="rounded-[10px] group-hover:blur-[10px] w-[350px] " src={imgBook} alt="Sách" />
                <div >
                    <div className="absolute right-[26px] top-0 flex group-hover:blur-[10px] max-lg:top-0">
                        <span className={`text-white ${bgLabel} font-bold uppercase p-[0.5px] px-3 rounded-bl-[10px] rounded-br-[5px] max-lg:text-[12px]`}>{labelBook}</span>

                        <div className="absolute right-[-26px] top-[-1px]">
                            <img className='max-w-[40px] max-lg:max-w-[30px]' src="https://res.cloudinary.com/dz93cdipw/image/upload/v1713860821/Book-Store/Icon/brand.svg" alt="brand" />
                        </div>
                    </div>
                    <div className="py-3"> 
                    <Link to={`/ebook/${bookId}`}>
                     <h1 className="text-white font-bold cursor-pointer hover:text-[#15B088] max-lg:text-[13px]">{nameBook}</h1>
                     </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookUi;