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
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';

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
                key: index,
                Name: user.firstName,
                Picture: <img className='user-img' src={user.picture} onClick={() => setModalImg({id: user.id})} />,
                Action: <div className="d-inline-flex">
                            <div>
                                <Button 
                                    variant="contained" 
                                    size="small" 
                                    startIcon={<EditIcon/>}
                                    onClick={() => setModalEdit({id: user.id})}
                                >
                                    Edit
                                </Button>
                            </div>
                            <div className='mx-1'>|</div>
                            <div>
                                <Button 
                                    variant="contained" 
                                    size="small" 
                                    color="error" 
                                    startIcon={<DeleteIcon/>}
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </Button>
                            </div>
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
            setUserData(result.data.data);
        })
        .catch(err => console.error(err));
    }, []);

    const deleteUser = (id) => {
        Swal.fire({
            text: 'Are you sure want to delete this data?',
            icon: 'warning',
            showDenyButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            denyButtonText: 'No',
            confirmButtonText: 'Yes'
        })
        .then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: 'delete',
                    url: `https://dummyapi.io/data/v1/user/${id}`,
                    headers: {
                        'content-type': 'application/json',
                        'app-id': '62996cb2689bf0731cb00285'
                    }
                })
                .then((result) => {
                    toast.success('Successfully delete data!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    const newUserData = userData.filter((user) => user.id !== id)
                    setUserData(newUserData)
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Failed to delete data', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
            }             
        })
        .catch(err => console.error(err));
    }

    return (<>
        <ToastContainer />
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