import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/Edit';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import './style.css';

const Post = ({ post, setCurrentId}) => {

 const dispatch = useDispatch();
 const user = JSON.parse(localStorage.getItem('profile'));

 const handleEditClick = () => {
    setCurrentId(post._id);
    console.log(user?.result?.name  )
    console.log(post?.name)
 };

 const Likes = () => {
    const isLiked = post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id));

    if (isLiked) {
      return (
        <>
          <ThumbUpAltIcon fontSize='small' />&nbsp; {post.likes.length}
        </>
      );
    } else {
      return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp; {post.likes.length} </>;
    }

 };

 return (
    <Card className='card'>
      <CardMedia className='card-media' component='img' height='160' image={post.selectedFile} title={post.title} />
      <div className='card-top'>
      
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className='card-tags'>
        <Typography variant='body2' color='textSecondary'>
          {post.tags.map((tag) => `#${tag} `)} 
        </Typography>
      </div>
      <div className='card-bottom'>
        <Typography variant='h5' gutterBottom>
          {post.title}
        </Typography>
      </div>
      <CardContent className='card-bottom'>
        <Typography variant='body2' color='textSecondary' component='p'>
          {post.message.substring(0, 100)}
        </Typography>
      </CardContent>
      <CardActions className='card-action'>
        <Button style={{ color: 'rgba(0, 0, 0, 0.5)' }}
          size='small'
         
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes/> 
        </Button>

        {(user?.result?.name === post?.name) && (
          <Button style={{ color: 'rgba(0, 0, 0, 0.5)' }} size='small'  onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' /> 
          </Button>
        )}
        <div>
          {(user?.result?.name === post?.name) && (
            <Button style={{  color: 'rgba(0, 0, 0, 0.5)' }} size='small' onClick={handleEditClick}>
              <MoreHorizIcon className='card-button' fontSize='default' />
            </Button>
          )}
        </div>
      </CardActions>
    </Card>
 );
}

export default Post;