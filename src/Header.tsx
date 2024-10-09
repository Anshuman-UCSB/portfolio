import { useSelected } from "./SelectedContext";

interface HeaderProps {
  name: string;
}

function Header({ name }: HeaderProps) {
  const { selected, setSelected } = useSelected();

  return (
    <p
      className={`inline-block transition-all duration-500 ease-in-out font-semibold text-4xl ${
        selected === name ? "text-darkbrown" : "text-faded"
      }`}
      onClick={() => setSelected(name)}
      style={{ width: "auto" }}
    >
      {name}
    </p>
  );
}

export default Header;
