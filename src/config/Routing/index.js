import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '../../pages/AppLayout';
import Home from '../../pages/Home';
import PostTable from '../../pages/Post/PostTable';
import UserTable from '../../pages/User/UserTable';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>} >
                    <Route path="/home" exact element={<Home />} />
                    <Route path="/user" element={<UserTable />} />
                    <Route path="/post" element={<PostTable />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;