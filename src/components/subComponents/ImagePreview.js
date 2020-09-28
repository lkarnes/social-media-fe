import React from 'react'
import Delete from '../../images/delete.png';

export default function ImagePreview(props){
    const handleDelete = e => {
        
    }
    return (
        <div id='photo-box' style={{display:'none'}} className='image-preview'>
            <img id='added-photo' className='photo-upload'src='#' alt='post'/>
            <img id='delete-photo' className='delete-button' src={Delete} alt='delete' onClick={handleDelete}/>
        </div>
    )
}