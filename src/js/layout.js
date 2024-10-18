import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { ListContacts } from "./views/ListContacts";
import { ContactCard } from "./views/ContactCard";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import FormularioContact from "./views/FormularioContact";
import EditContact from "./views/EditContacts";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listcontacts" element={<ListContacts />} />
            <Route path="/formulariocontact" element={<FormularioContact />} />
            <Route path="/contactcard/:theid" element={<ContactCard />} />
            <Route path="*" element={<h1>Not found!</h1>} />
            <Route path="/editcontacts" element={<EditContact />} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);