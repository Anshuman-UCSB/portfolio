import { useSelected } from "../SelectedContext";

interface HeaderProps {
  name: string;
}

function Header({ name }: HeaderProps) {
  const { selected, setSelected } = useSelected();

  return (
    <p
      className={`cursor-pointer inline-block transition-all duration-500 ease-in-out font-semibold text-4xl ${
        selected === name ? "text-darkbrown" : "text-faded"
      }`}
      onClick={() => setSelected(name)}
      style={{ width: "auto" }}
    >
      {name}
    </p>
  );
}

function Headers() {
  return (
    <>
      <p className="font-bold text-5xl text-darkbrown">Anshuman Dash</p>
      <div className="px-6 py-2 w-auto flex flex-col items-start">
        {["ABOUT", "PROJECTS", "CONTACT"].map((name) => (
          <div className="animate-fade-in animation-delay-700 opacity-0">
            <Header key={name} name={name} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Headers;
