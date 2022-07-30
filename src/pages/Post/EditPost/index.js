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

const EditPost = ({ postId }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [owner, getOwner] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [ownerId, setOwnerId] = React.useState();
    const [text, setText] = React.useState();
    const [image, setImage] = React.useState();
    const [like, setLike] = React.useState();
    const [tag, setTag] = React.useState();

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

    React.useEffect(() => {
        axios({
            method: 'get',
            url: `https://dummyapi.io/data/v1/post/${postId}`,
            headers: {
                'content-type': 'application/json',
                'app-id': '62996cb2689bf0731cb00285'
            }
        })
        .then(result => {
            console.log(result.data);
            setOwnerId(result.data.owner.id);
            setText(result.data.text);
            setImage(result.data.image);
            setLike(result.data.likes);
            setTag(result.data.tags);
            setOpenModal(true);
            setLoading(false);
        })
        .catch(err => console.error(err));
    }, [postId]);

    const updateData = (e) => {
        e.preventDefault();

        const sendData = {
            owner: ownerId,
            text: text,
            image: image,
            likes: like,
            tags: tag,
        }

        axios({
            method: 'put',
            url: `https://dummyapi.io/data/v1/post/${postId}`,
            data: sendData,
            headers: {
                'content-type': 'application/json',
                'app-id': '62996cb2689bf0731cb00285'
            }
        })
        .then((result) => {
            setOpenModal(false);
            toast.success('Successfully edit post data!', {
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
            setOpenModal(false);
            toast.error('Failed to edit post data', {
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
        {postId !== '' &&
            <BootstrapDialog
                fullWidth
                onClose={() => setOpenModal()}
                aria-labelledby="customized-dialog-title"
                open={openModal}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setOpenModal()}>
                    Edit Post
                </BootstrapDialogTitle>
                <form onSubmit={updateData}>
                    <DialogContent dividers>
                        <div className="form-group d-block mb-3">
                            <label><b>Owner</b></label>
                            <select disabled defaultValue={ownerId} onChange={e => setOwnerId(e.target.value)}  class="form-select" aria-label="Default select example">
                                <option value="">owner</option>
                                {owner.map((item, index) => (
                                    <option value={item.owner.id}>{item.owner.firstName} {item.owner.lastName}</option>
                                ))}
                                    
                            </select>
                        </div>
                        <div className="form-group d-block mb-3">
                            <label><b>Text</b></label>
                            <textarea class="form-control" defaultValue={text} onChange={e => setText(e.target.value)} />
                        </div>
                        <div className="form-group d-block mb-3">
                            <label><b>Image</b></label>
                            <input class="form-control" defaultValue={image} onChange={e => setImage(e.target.value)} />
                        </div>
                        <div className="form-group d-block mb-3">
                            <label><b>Likes</b></label>
                            <input class="form-control" defaultValue={like} onChange={e => setLike(e.target.value)} />
                        </div>
                        <div className="form-group d-block">
                            <label><b>Tags</b></label>
                            <input class="form-control" defaultValue={tag} onChange={e => setTag(e.target.value)} />
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

export default EditPost;