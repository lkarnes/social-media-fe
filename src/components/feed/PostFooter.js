import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import ThumbSolid from '../../images/thumbs-up-solid.png';
import ThumbTrans from '../../images/thumbs-up-transparent.png';
import {likePost} from '../../redux/actions'
import axiosWithAuth from '../../functions/axiosWithAuth'

import Comments from './Comments';
import MakeComments from './MakeComment';
import LikeButton from './LikeButton';

function PostFooter(props){
    const [data, setData] = useState(props.data)
    const [commentsToggle, setCommentsToggle] = useState(false)
    useEffect(()=>{
        axiosWithAuth().get(`/comments/${props.data.id}`).then(res => {
            setData({...data, comments: res.data})
        })
    },[data.likes])
    
    return (
        <>
        <div className='post-footer'>
            <LikeButton data={data} setData={setData} />
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
})

export default connect(mapStateToProps, {likePost})(PostFooter)