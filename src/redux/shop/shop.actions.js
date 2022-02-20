import ShopActionTypes from "./shop.types";

const { UPDATE_COLLECTIONS } = ShopActionTypes;

export const updateCollections = collectionsMap => ({
    type: UPDATE_COLLECTIONS,
    payload:collectionsMap
}
)