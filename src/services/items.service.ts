import { TLineItem } from "components/lineitem/LineItem.type";
import { LineItemDto } from "components/lineitem/LineItem.dto";
import axios, { AxiosError, AxiosResponse } from "axios";
import { LineItemError, LineItemResponse } from "utils/ApiResponses";

// const url = "http://54.242.96.1:8080/elemenst/api/v1/line-item";
const url = "http://localhost:8080/api/v1/line-item";

const getAllItems = async (): Promise<TLineItem[]> => {
  const request = await fetch(`${url}`);
  const response = await request.json();
  return response;
};

const getAllItemsByLineList = async (
  lineItemId: number
): Promise<TLineItem[]> => {
  const request = await fetch(`${url}/list/${lineItemId}`);
  const response = await request.json();
  return response;
};

const createItem = async (
  lineItemDto: LineItemDto
): Promise<LineItemResponse | LineItemError> => {
  try {
    const request = await axios.post(`${url}`, lineItemDto);
    const lineItemResponse = { data: request.data, status: request.status };
    return lineItemResponse;
  } catch (error) {
    let lineItemError;
    if (axios.isAxiosError(error) && error.response) {
      lineItemError = {
        data: error.response.data[0],
        status: error.response.status,
      };
    } else {
      lineItemError = {
        data: "Something went wrong",
        status: 400,
      };
    }

    return lineItemError;
  }
};

const completeItem = async (lineItemId: number): Promise<TLineItem> => {
  const request = await fetch(`${url}/${lineItemId}/complete`, {
    method: "PUT",
  });
  const response = await request.json();
  return response;
};

const updateItem = async (
  lineItemId: number,
  newContent: string
): Promise<LineItemResponse | LineItemError> => {
  try {
    const request = await axios.put(`${url}/${lineItemId}`, {
      content: newContent,
    });

    const lineItemResponse = { data: request.data, status: request.status };

    return lineItemResponse;
  } catch (error) {
    let lineItemError;
    if (axios.isAxiosError(error) && error.response) {
      lineItemError = {
        data: error.response.data[0],
        status: error.response.status,
      };
    } else {
      lineItemError = {
        data: "Something went wrong",
        status: 400,
      };
    }

    return lineItemError;
  }
};

const deleteItem = async (lineItemId: number): Promise<void> => {
  await fetch(`${url}/${lineItemId}`, {
    method: "DELETE",
  });
};

const ItemsService = {
  getAllItems,
  createItem,
  getAllItemsByLineList,
  completeItem,
  updateItem,
  deleteItem,
};

export default ItemsService;
