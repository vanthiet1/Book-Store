import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { SearchBooks } from "../../services/books/SearchBook";

const Search = ({ updateResults }) => {
    const [keywords, setKeyword] = useState('');

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay)
        }
    }

    const debouncedSearchBook = debounce(async (keywords) => {
        if (keywords.trim() === '') {
            updateResults([]);
            return;
        }
        try {
            const results = await SearchBooks(keywords); 
            updateResults(results);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }, 500);

    const handleChange = (event) => {
        const { value } = event.target;
        setKeyword(value);
        debouncedSearchBook(value);
    };


    return (
        <>
            <div className="flex">
                <div className="relative">
                    <input
                        type="text"
                        className=" rounded-xl p-2 w-[300px]"
                        placeholder="Tìm kiếm sách"
                        value={keywords}
                        onChange={handleChange}
                    />
                    <div className="absolute z-2 right-[5px] top-[10px]">
                        <IoSearch className="text-black text-[20px] " />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
