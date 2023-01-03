import axios from "axios";
import { LineListDto } from "components/linelist/LineItem.dto";
import { TLineList } from "components/linelist/LineList.type";
import { LineListError, LineListResponse } from "utils/ApiResponses";

// const url = "http://54.242.96.1:8080/elemenst/api/v1/line-list";
const url = "http://localhost:8080/api/v1/line-list";

const getAllLists = async (): Promise<TLineList[]> => {
  const request = await fetch(`${url}`);
  const response = await request.json();
  return response;
};

const createList = async (
  lineListDto: LineListDto
): Promise<LineListResponse | LineListError> => {
  try {
    const request = await axios.post(`${url}`, lineListDto);
    const lineListResponse = { data: request.data, status: request.status };
    return lineListResponse;
  } catch (error) {
    let lineListError;
    if (axios.isAxiosError(error) && error.response) {
      lineListError = {
        data: error.response.data[0],
        status: error.response.status,
      };
    } else {
      lineListError = {
        data: "Something went wrong",
        status: 400,
      };
    }

    return lineListError;
  }
};

const updateList = async (
  lineListId: number,
  newName: string
): Promise<LineListResponse | LineListError> => {
  try {
    const request = await axios.put(`${url}/${lineListId}`, {
      name: newName,
    });
    const lineListResponse = { data: request.data, status: request.status };
    return lineListResponse;
  } catch (error) {
    let lineListError;
    if (axios.isAxiosError(error) && error.response) {
      lineListError = {
        data: error.response.data[0],
        status: error.response.status,
      };
    } else {
      lineListError = {
        data: "Something went wrong",
        status: 400,
      };
    }

    return lineListError;
  }
};

const deleteList = async (lineListId: number): Promise<void> => {
  await fetch(`${url}/${lineListId}`, {
    method: "DELETE",
  });
};

const ListsService = { getAllLists, createList, updateList, deleteList };

export default ListsService;
