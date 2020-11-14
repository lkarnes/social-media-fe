import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import axiosWithAuth from '../../functions/axiosWithAuth';
import ImageModal from '../misc/ImageModal';
import Portal from '../misc/Portal';
import PostFooter from './PostFooter';

import {removeFromFeed} from '../../redux/actions'

import userIcon from '../../images/user-icon.png';
import deleteButton from '../../images/delete.png';

function Post({data, id, removeFromFeed}) {
    const [toggle, setToggle] = useState(false)
    const [removed, setRemoved] = useState(false)
    const [posterData, setPosterData] = useState({})
    let date = new Date(data.created_at)
    useEffect(()=> {
        setPosterData({})
        axiosWithAuth().get(`/friends/${data.poster_id}`).then(res => {
            setPosterData(res.data)
        })
    }, [data.poster_id, id])
    const toggleImageModal = () => {
        const feed = document.getElementById('feed-box')
        if(toggle){
            feed.classList.remove('blur')
        }else{
            feed.classList.add('blur')
        }
        setToggle(!toggle)
    }
    const handleDelete = () => {
        axiosWithAuth().delete(`/posts/remove/${data.id}`).then(res => {
            removeFromFeed(data.id)
            setRemoved(true)
        })
    }

    return !removed?(
        <div className='single-post'>
            <div className='user-tag'>
                {posterData.image?<img className='user-icon-small' src={posterData.image} alt='icon'  />: <img className='user-icon-small' src={userIcon} alt='icon'/>}
                <p className='username'>{posterData.username}</p>
                <p className='date-posted'>{date.toLocaleString().replace(",","").replace(/:.. /," ")}</p>
                {id === parseInt(data.poster_id)?<img src={deleteButton} className='delete-button' onClick={handleDelete} alt='delete'/>: null}
            </div>
            <div className='post-data'>
                <p className='title'>{data.header}</p>
                <p className='body'>{data.body}</p>
                 {data.type === 'image' ? <img className='post-image' src={data.image} alt='' onClick={()=>toggleImageModal()}/> :'' }
            </div>
            <PostFooter data={data} />
            <Portal>
                {toggle?<ImageModal {...data} toggle={toggleImageModal} />:null}
            </Portal>
            </div>
        ):<div className='single-post'>this post has been removed...</div>
}

const mapStateToProps = state =>({
    id: state.userData.id
})

export default connect(mapStateToProps, {removeFromFeed})(Post)