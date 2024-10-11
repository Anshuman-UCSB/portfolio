import { useSelected } from "../SelectedContext";
import { useState, useEffect } from "react";

interface HeaderProps {
  name: string;
  subsections?: string[];
}

function Header({ name, subsections }: HeaderProps) {
  const { selected, setSelected } = useSelected();
  const isSelected = selected === name;

  return (
    <div
      className={`transition-transform duration-500 ease-in-out ${
        isSelected ? "translate-x-0" : "-translate-x-4"
      }`}
    >
      <p
        className={`cursor-pointer inline-block transition-all duration-500 ease-in-o"_dieut font-semibold text-5xl ${
          isSelected ? "text-darkbrown" : "text-faded"
        }`}
        onClick={() => setSelected(name)}
        style={{ width: "auto" }}
      >
        {name}
      </p>
      {isSelected && subsections && (
        <div className="ml-4 mt-2 flex flex-col items-start animate-fade-in">
          {subsections.map((sub, index) => (
            <p
              key={sub}
              className="cursor-pointer text-2xl text-faded transition-all duration-500 ease-in-out hover:text-darkbrown"
              style={{ animationDelay: `${100 * (index + 1)}ms` }}
            >
              {sub}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function Headers() {
  const headers = [
    { name: "ABOUT", subsections: ["Background", "Experience", "Education"] },
    { name: "PROJECTS", subsections: ["Web Apps", "Mobile Apps", "Other"] },
    { name: "CONTACT", subsections: ["Email", "LinkedIn", "Twitter"] },
  ];

  return (
    <>
      <p className="font-bold text-5xl text-darkbrown">Anshuman Dash</p>
      <div className="px-6 py-2 w-auto flex flex-col items-start">
        {headers.map(({ name, subsections }, index) => (
          <div
            className="animate-fade-in opacity-0 transition-transform duration-500 ease-in-out"
            style={{ animationDelay: `${200 * (index + 1)}ms` }}
            key={name}
          >
            <Header name={name} subsections={subsections} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Headers;
