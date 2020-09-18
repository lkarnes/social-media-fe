import React, {useEffect} from 'react'
import axiosWithAuth from '../functions/axiosWithAuth'
import MakePost from './subComponents/MakePost'
import {connect} from 'react-redux'
import {fillFeed} from '../redux/actions'

import Post from './subComponents/Post'

function Feed(props) {
    console.log(props.feedArray)
    useEffect(()=>{
        if(!localStorage.getItem('token')){
          props.history.push('/')
        }
        axiosWithAuth().get(`/posts/${props.id}`).then(res => {
          console.log(res)
          props.fillFeed(res.data)
        })
      }, [props])
    return (
        <div className='feed'>
          <div className='left-panel'>

          </div>

          <div className='main-feed'>
            <MakePost />
            {props.feedArray.map(post => (
              <Post key={post.id} data={post} />
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

export default connect(mapStateToProps, {fillFeed})(Feed)