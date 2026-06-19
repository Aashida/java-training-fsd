import axios from "axios"

export const getAll = (page) => {

    return async (dispatch) => {

        const response = await axios.get(
            `https://rickandmortyapi.com/api/character/?page=${page}`
        )

        dispatch({
            type: "GET_ALL",
            payload: response.data
        })

    }

}