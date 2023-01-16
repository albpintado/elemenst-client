import { TLineList } from "components/linelist/LineList.type";
import React, { createContext, useContext, useReducer } from "react";
import ItemsService from "services/items.service";
import { LineItemDto } from "../components/lineitem/LineItem.dto";
import { TLineItem } from "../components/lineitem/LineItem.type";
import { useError } from "./CreationErrorContext";

export enum LineItemsActionType {
  ADD_ITEM = "ADD_ITEM",
  CLEAR_LIST_ITEMS = "CLEAR_LIST_ITEMS",
  DELETE_ITEM = "DELETE_ITEM",
  COMPLETE_ITEM = "COMPLETE_ITEM",
  UPDATE_ITEM = "UPDATE_ITEM",
}

export interface LineItemsAction {
  type: LineItemsActionType;
  payload: TLineItem;
}

export interface LineItemsState {
  lineItems: TLineItem[];
}

const lineItemsReducer = (state: LineItemsState, action: LineItemsAction) => {
  switch (action.type) {
    case LineItemsActionType.ADD_ITEM:
      // Make add dispatcher add item always to the first position
      return {
        ...state,
        lineItems: [...state.lineItems, action.payload],
      };

    case LineItemsActionType.CLEAR_LIST_ITEMS:
      return {
        ...state,
        lineItems: [],
      };
    case LineItemsActionType.DELETE_ITEM:
      return {
        ...state,
        lineItems: state.lineItems.filter(
          (lineItem) => lineItem.id != action.payload.id
        ),
      };

    case LineItemsActionType.COMPLETE_ITEM:
      return {
        ...state,
        lineItems: state.lineItems.map((lineItem) => {
          if (lineItem.id == action.payload.id) {
            lineItem.isCompleted = !lineItem.isCompleted;
          }
          return lineItem;
        }),
      };
    case LineItemsActionType.UPDATE_ITEM:
      return {
        ...state,
        lineItems: state.lineItems.map((lineItem) => {
          if (lineItem.id == action.payload.id) {
            lineItem.content = action.payload.content;
          }
          return lineItem;
        }),
      };
    default:
      return state;
  }
};

const LineItemsContext = createContext<{
  lineItemsState: LineItemsState;
  lineItemsDispatch: React.Dispatch<LineItemsAction>;
}>({
  lineItemsState: { lineItems: [] },
  lineItemsDispatch: () => null,
});

const LineItemsProvider = ({ children }: { children: React.ReactNode }) => {
  const [lineItemsState, lineItemsDispatch] = useReducer(lineItemsReducer, {
    lineItems: [],
  } as LineItemsState);

  return (
    <LineItemsContext.Provider value={{ lineItemsState, lineItemsDispatch }}>
      {children}
    </LineItemsContext.Provider>
  );
};

const useLineItems = () => {
  const lineItemsContext = useContext(LineItemsContext);

  if (lineItemsContext === undefined) {
    throw new Error("useItems must be used within a LineItemsProvider");
  }

  return lineItemsContext;
};

const getAllLineItems = async (
  lineItemsDispatch: React.Dispatch<LineItemsAction>,
  currentList: TLineList | undefined
) => {
  let itemsResponse: TLineItem[];
  if (currentList != undefined) {
    itemsResponse = await ItemsService.getAllItemsByLineList(currentList.id);
  } else {
    itemsResponse = await ItemsService.getAllItemsByUser();
  }
  lineItemsDispatch({
    type: LineItemsActionType.CLEAR_LIST_ITEMS,
    payload: {} as TLineItem,
  });
  itemsResponse.map((lineItem) => {
    lineItemsDispatch({
      type: LineItemsActionType.ADD_ITEM,
      payload: lineItem,
    });
  });
};

const createLineItem = async (
  lineItemsDispatch: React.Dispatch<LineItemsAction>,
  currentList: TLineList,
  itemName: string,
  resetInputValue: () => void
) => {
  const creationDate = new Date().toLocaleDateString("en-CA").split(",")[0];
  const itemToSave: LineItemDto = {
    content: itemName,
    creationDate: creationDate,
    lineListId: currentList.id,
  };
  const { data, status } = await ItemsService.createItem(itemToSave);
  if (status == 200) {
    lineItemsDispatch({
      type: LineItemsActionType.ADD_ITEM,
      payload: data as TLineItem,
    });
    resetInputValue();
  }
  return { status: status, data: data };
};

const completeLineItem = async (
  lineItemsDispatch: React.Dispatch<LineItemsAction>,
  lineItem: TLineItem
) => {
  await ItemsService.completeItem(lineItem.id);
  lineItemsDispatch({
    type: LineItemsActionType.COMPLETE_ITEM,
    payload: lineItem,
  });
};

const updateLineItem = async (
  lineItemsDispatch: React.Dispatch<LineItemsAction>,
  lineItem: TLineItem,
  newContent: string
) => {
  const { data, status } = await ItemsService.updateItem(
    lineItem.id,
    newContent
  );
  if (status == 200) {
    lineItemsDispatch({
      type: LineItemsActionType.UPDATE_ITEM,
      payload: data as TLineItem,
    });
  }

  return { status: status, data: data };
};

const deleteLineItem = async (
  lineItemsDispatch: React.Dispatch<LineItemsAction>,
  lineItem: TLineItem
) => {
  await ItemsService.deleteItem(lineItem.id);
  lineItemsDispatch({
    type: LineItemsActionType.DELETE_ITEM,
    payload: lineItem,
  });
};

const clearLineItems = async (
  lineItemsDispatch: React.Dispatch<LineItemsAction>
) => {
  lineItemsDispatch({
    type: LineItemsActionType.CLEAR_LIST_ITEMS,
    payload: {} as TLineItem,
  });
};

export {
  LineItemsProvider,
  useLineItems,
  getAllLineItems,
  createLineItem,
  completeLineItem,
  updateLineItem,
  deleteLineItem,
  clearLineItems,
};
