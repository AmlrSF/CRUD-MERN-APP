import React from 'react'
import FileSaver from 'file-saver';
import download from '../assets/download.png'
import { useNavigate } from 'react-router-dom';

const Post = ({ _id, name, description, photo,author,categories }) => {
  const handeldownload  = (_id, photo) =>{
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
  }
  const navigate = useNavigate();
  const handelRoute = () => navigate(`/post/${_id}`);
  return (
    <div className='post' onClick={handelRoute}>
        <img 
            className="img"
            src={photo}
            alt={name}
        />
        <div className='post-info'>
            <div>
                <h3>{author}</h3>
                <p>{description}</p>
            </div>
            <img onClick={()=>handeldownload(_id,photo)} src={download} alt="" />
        </div>
    </div>
  )
}

export default Post