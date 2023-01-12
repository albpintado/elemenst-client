import { LineItemDto } from "components/lineitem/LineItem.dto";
import { TLineItem } from "components/lineitem/LineItem.type";
import { LineItemError, LineItemResponse } from "utils/ApiResponses";
import { getToken } from "utils/Authentication";

// const url = "http://54.242.96.1:8080/elemenst/api/v1/line-item";
const url = "http://localhost:8080/api/v1/line-item";

const getAllItemsByUser = async (): Promise<TLineItem[]> => {
  const token = getToken();
  const request = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  return response;
};

const getAllItemsByLineList = async (
  lineItemId: number
): Promise<TLineItem[]> => {
  const token = getToken();
  const request = await fetch(`${url}/list/${lineItemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  return response;
};

const createItem = async (
  lineItemDto: LineItemDto
): Promise<LineItemResponse | LineItemError> => {
  const token = getToken();
  const request = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(lineItemDto),
  });
  const response = await request.json();
  return { data: response, status: request.status };
};

const completeItem = async (lineItemId: number): Promise<TLineItem> => {
  const token = getToken();
  const request = await fetch(`${url}/${lineItemId}/complete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await request.json();
  return response;
};

const updateItem = async (
  lineItemId: number,
  newContent: string
): Promise<LineItemResponse | LineItemError> => {
  const token = getToken();
  const request = await fetch(`${url}/${lineItemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: newContent }),
  });

  const response = await request.json();
  return { data: response, status: request.status };
};

const deleteItem = async (lineItemId: number): Promise<void> => {
  const token = getToken();
  await fetch(`${url}/${lineItemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const ItemsService = {
  getAllItemsByUser,
  createItem,
  getAllItemsByLineList,
  completeItem,
  updateItem,
  deleteItem,
};

export default ItemsService;
