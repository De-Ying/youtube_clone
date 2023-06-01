import React from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const AutoCompleteItem = ({ video }) => {
  return (
    <li className="hover:bg-[#dedede]/[0.6]">
      <Link
        to={`/searchResult/${video}`}
        className="flex items-center mx-4 py-2"
      >
        <span className="mr-2">
          <IoIosSearch className="text-black text-xl" />
        </span>
        <b>{video}</b>
      </Link>
    </li>
  );
};

export default AutoCompleteItem;
