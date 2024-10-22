import { SelectedProvider } from "./SelectedContext";
import Corners from "./components/Corners";
import Headers from "./components/Headers";

function Portfolio() {
  return (
    <SelectedProvider>
      <div className="bg-cream w-screen h-screen p-12 relative">
        <div className="p-12 relative w-full h-full">
          <Corners />
          <Headers />
        </div>
      </div>
    </SelectedProvider>
  );
}

export default Portfolio;
