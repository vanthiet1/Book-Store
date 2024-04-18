import { useState } from "react";
import { createContext } from "react";
export const DisplayPopup = createContext()
const UiContextAdmin = ({ children }) => {
    const [showFormAddCategoryAdmin, setShowFormAddCategoryAdmin] = useState(false);
    const [showFormUpdateCategoryAdmin, setShowFormUpdateCategoryAdmin] = useState(false);
    const [showFormDescriptionBookAdmin, setShowFormDescriptionBookAdmin] = useState(false);
    const [showFormAddBookAdmin, setShowFormAddBookAdmin] = useState(false);
    // 
    const [showFormGenresBookAdmin, setShowFormGenresAdmin] = useState(false);
    const [showFormUpdateGenresBookAdmin, setShowFormUpdateGenresAdmin] = useState(false);

    const [showFormEditBookAdmin, setShowFormEditAdmin] = useState(false);

    const [showDetailProductCheckout, setShowDetailProductCheckout] = useState(false);


    const [filter, setFilter] = useState(null);

    // add cate form
    const handleDisplayAddCategory = () => {
        setShowFormAddCategoryAdmin(true);
        setFilter('filterAdmin')
    };
    const handleHideDisplayAddCategory = () => {
        setShowFormAddCategoryAdmin(false);
        setFilter('')
    };

    // add update form
    const handleDisplayUpdateCategory = () => {
        setShowFormUpdateCategoryAdmin(true);
        setFilter('filterAdmin')
    };
    const handleHideDisplayUpdateCategory = () => {
        setShowFormUpdateCategoryAdmin(false);
        setFilter('')
    };

    const handleDisplayFormAddBook = () => {
        setShowFormAddBookAdmin(true);
        setFilter('filterAdmin');
    };
    const handleHideFormAddBook  = () => {
        setShowFormAddBookAdmin(false);
        setFilter('')
    };
    const handleDisplayDescriptionBook = () => {
        setShowFormDescriptionBookAdmin(true);
        setFilter('filterAdmin')
    };
    const handleHideDescriptionBook = () => {
        setShowFormDescriptionBookAdmin(false);
        setFilter('')
    };

// Genres
const handleDisplayGenresBook = () => {
    setShowFormGenresAdmin(true);
    setFilter('filterAdmin')
};

const handleDisplayFormUpdateGenresBook = () => {
    setShowFormUpdateGenresAdmin(true);
    setFilter('filterAdmin')
};
const handleHideFormUpdateGenresBook = () => {
    setShowFormUpdateGenresAdmin(false);
    setFilter('')
};

const handleHideGenresBook = () => {
    setShowFormGenresAdmin(false);
    setFilter('')
};


const handleDisplayEditBook = () => {
setShowFormEditAdmin(true)
    setFilter('filterAdmin')
};
const handleHideEditBook = () => {
    setShowFormEditAdmin(false)
    setFilter('')
};

const handleDisplayProductCheckout = () =>{
    setShowDetailProductCheckout(true)
}
const handleHideProductCheckout = () =>{
    setShowDetailProductCheckout(false)
}


    const dataUi = {
        // categories value Ui
        showFormUpdateCategoryAdmin,
        showFormAddCategoryAdmin,
        // products value Ui
        showFormDescriptionBookAdmin,
        showFormAddBookAdmin,
        // genres
        showFormGenresBookAdmin,
        showFormUpdateGenresBookAdmin,
        // book
        showFormEditBookAdmin,
        // checkout
        showDetailProductCheckout,
        filter,
        setFilter,
        // category fuction
        handleDisplayAddCategory,
        handleHideDisplayAddCategory,
        handleDisplayUpdateCategory,
        handleHideDisplayUpdateCategory,
        // product 
        handleDisplayFormAddBook,
        handleDisplayDescriptionBook,
        handleHideDescriptionBook,
        handleHideFormAddBook,
// genres
// form add
handleDisplayGenresBook,
handleHideGenresBook,
// form update
handleDisplayEditBook,
handleHideEditBook,


handleDisplayFormUpdateGenresBook,
handleHideFormUpdateGenresBook,
// checkout
handleDisplayProductCheckout,
handleHideProductCheckout
    }
    return (
        <div>
            <DisplayPopup.Provider value={dataUi}>
                {children}
            </DisplayPopup.Provider>
        </div>
    );
};

export default UiContextAdmin;