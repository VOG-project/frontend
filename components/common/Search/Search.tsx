import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useToast from "@/hooks/useToast";
import { getIcons } from "@/components/icons";
import { CommunityQuery } from "@/types/community";

interface SearchProps {
  options: { value: string; text: string }[];
}

const Search = ({ options }: SearchProps) => {
  const router = useRouter();
  const query = router.query as CommunityQuery;
  const [search, setSearch] = useState({
    type: options[0].value,
    keyword: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setSearch((prev) => {
      if (query.keyword && query.type) {
        return { type: query.type, keyword: query.keyword };
      } else {
        return { type: prev.type, keyword: "" };
      }
    });
  }, [query]);

  const handleSearchClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.keyword) {
      toast.alert("검색어를 입력해주세요.");
      return;
    }

    router.push(
      {
        query: {
          ...router.query,
          type: search.type,
          keyword: search.keyword,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <SearchContainer onSubmit={handleSearchClick}>
      <SearchCategory
        value={search.type}
        onChange={(e) =>
          setSearch((prev) => {
            return { ...prev, type: e.target.value };
          })
        }
      >
        {options.map((option) => {
          return (
            <SearchOption key={option.value} value={option.value}>
              {option.text}
            </SearchOption>
          );
        })}
      </SearchCategory>
      <SearchInput
        value={search.keyword}
        onChange={(e) =>
          setSearch((prev) => {
            return { ...prev, keyword: e.target.value.trim() };
          })
        }
      />
      <SearchSumbitButton type="submit">
        <SearchIcon>{getIcons("search", 22)}</SearchIcon>
      </SearchSumbitButton>
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = tw.form`
  relative h-12 p-2 border border-neutral-700
  [> *]:(border border-neutral-700)
`;

const SearchCategory = tw.select`
  w-20 h-full bg-black outline-none
`;

const SearchOption = tw.option``;

const SearchInput = tw.input`
  h-full px-2 pr-8 bg-transparent outline-none
`;

const SearchSumbitButton = tw.button`
  absolute top-3 right-3 border-none
`;

const SearchIcon = tw.div`
  flex items-center justify-center
`;
