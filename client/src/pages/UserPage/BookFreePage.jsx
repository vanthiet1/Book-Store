import { useEffect, useState } from "react";
import Header from "~/layouts/Header";
import BookFreeUi from "~/layouts/Contents/BookFreeUi";
import Footer from "~/layouts/Footer";

import TitleSetter from "~/components/titlePage/TitleSetter";
import Card from "~/components/cardBook/card";
import { GetInforBook, BookFreeApi } from "../../services/books/Book";
const BookFreePage = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookFreeData = await BookFreeApi();
        const bookDetails = await Promise.all(bookFreeData.map(async (idBook) => {
          const data = await GetInforBook(idBook);
          return data;
        }));
        setCards(bookDetails);
      } catch (error) {
        console.error('Error fetching free books data:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <TitleSetter title="Sách miễn phí" />
      <div className="bg-[#191821] w-full h-auto overflow-hidden">
        <Header />
        <div className='pt-10'>
          <Card data={cards} />
        </div>
        <div className="pt-[500px] px-5">
          <h1 className="font-bold text-[#fff] text-[25px] p-5">Kho sách miễn phí</h1>
          <BookFreeUi />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BookFreePage;