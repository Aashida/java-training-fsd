const initialState = {

    selectedCategory: ""

};

export const categoryReducer = (
    state = initialState,
    action
) => {

    switch (action.type) {

        case "SET_SELECTED_CATEGORY":

            return {

                ...state,

                selectedCategory:
                    action.payload

            };

        case "CLEAR_SELECTED_CATEGORY":

            return {

                ...state,

                selectedCategory: ""

            };

        default:

            return state;

    }

};