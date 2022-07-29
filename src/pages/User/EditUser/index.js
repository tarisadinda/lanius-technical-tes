import React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

const EditUser = ({ userId }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [title, setTitle] = React.useState();
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [email, setEmail] = React.useState();
    const [picture, setPicture] = React.useState();

    console.log(title);

    React.useEffect(() => {
        axios({
            method: 'get',
            url: `https://dummyapi.io/data/v1/user/${userId}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'app-id': '62996cb2689bf0731cb00285'
            }
        })
        .then(result => {
            console.log(result.data);
            setTitle(result.data.title);
            setFirstName(result.data.firstName);
            setLastName(result.data.lastName);
            setEmail(result.data.email);
            setPicture(result.data.picture);
            setOpenModal(true);
            setLoading(false);
        })
        .catch(err => console.error(err));
    }, [userId]);

    const updateData = (e) => {
        e.preventDefault();

        const sendData = {
            title: title,
            firstName: firstName,
            lastName: lastName,
            email: email,
            picture: picture,
        }

        console.log(sendData);

        axios({
            method: 'put',
            url: `https://dummyapi.io/data/v1/user/${userId}`,
            data: sendData,
            headers: {
                'content-type': 'application/json',
                'app-id': '62996cb2689bf0731cb00285'
            }
        })
        .then((result) => {
            console.log(result.data);
            alert('Berhasil!')
        })
        .catch(err => console.error(err));

    }
    return (<>
        {userId !== '' &&
            <BootstrapDialog
                fullWidth
                onClose={() => setOpenModal()}
                aria-labelledby="customized-dialog-title"
                open={openModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenModal()}>
                    Edit User
                </BootstrapDialogTitle>
                <form onSubmit={updateData}>
                    <DialogContent dividers>
                        <div className="form-group d-block mb-3">
                            <label><b>Title</b></label>
                            <select value={title} onChange={e => setTitle(e.target.value)} class="form-select" aria-label="Default select example">
                                <option disabled>title</option>
                                <option value="mr">mr</option>
                                <option value="ms">ms</option>
                                <option value="mrs">mrs</option>
                                <option value="miss">miss</option>
                                <option value="dr">dr</option>
                            </select>
                        </div>
                        <div className="form-group d-block mb-3">
                            <label><b>First Name</b></label>
                            <input class="form-control" defaultValue={firstName} onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className="form-group d-block mb-3">
                            <label><b>Last Name</b></label>
                            <input class="form-control" defaultValue={lastName} onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div className="form-group d-block mb-3">
                            <label><b>Email</b></label>
                            <input class="form-control" defaultValue={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group d-block">
                            <label><b>Picture</b></label>
                            <input class="form-control" defaultValue={picture} onChange={e => setPicture(e.target.value)} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus type="submit">
                            Submit
                        </Button>
                        <Button autoFocus onClick={() => setOpenModal()}>
                            Close
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        }
    </>)
}

export default EditUser;