import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import axiosWithAuth from '../../functions/axiosWithAuth'

import Comment from './Comment';

function Comments(props){
    const [comments, setComments] = useState([])
    useEffect(()=>{
            axiosWithAuth().get(`/comments/${props.post_id}`).then(res => {
                setComments(res.data)
                console.log(res)
            })  
    },[])

    return (
        <div className='comments'>
            {comments.map(comment => (
                <Comment data={comment} comments={comments} setComments={setComments} postState={props.postState} />
            ))}
        </div>
    )
}

export default connect()(Comments)