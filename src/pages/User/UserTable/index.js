import React from 'react';
import axios from 'axios';
import './index.css';
import { MDBDataTableV5 } from 'mdbreact';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUser from '../EditUser';
import PictDetail from '../PictDetail';
import CreateUser from '../CreateUser';

const UserTable = () => {
    const [userData, setUserData] = React.useState([]);
    const [modalEdit, setModalEdit] = React.useState({id: ""});
    const [modalImg, setModalImg] = React.useState({id: ""});
    const [modalCreate, setModalCreate] = React.useState(false);

    const datatable = {
        columns: [
          {
            label: 'Name',
            field: 'Name',
            width: 150,
          },
          {
            label: 'Picture',
            field: 'Picture',
            width: 250,
          },
          {
            label: 'Action',
            field: 'Action',
            sort: 'disabled',
            width: 100,
          },
        ],
        rows: [...userData.map((user, index) => 
            ({
                Name: user.firstName,
                Picture: <img className='user-img' src={user.picture} onClick={() => setModalImg({id: user.id})} />,
                Action:   <div className="">
                            <Button 
                                variant="contained" 
                                size="small" 
                                startIcon={<EditIcon/>}
                                onClick={() => setModalEdit({id: user.id})}
                            >
                                Edit
                            </Button>
                            <Button variant="contained" size="small" color="error" startIcon={<DeleteIcon/>}>
                                Delete
                            </Button>
                        </div>,
            })
          ),
        ]
    };

    React.useEffect(() => {
        axios({
            method: 'get',
            url: 'https://dummyapi.io/data/v1/user',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'app-id': '62996cb2689bf0731cb00285'
            }
        })
        .then(result => {
            console.log(result);
            setUserData(result.data.data);
        })
        .catch(err => console.error(err));
    }, []);

    return (<>
        <div className="container">
            <div className="d-flex justify-content-start">
                <Button variant="contained" onClick={() => setModalCreate(true)}>Create User</Button>
            </div>
            <div className='table mt-3'>
                <MDBDataTableV5
                    hover
                    responsive
                    striped
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={5}
                    data={datatable}
                    searchTop
                    searchBottom={false}
                />
            </div>
        </div>
        <EditUser userId={modalEdit.id} />
        <PictDetail userId={modalImg.id} />
        <CreateUser open={modalCreate} onClose={() => setModalCreate(false)} />
    </>)
}
export default UserTable;