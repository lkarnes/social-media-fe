import React from 'react'

export default function ImageModal(props){
    console.log(props)
    return (
        <div className='modal-large'>
        <button onClick={()=>props.toggle(props.id)} className='modal-exit'>X</button>
        <img className='modal-image' src={props.image} alt=''/>
        </div>
    )
}