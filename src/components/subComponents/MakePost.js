import React, {useState} from 'react';
import axiosWithAuth from '../../functions/axiosWithAuth';
import {connect} from 'react-redux';
import {addPost} from '../../redux/actions';
import ImagePreview from './ImagePreview';

function MakePost(props){
    const formElement = React.useRef()
    const [data] = useState({})
   
        
    const adjustHeight = () => {
        const textarea = document.getElementById('textarea')
        if(textarea.value.length > 40) {
            textarea.rows = (Math.round(textarea.value.length / 45)+1)
        }else{
            textarea.rows = 2;
        }
    }

    const handleSelect = e => {
        e.preventDefault()
        var hiddenInput = document.getElementById('file-input')
        hiddenInput.click()
    }
    const handleUpload = e => {
        const photoBox = document.getElementById('photo-box')
        const image = document.getElementById('added-photo')
        if(e.target.value){   
            image.src = URL.createObjectURL(e.target.files[0])
            photoBox.style.display = 'flex'
        }
    }
    const handleSubmit = e => {
        e.preventDefault() 
        const formData = new FormData(formElement.current)
        formData.append('poster_id', props.id)
        formData.append('status', 'public')
        console.log(formData.get('image'))
        if(formData.get('image').name === ''){
            formData.append('type', 'string')
        }else{
            formData.append('type', 'image')
        }
        axiosWithAuth().post('/posts/createpost/', formData).then(res=>{
            props.addPost(res.data)
        }).catch(err => {console.log({err})})
    }
    
    return (
        <div className='make-post'>
                <h4>Create a Post</h4>
            <form onSubmit={handleSubmit} ref={formElement} >
                <p className='error' id='max-length' style={{'display':'none'}}>The body is at max length</p>
                <input id='title' placeholder='Title(Optional)' type='text' name='header' value={data.header}/>
                <textarea id='textarea' rows='2' placeholder='Body(Required)' name='body' value={data.body} onChange={adjustHeight}/>
                <input id='file-input' type='file' name='image' style={{display:'none'}} accept="image/*" onChange={handleUpload}/>    
                <button className='upload-button' onClick={handleSelect}>Add a Image</button>
                <button className='submit-button' type='submit' onClick={handleSubmit}>Post</button>
            </form>
            <ImagePreview/>
        </div>
    )
}

const mapStateToProps = state => ({
    id: state.userData.id
})

export default connect(mapStateToProps,{addPost})(MakePost);