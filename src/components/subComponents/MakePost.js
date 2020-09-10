import React, {useState, useEffect} from 'react';
import axiosWithAuth from '../../functions/axiosWithAuth'
import {connect} from 'react-redux';

function MakePost(props){
    
    const [data] = useState({})
        
    const adjustHeight = () => {
        const textarea = document.getElementById('textarea')
        if(textarea.value.length > 40) {
            textarea.rows = (Math.round(textarea.value.length / 45)+1)
        }else{
            textarea.rows = 2;
        }
    }
    const handleChange = e => {
        if (e.target.name === 'body'){
            adjustHeight()
            var err = document.getElementById('max-length')
            if (e.target.value.length < 399){
                data[e.target.name] = e.target.value
                err.style.display = 'none'
            }else{
                err.style.display = 'block'
                e.target.value = data.body
            }
        }
    }

    const handleSelect = e => {
        e.preventDefault()
        var hiddenInput = document.getElementById('file-input')
        hiddenInput.click()
    }
    const handleUpload = e => {
        data['image'] = e.target.value
        const photoBox = document.getElementById('added-photo')
        if(data.hasOwnProperty('image')){   
            photoBox.src = URL.createObjectURL(e.target.files[0])
            photoBox.style.display = 'block'
            console.log(data.image)
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        axiosWithAuth().post('/posts/createpost/', data).then(res=>{
            console.log(res)
        })
    }
    
    return (
        <div className='post-box'>
                <h4>Create a Post</h4>
            <form onSubmit={handleSubmit}>
                <p className='error' id='max-length' style={{'display':'none'}}>The body is at max length</p>
                <input id='title' placeholder='Title(Optional)' type='text' name='header' value={data.header} onChange={handleChange} />
                <textarea id='textarea' rows='2' placeholder='Body(Required)' name='body' value={data.body} onChange={handleChange} />
                <input id='file-input' type='file' style={{display:'none'}} onChange={handleUpload}/>    
                <button className='upload-button' onClick={handleSelect}>Add a Image</button>
                <button className='submit-button' type='submit' onClick={handleSubmit}>Post</button>
            </form>
            <img id='added-photo' className='photo-upload' style={{display:'none'}} src='#' alt='post'/>
        </div>
    )
}

const mapStateToProps = state => ({
    id: state.id
})

export default connect(mapStateToProps)(MakePost);