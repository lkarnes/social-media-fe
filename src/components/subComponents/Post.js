import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import axiosWithAuth from '../../functions/axiosWithAuth';
import userIcon from '../../images/user-icon.png'
import ImageModal from './ImageModal'


function Post(props) {
    const [posterData, setPosterData] = useState({})
    let date = new Date(props.data.created_at)
    useEffect(()=> {
        axiosWithAuth().get(`/friends/${props.data.poster_id}`).then(res => {
            setPosterData(res.data)
        })
    }, [])
    return (
        <div className='single-post'>
            <div className='user-tag'>
                {posterData.image?<img className='user-icon-small' src={posterData.image} alt='profile picture'  />: <img className='user-icon-small' src={userIcon} />}
                <p className='username'>{posterData.username}</p>
                <p className='date-posted'>{date.toLocaleString().replace(",","").replace(/:.. /," ")}</p>
            </div>
            <div className='post-data'>
                <p className='title'>{props.data.header}</p>
                <p className='body'>{props.data.body}</p>
                 {props.data.type === 'image' ? <img className='post-image' src={props.data.image} alt='' onClick={()=>props.data.toggleImageModal(props.data.id)}/> :'' }
            </div>
            </div>
            
    )
}

export default connect()(Post)