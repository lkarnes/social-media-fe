import React, {useEffect, useState} from 'react'
import axiosWithAuth from '../functions/axiosWithAuth'
import MakePost from './subComponents/MakePost'
import ImageModal from './subComponents/ImageModal'
import {connect} from 'react-redux'
import {fillFeed} from '../redux/actions'

import Post from './subComponents/Post'

function Feed(props) {
  const [toggle, setToggle] = useState(false)
    useEffect(()=>{
        if(!localStorage.getItem('token')){
          props.history.push('/')
        }
        if(props.id){
          axiosWithAuth().get(`/posts/recent/${props.id}/0`).then(res => {
            props.fillFeed(res.data.reverse())
            console.log(res)
        }).catch(err => {
          console.log({err})
        })
        }
      }, [props.id])

      const toggleImageModal = (id) => {
        
        const modal = document.getElementById(`image-modal-${id}`)
        const background = document.getElementById('feed-box')
        console.log(modal)
        if(toggle){
            modal.style.display = 'none'
            background.classList.remove('blur')
        }else{
            modal.style.display = 'block'
            background.classList.add('blur')
        }
        setToggle(!toggle)
    }
    return (
        <div id='feed-box' className='feed'>
          <div className='left-panel'>

          </div>

          <div className='main-feed'>
            <MakePost />
            {props.feedArray.length === 0 ? <div>No Post Found...</div> :props.feedArray.map(post => (
              <div>
                <Post key={post.id} data={{...post, toggleImageModal}} />
                <ImageModal id={post.id} toggle={toggleImageModal} />
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

export default connect(mapStateToProps, {fillFeed})(Feed)