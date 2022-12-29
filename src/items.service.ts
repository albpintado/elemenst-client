import { TLineItem } from "components/lineitem/LineItem.type";
import { LineItemDto } from "components/lineitem/LineItem.dto";

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

const createItem = async (lineItemDto: LineItemDto): Promise<TLineItem> => {
  const request = await fetch(`${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lineItemDto),
  });
  const response = await request.json();
  return response;
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
): Promise<TLineItem> => {
  const request = await fetch(`${url}/${lineItemId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: newContent }),
  });
  const response = await request.json();
  return response;
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
