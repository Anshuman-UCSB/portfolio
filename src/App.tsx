import topLeft from "./assets/top left.svg";
import bottomRight from "./assets/bottom right.svg";

function App() {
  return (
    <div className="bg-cream w-screen h-screen p-12 relative">
      <div className="p-12 relative w-full h-full">
        <img
          src={topLeft}
          alt="Top left svg"
          className="absolute top-0 left-0 w-16 h-16 fill-red-400"
        />

        <img
          src={bottomRight}
          alt="Bottom right svg"
          className="absolute bottom-0 right-0 w-16 h-16 fill-darkbrown"
        />
        <p className="font-bold text-5xl text-darkbrown">Anshuman Dash</p>
        <p className="font-semibold text-2xl text-faded">About</p>
      </div>
    </div>
  );
}

export default App;
