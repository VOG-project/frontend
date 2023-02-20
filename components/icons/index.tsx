import {
  BsChat,
  BsCardList,
  BsEyeFill,
  BsHandThumbsUp,
  BsList,
} from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { BiTime } from "react-icons/bi";

export function getIcons(name: string, size: number, color?: string) {
  switch (name) {
    case "chat":
      return <BsChat size={size} color={color} />;
    case "cardList":
      return <BsCardList size={size} color={color} />;
    case "down":
      return <RxTriangleDown size={size} color={color} />;
    case "eye":
      return <BsEyeFill size={size} color={color} />;
    case "time":
      return <BiTime size={size} color={color} />;
    case "thumb":
      return <BsHandThumbsUp size={size} color={color} />;
    case "list":
      return <BsList size={size} color={color} />;
    default:
      console.log("Not implemented!");
      return;
  }
}
