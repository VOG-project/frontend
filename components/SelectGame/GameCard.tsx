import Image, { StaticImageData } from "next/image";
import tw from "twin.macro";

interface GameCardProps {
  name: string;
  image: StaticImageData;
  logo: StaticImageData;
  disabled: boolean;
  onGameCardClick: (game: string) => void;
}

const GameCard = ({
  name,
  image,
  logo,
  disabled,
  onGameCardClick,
}: GameCardProps) => {
  return (
    <GameCardContainer>
      <GameImage
        src={image}
        alt={name}
        quality={80}
        width={1280}
        style={{
          objectFit: "cover",
          filter: disabled ? "grayscale(100%)" : "",
        }}
        onClick={() => {
          !disabled && onGameCardClick(name);
        }}
      />
      <GameLogo
        src={logo}
        alt={name}
        quality={100}
        style={{
          filter: disabled ? "grayscale(100%)" : "",
        }}
      />
    </GameCardContainer>
  );
};

export default GameCard;

const GameCardContainer = tw.div`
flex flex-col gap-8 w-64 h-[50rem] cursor-pointer
`;

const GameImage = tw(Image)`w-full h-full bg-gray-500`;

const GameLogo = tw(Image)`
  w-full h-24 bg-transparent
`;
