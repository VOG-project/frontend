import tw from "twin.macro";

const Search = () => {
  return (
    <SearchContainer>
      <SearchCategory>
        <option>제목</option>
        <option>글쓴이</option>
      </SearchCategory>
      <SearchInput />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = tw.div`
  h-12 p-2 border border-neutral-700
  [> *]:(border border-neutral-700)
`;

const SearchCategory = tw.select`
  w-20 h-full bg-black
`;

const SearchInput = tw.input`
h-full px-2 bg-transparent
`;
