export const setSelectedCategory = (
    category
) => {

    return {

        type: "SET_SELECTED_CATEGORY",

        payload: category

    };

};

export const clearSelectedCategory = () => {

    return {

        type: "CLEAR_SELECTED_CATEGORY"

    };

};