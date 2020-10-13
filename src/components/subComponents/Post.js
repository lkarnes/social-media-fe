import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import axiosWithAuth from '../../functions/axiosWithAuth';
import userIcon from '../../images/user-icon.png'
import ImageModal from './ImageModal'
import Portal from '../Portal'


function Post({data}) {
    const [toggle, setToggle] = useState(false)
    const [posterData, setPosterData] = useState({})
    let date = new Date(data.created_at)
    useEffect(()=> {
        axiosWithAuth().get(`/friends/${data.poster_id}`).then(res => {
            setPosterData(res.data)
        })
    }, [])

    const toggleImageModal = () => {
        const feed = document.getElementById('feed-box')
        if(toggle){
            feed.classList.remove('blur')
        }else{
            feed.classList.add('blur')
        }
        setToggle(!toggle)
    }

    return (
        <div className='single-post'>
            <div className='user-tag'>
                {posterData.image?<img className='user-icon-small' src={posterData.image} alt='profile picture'  />: <img className='user-icon-small' src={userIcon} />}
                <p className='username'>{posterData.username}</p>
                <p className='date-posted'>{date.toLocaleString().replace(",","").replace(/:.. /," ")}</p>
            </div>
            <div className='post-data'>
                <p className='title'>{data.header}</p>
                <p className='body'>{data.body}</p>
                 {data.type === 'image' ? <img className='post-image' src={data.image} alt='' onClick={()=>toggleImageModal()}/> :'' }
            </div>
            <Portal>
                {toggle?<ImageModal {...data} toggle={toggleImageModal} />:null}
                
            </Portal>
            </div>
            
    )
}

export default connect()(Post)