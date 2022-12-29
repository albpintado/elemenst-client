import React from "react";
import TextInput from "components/textinput";

type HomePageProps = {
  createList: (event: React.FormEvent<HTMLFormElement>) => void;
  itemContent: string;
  setItemContent: (item: string) => void;
};

function HomePage({ createList, itemContent, setItemContent }: HomePageProps) {
  return (
    <>
      <h2>No lists</h2>
      <form onSubmit={createList}>
        <TextInput
          placeholder="Create new list"
          itemContent={itemContent}
          setItemContent={setItemContent}
        />
      </form>
    </>
  );
}

export default HomePage;
