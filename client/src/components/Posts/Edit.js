import React from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/Edit';
import InstagramIcon from '@mui/icons-material/Instagram';
import Button from '@mui/material/Button';
import { deletePost } from '../../actions/posts';
import './Edit.css'

export default function Edit({ post, setCurrentId }) {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setCurrentId(post._id);
    console.log(user?.result?.name);
    console.log(post?.name);
  };

  return (
    <div className='edit-container'>
      <div>
        <Button
          className='card-button'
          style={{ color: 'rgba(0, 0, 0, 0.5)' }}
          size='small'
          onClick={() => {
            console.log(user?.result?.name);
            console.log(post?.name);
          }}
        >
          <InstagramIcon fontSize='default' />
        </Button>
      </div>
      <div>
        {user?.result?.name === post?.name && (
          <Button
            className='card-button'
            style={{ color: 'rgba(0, 0, 0, 0.5)' }}
            size='small'
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize='small' />
          </Button>
        )}
      </div>
      <div>
        {user?.result?.name === post?.name && (
          <Button
            className='card-button'
            style={{ color: 'rgba(0, 0, 0, 0.5)' }}
            size='small'
            onClick={handleEditClick}
          >
            <MoreHorizIcon fontSize='default' />
          </Button>
        )}
      </div>
    </div>
  );
}
