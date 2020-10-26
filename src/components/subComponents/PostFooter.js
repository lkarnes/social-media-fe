import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import ThumbSolid from '../../images/thumbs-up-solid.png';
import ThumbTrans from '../../images/thumbs-up-transparent.png';
import {likePost} from '../../redux/actions'
import axiosWithAuth from '../../functions/axiosWithAuth'

import Comments from './Comments';
import MakeComments from './MakeComment';

function PostFooter(props){
    const [commentsToggle, setCommentsToggle] = useState(false)
    const [likeToggle, setLikeToggle] = useState()
    useEffect(()=>{
        if(props.likes.includes(props.data.id)){
            setLikeToggle(true)
        }
    },[])
    const handleLike = () => {
        if(props.likes.includes(props.data.id)){
            setLikeToggle(false)
            props.data.likes--
            axiosWithAuth().delete(`/unlike/post/${props.userData.id}/${props.data.id}`).then(res => {
                console.log(res)
            })
        }else{
            setLikeToggle(true)
            props.data.likes++
            axiosWithAuth().get(`/like/${props.userData.id}/${props.data.id}`).then(res => {
                console.log(res)
            })
        }
        props.likePost(props.data.id)
    }
    return (
        <>
        <div className='post-footer'>
            <img src={likeToggle?ThumbSolid:ThumbTrans} style={{width: 20}} alt='like button' onClick={handleLike} />
            <p className='footer-font'>{props.data.likes} likes</p>
            <p className='footer-font text-button' onClick={()=>setCommentsToggle(!commentsToggle)}>{props.data.comments} comments</p> 
        </div>
        <MakeComments/>
        {commentsToggle? <Comments/> : null}
        </>
    )
}
const mapStateToProps = state => ({
    userData: state.userData,
    likes: state.likes,
})

export default connect(mapStateToProps, {likePost})(PostFooter)