import topLeft from "../assets/topLeft.svg";
import bottomRight from "../assets/bottomRight.svg";

function Corners() {
  return (
    <>
      <img
        src={topLeft}
        alt="Top left svg"
        className="fixed top-12 left-12 w-16 h-16 fill-red-400 animate-from-top-left"
      />

      <img
        src={bottomRight}
        alt="Bottom right svg"
        className="fixed bottom-12 right-12 w-16 h-16 fill-darkbrown animate-from-bottom-right"
      />
    </>
  );
}

export default Corners;
