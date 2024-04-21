import { useEffect, useState } from "react";
import Header from "~/layouts/Header";
import BookSuggestUi from "~/layouts/Contents/BookSuggestUi";
import Footer from "~/layouts/Footer";

import Card from "@components/cardBook/card";
import TitleSetter from '@components/titlePage/TitleSetter';

import { GetInforBook, BookNewApi } from "../../services/books/BookService";

const BookSuggestPage = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookNewData = await BookNewApi();
        const bookDetails = await Promise.all(bookNewData.map(async (idBook) => {
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
      <TitleSetter title="Sách mới" />
      <div className="bg-[#191821] w-full h-auto overflow-hidden">
        <Header />
        <div className=" px-5">
          <div className='pt-10'>
            <Card data={cards} />
          </div>
          <div className="pt-[500px]">
            <h1 className="font-bold text-[#fff] text-[25px] p-5">Kho sách mới nhất</h1>
            <BookSuggestUi />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BookSuggestPage;