import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

const Wrapper = styled.div`
@media (min-width: 700px) {
    display: flex;
    position: relative;
    height: calc(100% - 64px);
    width: 100%;
    flex: auto;
    flex-direction: column;
}
`;

const Main = styled.main`
    position: fixed;
    width: 100%;
    padding: 1em;
    overflow-y: scroll;
    @media (min-width: 700px) {
        flex: 1;
        margin-left: 248px;
        height: calc(100%);
        width: calc(100% - 248px);
        padding-bottom: 45px;
    }
`;

const AppLayout = () => {
    return (<>
        <Sidebar />
        <Wrapper>
            <Main>
                <Outlet />
            </Main>
        </Wrapper>
    </>)
}

export default AppLayout;