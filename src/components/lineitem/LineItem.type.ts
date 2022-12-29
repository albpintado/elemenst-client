import { TLineList } from "../linelist/LineList.type";

export interface TLineItem {
  id: number;
  creationDate: string;
  content: string;
  lineList: TLineList;
  isCompleted: boolean;
  isPinned: boolean;
}
