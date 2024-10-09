import topLeft from "../assets/topLeft.svg";
import bottomRight from "../assets/bottomRight.svg";

function Corners() {
  return (
    <>
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
    </>
  );
}

export default Corners;
