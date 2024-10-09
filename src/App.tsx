import { SelectedProvider } from "./SelectedContext";
import Header from "./Header";
import topLeft from "./assets/topLeft.svg";
import bottomRight from "./assets/bottomRight.svg";

function App() {
  return (
    <SelectedProvider>
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
          <div className="px-6 py-2 w-auto flex flex-col items-start">
            <Header name="ABOUT" />
            <Header name="PROJECTS" />
            <Header name="CONTACT" />
          </div>
        </div>
      </div>
    </SelectedProvider>
  );
}

export default App;
