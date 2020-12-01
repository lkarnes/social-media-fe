import React from 'react';
import {connect} from 'react-redux'
import axiosWithAuth from '../../functions/axiosWithAuth'

import Delete from '../../images/delete.png'

function Comment({data, postState}){
    const handleDelete = e => {
        axiosWithAuth().delete(`/comments/remove/${data.id}/${data.post_id}`).then(res => {
            var newComments = postState.data.comments.filter(com => com.id !== data.id);
            postState.setData({ ...postState.data, comments:newComments})
        })
    }
    return (
        <div className='comment'>
            <div className='comment-tag'>
                <img className='user-icon-xsmall' src={data.image} alt='user icon' />
                <p className='username'>{data.first_name} {data.last_name} aka {data.username}</p>
                <img className='delete-button' src={Delete} onClick={handleDelete} alt='delete' />
            </div>
            <p className='body'>{data.body}</p>
        </div>
    )
}

export default connect()(Comment)