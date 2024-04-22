import { Suspense, lazy } from 'react';
import Header from "~/layouts/Header";
import TitleSetter from "~/components/titlePage/TitleSetter";

const LazySection = lazy(() => import("~/layouts/Section"));
const LazyListBookFree = lazy(() => import("~/layouts/Contents/MainHome/ListBookFree"));
const LazyListBookNew = lazy(() => import("~/layouts/Contents/MainHome/ListBookNew"));
const LazyListBookSuggest = lazy(() => import("~/layouts/Contents/MainHome/ListBookSuggest"));
const LazyListBookRetail = lazy(() => import("~/layouts/Contents/MainHome/ListBookRetail"));
const LazyFooter = lazy(() => import("~/layouts/Footer"));

const Home = () => {
    return (
        <>
            <TitleSetter title="Tri thức cuộc sống" />
            <div>
                <div className="relative">
                    <Header />
                </div>
                <Suspense>
                    <LazySection />
                    <LazyListBookFree />
                    <LazyListBookNew />
                    <LazyListBookSuggest />
                    <LazyListBookRetail />
                    <LazyFooter />
                </Suspense>
            </div>
        </>
    );
};

export default Home;
