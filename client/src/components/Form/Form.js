import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import './style.css';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
  
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });

  const dispatch = useDispatch();
  const postToUpdate = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (postToUpdate) {
      setPostData(postToUpdate);
    }
  }, [postToUpdate]);

  const clearForm = () => {
    setPostData({
    
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (currentId) {
      console.log('submit done')
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      console.log('submit done')
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clearForm();
    setCurrentId(null);
  };

  if (!user?.result?.name) {
    return (
      <Paper className='paper-signIn'>
        <Typography variant="h6" align="center" >
          Sign In to submit a post.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <form className="form-body" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography className="form-heading" variant="h6">
          {currentId ? 'Editing a Post' : 'Creating a Post'}
        </Typography>

       

        <TextField
        className='form-textfield'
          name='itle'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
        className='form-textfield'
          name='message'
          variant='outlined'
          label='Message (100 characters only)'
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />

        <TextField
        className='form-textfield'
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className='filebase'>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
       

        

        <div className="buttons">
          <Button style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            className="form-button"
            variant="contained"
          
            size="large"
            type="submit"
            fullWidth
          >
            {currentId ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;
   

