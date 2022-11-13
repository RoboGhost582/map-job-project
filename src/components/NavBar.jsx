import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import States from "../StateData.js";

function NavBar({ setKeyword, setLocation, setViewPort, viewPort, handleSubmit, mapData}) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false)
  console.log(showMessage)

  return (
    <div className="flex flex-col justify-start items-center bg-[#191a1a] gap-4 p-4">
      <input
        className="border-2 border-black py-2 px-4 my-1 rounded-xl w-[250px]"
        placeholder="Job Keyword(s)..."
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-[250px] p-2 flex items-center justify-between rounded-xl ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select State"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter State name"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {States?.map((item) => (
          <li
            key={item?.state}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              item?.state.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              item?.state.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (item?.state.toLowerCase() !== selected.toLowerCase()) {
                setLocation(item?.state);
                {
                  item?.state === "USA"
                    ? setViewPort({
                        ...viewPort,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        zoom: 4,
                      })
                    : setViewPort({
                        ...viewPort,
                        latitude: item.latitude,
                        longitude: item.longitude,
                        zoom: 6,
                      });
                }
                setSelected(item?.state);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {item?.state}
          </li>
        ))}
      </ul>
      {(showMessage) ? 
      ((mapData <= 0) ? 
      (<p className="text-white">No Results Found With Those Keyword(s)</p>)
      : (<p className="text-white">Results Found: {mapData.length}</p>))
      : null}
      <button className="border-2 border-black py-2 px-4 my-1 rounded-xl w-[250px] bg-white"
      onClick={() => {handleSubmit(); setShowMessage(true);}}>Submit</button>
    </div>
  );
}

export default NavBar;
