import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import ThumbSolid from '../../images/thumbs-up-solid.png';
import ThumbTrans from '../../images/thumbs-up-transparent.png';
import {likePost} from '../../redux/actions'
import axiosWithAuth from '../../functions/axiosWithAuth'

import Comments from './Comments';
import MakeComments from './MakeComment';

function PostFooter(props){
    const [data, setData] = useState(props.data)
    useEffect(()=>{
        axiosWithAuth().get(`/comments/${props.data.id}`).then(res => {
            setData({...data, comments: res.data})
        })
        if(props.likes.filter(l => l.id === props.data.id).length > 0){
            setLikeToggle(true)
        }
    },[data, props.data.id, props.likes])
    const [commentsToggle, setCommentsToggle] = useState(false)
    const [likeToggle, setLikeToggle] = useState()
    
    const handleLike = () => {
        if(props.likes.includes(props.data.id)){
            setLikeToggle(false)
            setData({...data, likes: data.likes--})
            axiosWithAuth().delete(`/unlike/post/${props.userData.id}/${props.data.id}`).then(res => {
                console.log(res)
            })
        }else{
            setLikeToggle(true)
            setData({...data, likes: data.likes++})
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
            <p className='footer-font'>{data.likes} likes</p>
            <p className='footer-font text-button' onClick={()=>{
                if(data){
                    if(data.comments.length >  0){
                        setCommentsToggle(!commentsToggle)
                    }
                    
                }
                }}>{data.comments?data.comments.length: 0} comments</p> 
        </div>
        {commentsToggle? <Comments  postState={{data, setData}}/> : null}
        <MakeComments data={props.data} postState={{data, setData}} />
        </>
    )
}
const mapStateToProps = state => ({
    userData: state.userData,
    likes: state.likes,
})

export default connect(mapStateToProps, {likePost})(PostFooter)