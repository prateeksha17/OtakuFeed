import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@mui/material';
import Post from './Post/Post';

export default function Posts({ setCurrentId }) {
  const posts = useSelector((state) => state.posts);

  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      {/* If posts are not yet fetched, display CircularProgress */}
      {!posts.length ? (
        <Grid item>
          <CircularProgress />
        </Grid>
      ) : (
        // If posts are fetched, display each post
        posts.map((post) => (
          <Grid  item key={post._id} lg={4} md={6} sm={12} >
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
