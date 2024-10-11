import { useSelected } from "../SelectedContext";

interface HeaderProps {
  name: string;
}

function Header({ name }: HeaderProps) {
  const { selected, setSelected } = useSelected();

  return (
    <p
      className={`cursor-pointer inline-block transition-all duration-500 ease-in-out font-semibold text-5xl ${
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
        {["ABOUT", "PROJECTS", "CONTACT"].map((name, index) => (
          <div
            className="animate-fade-in opacity-0"
            style={{ animationDelay: `${200 * (index + 1)}ms` }}
            key={name}
          >
            <Header name={name} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Headers;
