import React, {useEffect} from 'react'
import axiosWithAuth from '../functions/axiosWithAuth'
import MakePost from './subComponents/MakePost'
import {connect} from 'react-redux'
import {fillFeed} from '../redux/actions'

import Post from './subComponents/Post'

function Feed(props) {
    useEffect(()=>{
        if(!localStorage.getItem('token')){
          props.history.push('/')
        }
        if(props.id){
          axiosWithAuth().get(`/posts/recent/${props.id}/3`).then(res => {
            props.fillFeed(res.data.reverse())
            console.log(res)
        }).catch(err => {
          console.log(err)
        })
        }
      }, [props.id])
    return (
        <div className='feed'>
          <div className='left-panel'>

          </div>

          <div className='main-feed'>
            <MakePost />
            {props.feedArray.length === 0 ? <div>No Post Found...</div> :props.feedArray.map(post => (
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