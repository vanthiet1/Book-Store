import Header from "~/layouts/Header";
import Section from "~/layouts/Section";
import ListBookFree from "~/layouts/Contents/MainHome/ListBookFree";
import ListBookNew from "~/layouts/Contents/MainHome/ListBookNew";
import ListBookSuggest from "~/layouts/Contents/MainHome/ListBookSuggest";
import Footer from "~/layouts/Footer";
import TitleSetter from "~/components/titlePage/TitleSetter";

const Home = () => {

    return (
        <>
      <TitleSetter title="Tri thức cuộc sống" />
            <div>
                <div className="relative">
                    <Header />
                </div>
                <Section />
                <ListBookFree />
                <ListBookNew />
                <ListBookSuggest/>
                <Footer/>
            </div>
        </>
    );
};

export default Home;
