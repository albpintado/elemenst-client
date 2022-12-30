import { TLineList } from "components/linelist/LineList.type";
import React, { createContext, useContext, useReducer } from "react";
import ItemsService from "services/items.service";
import { LineItemDto } from "./LineItem.dto";
import { TLineItem } from "./LineItem.type";

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
      return {
        ...state,
        lineItems: [action.payload, ...state.lineItems],
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
            lineItem.isCompleted = action.payload.isCompleted;
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
  if (currentList != undefined) {
    const itemsResponse = await ItemsService.getAllItemsByLineList(
      currentList.id
    );
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
  } else {
    const itemsResponse = await ItemsService.getAllItems();
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
  }
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
  const savedItem = await ItemsService.createItem(itemToSave);

  lineItemsDispatch({ type: LineItemsActionType.ADD_ITEM, payload: savedItem });
  resetInputValue();
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
  const savedItem = await ItemsService.updateItem(lineItem.id, newContent);
  lineItemsDispatch({
    type: LineItemsActionType.UPDATE_ITEM,
    payload: savedItem,
  });
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

export {
  LineItemsProvider,
  useLineItems,
  getAllLineItems,
  createLineItem,
  completeLineItem,
  updateLineItem,
  deleteLineItem,
};
