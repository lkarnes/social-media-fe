import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import axiosWithAuth from '../../functions/axiosWithAuth'

function Post(props) {
    const [posterData, setPosterData] = useState({})
    useEffect(()=> {
        axiosWithAuth().get(`/friends/${props.data.poster_id}`).then(res => {
            setPosterData(res.data)
            console.log(props.data)
        })
    }, [props])
    return (
        <div className='single-post'>
            <h4 className='user-tag'>{posterData.username}</h4>
            {props.data.type === 'image' ? <img src={props.data.image} alt=''/> : <p></p>}
            <h5 className='title'>{props.data.header}</h5>
            <p className='body'>{props.data.body}</p>
        </div>
    )
}

export default connect()(Post)