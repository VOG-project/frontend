import { useRouter } from "next/router";
import tw from "twin.macro";
import { useRecoilState } from "recoil";
import { selectedGameState } from "@/recoil/atoms/selectedGameState";
import GameCard from "./GameCard";
import GAMES from "@/constants/games";

const SelectGame = () => {
  const router = useRouter();
  const [, setSelectedGame] = useRecoilState(selectedGameState);
  const handleGameCardClick = (game: string) => {
    setSelectedGame(game);
    router.push("/");
  };
  return (
    <SelectGameWrapper>
      <SelectGameContainer>
        {GAMES.map((game) => {
          const { name, image, logo, disabled } = game;
          return (
            <GameCard
              key={name}
              name={name}
              image={image}
              logo={logo}
              disabled={disabled}
              onGameCardClick={handleGameCardClick}
            />
          );
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
