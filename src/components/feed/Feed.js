import React, {useEffect, useState} from 'react'
import axiosWithAuth from '../../functions/axiosWithAuth'
import MakePost from './MakePost'
import {connect} from 'react-redux'
import {fillFeed, addPost, addToFeed} from '../../redux/actions';

import Post from './Post'

function Feed(props) {
    const [offset, setOffset] = useState(0)
    useEffect(()=>{
        if(!localStorage.getItem('token')){
          props.history.push('/')
        }
        if(props.id){
          axiosWithAuth().get(`/posts/recent/${props.id}/0`).then(res => {
            props.fillFeed(res.data)
        }).catch(err => {
          console.log({err})
        })
        }
      }, [props])

      const handleLoadMore = () =>{
        setOffset(offset+15)
        axiosWithAuth().get(`/posts/recent/${props.id}/${offset + 15}`).then(res => {
          props.addToFeed(res.data);
          console.log(res)
        }).catch(err => {
          console.log({err})
        })
      }
    return (
        <div id='feed-box' className='feed'>
          <div className='left-panel'>

          </div>

          <div className='main-feed'>
            <MakePost />
            {props.feedArray.length === 0 ? <div>No Post Found...</div> :props.feedArray.map(post => (
                <Post key={post.id} data={post} />
            ))}
            {props.feedArray.length > 0 ? <button onClick={handleLoadMore}>Load More</button> : null}
          </div>

          <div className='right-panel'>

          </div>

        </div>
        
    )
}

const mapStateToProps = state => ({
  id: state.userData.id,
  feedArray: state.feedArray, 
})

export default connect(mapStateToProps, {fillFeed, addPost, addToFeed})(Feed)