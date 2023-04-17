import tw from "twin.macro";

interface LeftProps {
  title: string;
  description?: string;
}

const Left = ({ title, description }: LeftProps) => {
  return (
    <LeftContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </LeftContainer>
  );
};

export default Left;

const LeftContainer = tw.div`
  shrink-0 w-72 p-8 bg-zinc-900
`;

const Title = tw.h2`
  text-xl
`;

const Description = tw.p`
  text-zinc-400
`;
