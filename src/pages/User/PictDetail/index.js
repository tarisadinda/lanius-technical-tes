import React from 'react';
import axios from 'axios';
import './index.css';
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

const PictDetail = ({ userId }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [userImg, setUserImg] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    console.log(userId)
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
            setUserImg(result.data.picture);
            setOpenModal(true);
            setLoading(false);
        })
        .catch(err => console.error(err));
    }, [userId]);

    return (<>
        {userId !== '' &&
            <BootstrapDialog
                fullWidth
                onClose={() => setOpenModal()}
                aria-labelledby="customized-dialog-title"
                open={openModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenModal()}>
                </BootstrapDialogTitle>
                <DialogContent>
                    <div className="d-flex justify-content-center wrap">
                        <img src={userImg} />
                    </div>
                </DialogContent>
            </BootstrapDialog>
        }
    </>)
}

export default PictDetail;