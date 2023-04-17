import GAMES from "@/constants/games";

export const getGameLogo = (game: string) => {
  const gameLogo = GAMES.filter((item) => item.name === game)[0]?.logo;
  return gameLogo;
};
