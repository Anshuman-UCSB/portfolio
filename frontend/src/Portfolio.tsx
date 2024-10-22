import { SelectedProvider } from "./SelectedContext";
import About from "./components/About";
import ContentScroller from "./components/ContentScroller";
import Corners from "./components/Corners";
import Headers from "./components/Headers";

function Portfolio() {
  return (
    <SelectedProvider>
      <div className="bg-cream w-screen h-screen p-12 relative flex">
        <div className="p-12 relative w-1/3 h-full">
          <Corners />
          <Headers />
        </div>
        <div className="w-2/3 h-full p-12">
          <ContentScroller />
        </div>
      </div>
    </SelectedProvider>
  );
}

export default Portfolio;
