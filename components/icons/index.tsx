import {
  BsChat,
  BsCardList,
  BsEyeFill,
  BsHandThumbsUp,
  BsList,
  BsChevronLeft,
  BsChevronDoubleLeft,
  BsChevronRight,
  BsChevronDoubleRight,
} from "react-icons/bs";
import { RxTriangleDown, RxAvatar } from "react-icons/rx";
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
    case "left":
      return <BsChevronLeft size={size} color={color} />;
    case "doubleLeft":
      return <BsChevronDoubleLeft size={size} color={color} />;
    case "right":
      return <BsChevronRight size={size} color={color} />;
    case "doubleRight":
      return <BsChevronDoubleRight size={size} color={color} />;
    case "avatar":
      return <RxAvatar size={size} color={color} />;
    default:
      console.log("Not implemented!");
      return;
  }
}
