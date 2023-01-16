import axios from "axios";
import { LineListDto } from "components/linelist/LineItem.dto";
import { TLineList } from "components/linelist/LineList.type";
import { LineListError, LineListResponse } from "utils/ApiResponses";
import { getToken } from "utils/Authentication";

// const url = "http://54.242.96.1:8080/elemenst/api/v1/line-list";
const url = "http://localhost:8080/api/v1/line-list";

const getAllLists = async (): Promise<TLineList[]> => {
  const token = getToken();
  const request = await fetch(`${url}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  return response;
};

const createList = async (
  lineListDto: LineListDto
): Promise<LineListResponse | LineListError> => {
  const token = getToken();
  const request = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(lineListDto),
  });
  const response = await request.json();
  return { data: response, status: request.status };
};

const updateList = async (
  lineListId: number,
  newName: string
): Promise<LineListResponse | LineListError> => {
  const token = getToken();
  const request = await fetch(`${url}/${lineListId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: newName }),
  });

  const response = await request.json();
  return { data: response, status: request.status };
};

const deleteList = async (lineListId: number): Promise<void> => {
  const token = getToken();
  await fetch(`${url}/${lineListId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const ListsService = { getAllLists, createList, updateList, deleteList };

export default ListsService;
