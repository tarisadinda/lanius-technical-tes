import React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
};

const CreatePost = ({ open, onClose }) => {
    const [owner, getOwner] = React.useState([]);
    const [inputs, setInputs] = React.useState({
        ownerId: '',
        text: '',
        imageUrl: '',
        like: '',
        tag: '',
    });

    const handleInput = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value });
    }

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
            getOwner(result.data.data);
        })
        .catch(err => console.error(err));
    }, []);

    const inputData = (e) => {
        e.preventDefault();

        const sendData = {
            owner: inputs.ownerId,
            text: inputs.text,
            image: inputs.imageUrl,
            likes: inputs.like,
            tags: inputs.like,
        }

        axios({
            method: 'post',
            url: 'https://dummyapi.io/data/v1/post/create',
            data: sendData,
            headers: {
                'content-type': 'application/json',
                'app-id': '62996cb2689bf0731cb00285'
            }
        })
        .then((result) => {
            onClose();
            toast.success('Successfully create new post!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch((err) => {
            console.error(err);
            onClose();
            toast.error('Failed to create new post', {
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

    return (<>
        <ToastContainer />
        <BootstrapDialog
            fullWidth
            onClose={() => onClose()}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={() => onClose()}>
                Create Post
            </BootstrapDialogTitle>
            <form onSubmit={inputData}>
                <DialogContent dividers>
                    <div className="form-group d-block mb-3">
                        <label><b>Owner</b></label>
                        <select name='ownerId' onChange={handleInput} class="form-select" aria-label="Default select example">
                            <option value="">owner</option>
                            {owner.map((item, index) => (
                                <option value={item.owner.id}>{item.owner.firstName} {item.owner.lastName}</option>
                            ))}
                                
                        </select>
                    </div>
                    <div className="form-group d-block mb-3">
                        <label><b>Text</b></label>
                        <textarea class="form-control" name='text' onChange={handleInput} />
                    </div>
                    <div className="form-group d-block mb-3">
                        <label><b>Image</b></label>
                        <input class="form-control" name='imageUrl' onChange={handleInput} />
                    </div>
                    <div className="form-group d-block mb-3">
                        <label><b>Likes</b></label>
                        <input class="form-control" name='like' onChange={handleInput} />
                    </div>
                    <div className="form-group d-block">
                        <label><b>Tags</b></label>
                        <input class="form-control" name='tag' onChange={handleInput} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus type="submit">
                        Submit
                    </Button>
                    <Button autoFocus onClick={() => onClose()}>
                        Close
                    </Button>
                </DialogActions>
            </form>
        </BootstrapDialog>
    </>)
}

export default CreatePost;