import React from "react";

const CharacterConversion = ({ children }) => {
  let accentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];

  for (var i = 0; i < accentsMap.length; i++) {
    var re = new RegExp("[" + accentsMap[i].substr(1) + "]", "g");
    var char = accentsMap[i][0];
    children = children.replace(re, char);
  }

  // Remove the whole spacespace in string
  let removeAllTextSpacing = children.split(" ").join("");

  // Convert uppercase to lowercase in string
  let convertString = removeAllTextSpacing.toLowerCase();

  // Add a string of characters to the beginning of the string
  let resultText = convertString.padStart(convertString.length + 1, "@");

  return <span className="mr-1">{resultText}</span>;
};

export default CharacterConversion;
