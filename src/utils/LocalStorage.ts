import { TLineList } from "components/linelist/LineList.type";

export const getLocalCurrentList = () => {
  const currentList = localStorage.getItem("currentList");
  return currentList ? JSON.parse(currentList) : undefined;
};

export const setLocalCurrentList = (list: TLineList | undefined) => {
  list === undefined
    ? localStorage.removeItem("currentList")
    : localStorage.setItem("currentList", JSON.stringify(list));
};
