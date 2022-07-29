import React from 'react';
import axios from 'axios';
import './index.css';
import { MDBDataTableV5 } from 'mdbreact';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreatePost from '../CreatePost';

const PostTable = () => {
    const [postData, setPostData] = React.useState([]);
    const [modalEdit, setModalEdit] = React.useState({id: ""});
    const [modalImg, setModalImg] = React.useState({id: ""});
    const [modalCreate, setModalCreate] = React.useState(false);

    const datatable = {
        columns: [
          {
            label: 'Text',
            field: 'Text',
            width: 150,
          },
          {
            label: 'Tags',
            field: 'Tags',
            width: 250,
          },
          {
            label: 'Image',
            field: 'Image',
            width: 250,
          },
          {
            label: 'User',
            field: 'User',
            width: 250,
          },
          {
            label: 'Action',
            field: 'Action',
            sort: 'disabled',
            width: 100,
          },
        ],
        rows: [...postData.map((post, index) => 
            ({
                Text: <div className='d-flex justify-content-start'>{post.text}</div>,
                Tags: 
                    <div className='d-flex justify-content-start'>
                        {post.tags.map((item) => (
                            <p className='mr-1'>#{item}</p>
                        ))}
                    </div>, 
                Image: <img className='post-img' src={post.image} onClick={() => setModalImg({id: post.id})} />,
                User: post.owner.firstName,
                Action:   <div className="">
                            <Button 
                                variant="contained" 
                                size="small" 
                                className='m-2'
                                startIcon={<EditIcon/>}
                                onClick={() => setModalEdit({id: post.id})}
                            >
                                Edit
                            </Button>
                            <Button 
                                variant="contained" 
                                size="small" 
                                color="error" 
                                startIcon={<DeleteIcon/>}
                                onClick={() => deletePost(post.id)}
                            >
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
            url: 'https://dummyapi.io/data/v1/post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'app-id': '62996cb2689bf0731cb00285'
            }
        })
        .then(result => {
            setPostData(result.data.data);
        })
        .catch(err => console.error(err));
    }, []);

    const deletePost = (id) => {
        axios({
            method: 'delete',
            url: `https://dummyapi.io/data/v1/post/${id}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'app-id': '62996cb2689bf0731cb00285'
            }
          })
          .then((result) => {
            console.log('Data berhasil dihapus!')
            const newPostData = postData.filter((post) => post.id !== id)
            setPostData(newPostData)
          })
          .catch(err => console.error(err))
    }

    return (<>
        <div className="container">
            <div className="d-flex justify-content-start">
                <Button variant="contained" onClick={() => setModalCreate(true)}>Create Post</Button>
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
        <CreatePost open={modalCreate} onClose={() => setModalCreate(false)} />
    </>)
}
export default PostTable;