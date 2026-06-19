import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAll } from "../store/actions/characterAction"

function PaginationList() {

    const dispatch = useDispatch()

    const characters = useSelector(
        state => state.characters.characters
    )

    const totalPages = useSelector(
        state => state.characters.totalPages
    )

    const [currentPage, setCurrentPage] = useState(1)
    const [array, setArray] = useState([])

    useEffect(() => {

        dispatch(getAll(currentPage))

    }, [currentPage])

    useEffect(() => {

        setArray(
            Array.from({ length: totalPages })
        )

    }, [totalPages])

    return (
        <div>

            <h1>Characters</h1>

            <table className="table table-striped">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Species</th>
                        <th>Origin</th>
                        <th>Location</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        characters.map((c) => (

                            <tr key={c.id}>

                                <td>{c.name}</td>
                                <td>{c.status}</td>
                                <td>{c.species}</td>
                                <td>{c.origin.name}</td>
                                <td>{c.location.name}</td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

            <br />

            <div className="d-flex justify-content-center">

                <nav aria-label="Page navigation example">

                    <ul className="pagination flex-wrap">

                        <li className="page-item">
                            <button
                                className="page-link"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>
                        </li>

                        {/*{
                      array.map((_, index) => (
                    <li className="page-item" key={index}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))
                }*/}


                        {
                            array
                                .slice(
                                    Math.floor((currentPage - 1) / 5) * 5,
                                    Math.floor((currentPage - 1) / 5) * 5 + 5
                                )
                                .map((_, index) => {

                                    const pageNumber =
                                        Math.floor((currentPage - 1) / 5) * 5 + index + 1

                                    return (
                                        <li
                                            className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                                            key={pageNumber}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(pageNumber)}
                                            >
                                                {pageNumber}
                                            </button>
                                        </li>
                                    )
                                })
                        }

                        <li className="page-item">
                            <button
                                className="page-link"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>

                    </ul>

                </nav>

            </div>

        </div>
    )
}

export default PaginationList