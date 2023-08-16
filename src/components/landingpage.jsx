import React, { useState, useEffect } from 'react';
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import { Services } from "./services";
/* import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials"; */
import { Team } from "./Team"; 
import { Contact } from "./contact"; 
import JsonData from "../data/data.json";

export const LandingPage = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
    setLandingPageData(JsonData);
    }, []);

    return (
        <div>
            <Navigation />
            <Header data={landingPageData.Header} />
            <Features data={landingPageData.Features} />
            <About data={landingPageData.About} />
            <Services data={landingPageData.Services} />
            {/* <Cotizador data={landingPageData.Formulario} /> */}
            {/* <Gallery data={landingPageData.Gallery} />
            <Testimonials data={landingPageData.Testimonials} /> */}
            <Team data={landingPageData.Team} />
            <Contact data={landingPageData.Contact} />
        </div>
    );
}