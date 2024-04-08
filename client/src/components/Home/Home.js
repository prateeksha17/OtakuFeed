import React, {useState, useEffect} from 'react'
import Posts from '../../components/Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import Form from '../../components/Form/Form';
import {Grow } from '@mui/material';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
        <div className='both-main' container>
          <div className='main'>
            <div>
              <Posts  setCurrentId={setCurrentId} />
            </div>
            </div>
            <div className='not-main'>
            <div item="true" xs={12} sm={4}  className='form-container'>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </div>
            </div>
           
          
        </div>
      </Grow>
  )
}
