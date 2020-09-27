import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import axiosWithAuth from '../../functions/axiosWithAuth'

function Post(props) {
    const [posterData, setPosterData] = useState({})
    let date = new Date(props.data.created_at)
    useEffect(()=> {
        axiosWithAuth().get(`/friends/${props.data.poster_id}`).then(res => {
            setPosterData(res.data)
            console.log(res.data)
        })
    }, [])
    return (
        <div className='single-post'>
            <div className='user-tag'>
                <h4>{posterData.username}</h4>
                {posterData.image?<img src={posterData.image} alt='profile picture'/>: <></>}
                <p>{date.toLocaleString().replace(",","").replace(/:.. /," ")}</p>
            </div>
            <div className='post-data'>
                {props.data.type === 'image' ? <img className='post-image' src={props.data.image} alt=''/> :'' }
                <h5 className='title'>{props.data.header}</h5>
                <p className='body'>{props.data.body}</p>
            </div>
            </div>
            
    )
}

export default connect()(Post)