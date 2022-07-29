import './index.css';
import React from 'react';
import axios from 'axios';

const Home = () => {
    const [userPost, setUserPost] = React.useState([]);

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
            console.log(result);
            setUserPost(result.data.data);
        })
        .catch(err => console.error(err));
    }, []);

    return (<>
        <div className='container'>
            <div className='row'>
                {userPost.map((post, index) => (
                    <div className="col-md-3 col-sm-6" key={index}>
                        <div className="card card-wrapper mb-3 p-2">
                            <div className='mb-3 img-wrapper d-flex justify-content-center'>
                                <img src={post.image} className="card-img-top img-post" alt="..." />
                            </div>
                            <div className="p-1 text-content">
                                <h5 className="card-title">{post.owner.firstName} {post.owner.lastName}</h5>
                                <p className="card-text">{post.text}</p>
                                <div className='d-flex justify-content-start tags'>
                                    {post.tags.map((tag, index) => (
                                        <div className='d-inline-flex'>
                                            <a href="#" key={index}>#{tag}</a>
                                        </div>   
                                    ))} 
                                </div>
                                            
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>)
}

export default Home;