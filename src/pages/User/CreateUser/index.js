import React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@mui/material';
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

const CreateUser = ({ open, onClose }) => {
    const [inputs, setInputs] = React.useState({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        picture: '',
    });

    console.log(inputs.title)

    const handleInput = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value });
    }

    const inputData = (e) => {
        e.preventDefault();

        const sendData = {
            title: inputs.title,
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            email: inputs.email,
            picture: inputs.picture
        }

        axios({
            method: 'post',
            url: 'https://dummyapi.io/data/v1/user/create',
            data: sendData,
            headers: {
                'content-type': 'application/json',
                'app-id': '62996cb2689bf0731cb00285'
            }
        })
        .then((result) => {
            onClose();
            toast.success('Successfully add new user!', {
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
            toast.error('Failed to add new user', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
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
                Create User
            </BootstrapDialogTitle>
            <form onSubmit={inputData}>
                <DialogContent dividers>
                    <div className="form-group d-block mb-3">
                        <label><b>Title</b></label>
                        <select name='title' onChange={handleInput} class="form-select" aria-label="Default select example">
                            <option value="">title</option>
                            <option value="mr">mr</option>
                            <option value="ms">ms</option>
                            <option value="mrs">mrs</option>
                            <option value="miss">miss</option>
                            <option value="dr">dr</option>
                        </select>
                    </div>
                    <div className="form-group d-block mb-3">
                        <label><b>First Name</b></label>
                        <input class="form-control" name='firstName' onChange={handleInput} />
                    </div>
                    <div className="form-group d-block mb-3">
                        <label><b>Last Name</b></label>
                        <input class="form-control" name='lastName' onChange={handleInput} />
                    </div>
                    <div className="form-group d-block mb-3">
                        <label><b>Email</b></label>
                        <input class="form-control" name='email' onChange={handleInput} />
                    </div>
                    <div className="form-group d-block">
                        <label><b>Picture</b></label>
                        <input class="form-control" name='picture' onChange={handleInput} />
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

export default CreateUser;