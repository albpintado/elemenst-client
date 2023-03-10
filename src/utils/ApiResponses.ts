import { TLineItem } from "components/lineitem/LineItem.type";
import { TLineList } from "components/linelist/LineList.type";

export interface LineListResponse {
  data: TLineList;
  status: number;
}

export interface LineListError {
  data: string;
  status: number;
}

export interface LineItemResponse {
  data: TLineItem;
  status: number;
}

export interface LineItemError {
  data: string;
  status: number;
}

export interface LoginResponse {
  data: string | null;
  status: number;
}

export interface UserResponse {
  data: { username: string; id: number };
  status: number;
}

export interface UserError {
  data: string;
  status: number;
}
