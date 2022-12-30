import { LineListDto } from "components/linelist/LineItem.dto";
import { TLineList } from "components/linelist/LineList.type";

// const url = "http://54.242.96.1:8080/elemenst/api/v1/line-list";
const url = "http://localhost:8080/api/v1/line-list";

const getAllLists = async (): Promise<TLineList[]> => {
  const request = await fetch(`${url}`);
  const response = await request.json();
  return response;
};

const createList = async (lineListDto: LineListDto): Promise<TLineList> => {
  const request = await fetch(`${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lineListDto),
  });
  const response = await request.json();
  return response;
};

const updateList = async (
  lineListId: number,
  newName: string
): Promise<TLineList> => {
  const request = await fetch(`${url}/${lineListId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  });
  const response = await request.json();
  return response;
};

const deleteList = async (lineListId: number): Promise<void> => {
  await fetch(`${url}/${lineListId}`, {
    method: "DELETE",
  });
};

const ListsService = { getAllLists, createList, updateList, deleteList };

export default ListsService;
