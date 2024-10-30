import Game from "./components/Game";
function Chess() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[80vh] h-[90vh]">
        <Game />
      </div>
    </div>
  );
}

export default Chess;