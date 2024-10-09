import "./App.css";
import topLeft from "./assets/top left.svg";
import bottomRight from "./assets/bottom right.svg";

function App() {
  return (
    <div className="bg-cream w-screen h-screen p-12 relative">
      <div className="p-12 relative w-full h-full">
        <img
          src={topLeft}
          alt="Top left svg"
          className="absolute top-0 left-0 w-16 h-16"
        />
        <img
          src={bottomRight}
          alt="Bottom right svg"
          className="absolute bottom-0 right-0 w-16 h-16"
        />
        <h1>Hello world</h1>
      </div>
    </div>
  );
}

export default App;
