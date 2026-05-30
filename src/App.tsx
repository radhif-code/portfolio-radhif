import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { InfuGuard } from "./components/InfuGuard";
import { Certificates } from "./components/Certificates";
import { Contact } from "./components/Contact";

function App() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <InfuGuard />
      <Certificates />
      <Contact />
    </main>
  );
}

export default App;
