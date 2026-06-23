import {
    combineReducers,
    legacy_createStore
} from "redux";

import {
    categoryReducer
} from "./reducer/categoryReducer";

const rootReducer =
    combineReducers({

        category:
            categoryReducer

    });

export const store =
    legacy_createStore(
        rootReducer
    );