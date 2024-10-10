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
        <Header name="ABOUT" />
        <Header name="PROJECTS" />
        <Header name="CONTACT" />
      </div>
    </>
  );
}

export default Headers;
