import React from 'react'
import connect from 'react-redux'

export default function ImageModal(props){
    return (
        <div style={{display: 'none'}} id={'image-modal-' + props.id} className='modal-medium'>
        <button onClick={()=>props.toggle(props.id)} >X</button>
        </div>
    )
}