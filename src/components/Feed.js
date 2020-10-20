import React, {useEffect, useState} from 'react'
import axiosWithAuth from '../functions/axiosWithAuth'
import MakePost from './subComponents/MakePost'
import {connect} from 'react-redux'
import {fillFeed, addPost} from '../redux/actions'

import Post from './subComponents/Post'

function Feed(props) {
    useEffect(()=>{
        if(!localStorage.getItem('token')){
          props.history.push('/')
        }
        if(props.id){
          axiosWithAuth().get(`/posts/recent/${props.id}/0`).then(res => {
            props.fillFeed(res.data.reverse())
        }).catch(err => {
          console.log({err})
        })
        }
      }, [props.id])
    return (
        <div id='feed-box' className='feed'>
          <div className='left-panel'>

          </div>

          <div className='main-feed'>
            <MakePost />
            {props.feedArray.length === 0 ? <div>No Post Found...</div> :props.feedArray.map(post => (
              <div>
                <Post key={post.id} data={{...post}} />
              </div>
              
            ))}
          </div>

          <div className='right-panel'>

          </div>

        </div>
        
    )
}

const mapStateToProps = state => ({
  id: state.userData.id,
  feedArray: state.feedArray  
})

export default connect(mapStateToProps, {fillFeed, addPost})(Feed)