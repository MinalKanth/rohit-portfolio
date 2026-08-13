import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Footer, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='grain-overlay' />
        <div className='bg-hero-pattern sm:bg-hero-pattern-desktop bg-cover bg-no-repeat bg-center'>
          <StarsCanvas />
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
