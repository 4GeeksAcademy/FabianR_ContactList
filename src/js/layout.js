import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Contact } from "./views/Contact";
import { AddContact } from "./views/AddContacts";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import injectContext from "./store/appContext";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Contact />} />
                        <Route path="/add" element={<AddContact />} />
                        <Route path="/edit/:contactId" element={<AddContact />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
