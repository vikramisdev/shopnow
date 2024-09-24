"use client"

import Footer from "../components/Footer";
import Header from "../components/Header";


export default function SearchBar() {
    return (
        <div>
            <Header searchBarFocus={true} />
            <div className="flex items-center justify-center text-center min-h-lvh">Search Something ...</div>
            <Footer />
        </div>
    );
}
