import tw from "twin.macro";
import GameCard from "./GameCard";
import GAMES from "@/constants/games";

const SelectGame = () => {
  return (
    <SelectGameWrapper>
      <SelectGameContainer>
        {GAMES.map((game) => {
          const { name, image, logo } = game;
          return <GameCard key={name} name={name} image={image} logo={logo} />;
        })}
      </SelectGameContainer>
    </SelectGameWrapper>
  );
};

export default SelectGame;

const SelectGameWrapper = tw.section`
  flex justify-center items-center w-full h-full
`;

const SelectGameContainer = tw.div`
flex gap-20
`;
