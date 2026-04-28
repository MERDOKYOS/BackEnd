import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Messi from "./Components/Messi";

function App() {
  let x = true;
  let result;

  if (x) {
    result = <h1 className="green">MERDE THE GREAT</h1>;
  }

  return (
    <>
      {result}
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
      </section>
      <div>
        <h1>Title</h1>
        <hr />
        <Messi />
        <hr />
        <p>This is below the line</p>
      </div>
    </>
  );
}

export default App;
