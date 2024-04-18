import Header from "~/layouts/Header";
import Section from "~/layouts/Section";
import ListBookFree from "~/layouts/Contents/MainHome/ListBookFree";
import ListBookNew from "~/layouts/Contents/MainHome/ListBookNew";
import Footer from "~/layouts/Footer";
const Home = () => {

    return (
        <>
            <div>
                <div className="relative">
                    <Header />
                </div>
                <Section />
                <ListBookFree />
                <ListBookNew />
                <Footer/>
            </div>
        </>
    );
};

export default Home;
