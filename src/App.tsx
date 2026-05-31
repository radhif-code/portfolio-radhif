import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { PortfolioShowcase } from "./components/PortfolioShowcase";
import { InfuGuard } from "./components/InfuGuard";
import { Contact } from "./components/Contact";

function App() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <PortfolioShowcase />
      <InfuGuard />
      <Contact />
    </main>
  );
}

export default App;
