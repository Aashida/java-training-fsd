import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser";
import PaginationList from "./components/PaginationList";
import UserList from "./components/UserList";

function App() {
    return (
        <BrowserRouter>

            <div className="container mt-4">
                  <h2>Welcome back Admin - Click to add User and see User List</h2>
                <nav className="mb-4">

                    <NavLink
                        to="/users"
                        className="btn btn-primary me-2"
                    >
                        User List
                    </NavLink>

                    <NavLink
                        to="/add-user"
                        className="btn btn-success"
                    >
                        Add User
                    </NavLink>

                    <br></br>

                    <NavLink
                        to="/pagination"
                        className="btn btn-success"
                    >
                        Characters
                    </NavLink>

                    

                </nav>

                <Routes>

                    <Route path="/users" element={<UserList />}/>

                    <Route path="/add-user" element={<AddUser />}/>

                    <Route path="/pagination" element={<PaginationList />}/>

                    

                </Routes>

            </div>

        </BrowserRouter>
    );
}

export default App;