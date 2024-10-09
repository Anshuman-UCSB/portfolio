import Header from "./Header";

function Headers() {
  return (
    <div className="px-6 py-2 w-auto flex flex-col items-start">
      <Header name="ABOUT" />
      <Header name="PROJECTS" />
      <Header name="CONTACT" />
    </div>
  );
}

export default Headers;
