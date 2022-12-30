import React, { createContext, useContext, useReducer } from "react";
import ListsService from "services/lists.service";
import { LineListDto } from "./LineItem.dto";
import { TLineList } from "./LineList.type";

export enum LineListsActionType {
  ADD_LIST = "ADD_LIST",
  DELETE_LIST = "DELETE_LIST",
  UPDATE_LIST = "UPDATE_LIST",
}

export interface LineListsAction {
  type: LineListsActionType;
  payload: TLineList;
}

export interface LineListsState {
  lineLists: TLineList[];
}

const lineListsReducer = (state: LineListsState, action: LineListsAction) => {
  switch (action.type) {
    case LineListsActionType.ADD_LIST:
      return {
        ...state,
        lineLists: [action.payload, ...state.lineLists],
      };
    case LineListsActionType.DELETE_LIST:
      return {
        ...state,
        lineLists: state.lineLists.filter(
          (lineList) => lineList.id != action.payload.id
        ),
      };
    case LineListsActionType.UPDATE_LIST:
      return {
        ...state,
        lineLists: state.lineLists.map((lineList) => {
          if (lineList.id == action.payload.id) {
            lineList.name = action.payload.name;
          }
          return lineList;
        }),
      };
    default:
      return state;
  }
};

export const LineListsContext = createContext<{
  lineListsState: LineListsState;
  lineListsDispatch: React.Dispatch<LineListsAction>;
}>({
  lineListsState: { lineLists: [] },
  lineListsDispatch: () => null,
});

const LineListsProvider = ({ children }: { children: React.ReactNode }) => {
  const [lineListsState, lineListsDispatch] = useReducer(lineListsReducer, {
    lineLists: [],
  } as LineListsState);

  return (
    <LineListsContext.Provider
      value={{
        lineListsState,
        lineListsDispatch,
      }}
    >
      {children}
    </LineListsContext.Provider>
  );
};

const useLineLists = () => {
  const lineListsContext = useContext(LineListsContext);

  if (lineListsContext === undefined) {
    throw new Error("useListsContext must be used within a ListsProvider");
  }

  return lineListsContext;
};

const getAllLists = async (
  listsDispatch: (value: LineListsAction) => void,
  setIsFetching: (value: React.SetStateAction<boolean>) => void
) => {
  const listsResponse = await ListsService.getAllLists();
  listsResponse.map((list) => {
    listsDispatch({ type: LineListsActionType.ADD_LIST, payload: list });
  });
  setIsFetching(false);
};

const createList = async (
  listsDispatch: (value: LineListsAction) => void,
  listName: string,
  setCurrentList: (list: TLineList) => void,
  resetInputValue: () => void
) => {
  const creationDate = new Date().toLocaleDateString("en-CA").split(",")[0];
  const listToSave: LineListDto = {
    name: listName,
    creationDate: creationDate,
  };
  const savedList = await ListsService.createList(listToSave);
  listsDispatch({ type: LineListsActionType.ADD_LIST, payload: savedList });
  setCurrentList(savedList);
  resetInputValue();
};

const updateList = async (
  listsDispatch: (value: LineListsAction) => void,
  list: TLineList | undefined,
  newName: string | undefined
) => {
  if (list && newName) {
    const updatedList = await ListsService.updateList(list.id, newName);
    listsDispatch({
      type: LineListsActionType.UPDATE_LIST,
      payload: updatedList,
    });
  }
};

const deleteList = async (
  list: TLineList | undefined,
  listsState: LineListsState,
  listsDispatch: (value: LineListsAction) => void
) => {
  const listToDelete = listsState.lineLists.find((list) => list.id == list.id);
  if (listToDelete != undefined && list != undefined) {
    await ListsService.deleteList(list.id);
    listsDispatch({
      type: LineListsActionType.DELETE_LIST,
      payload: listToDelete,
    });
  }
};

export {
  LineListsProvider,
  useLineLists,
  getAllLists,
  createList,
  updateList,
  deleteList,
};
