import React, {useState, useEffect} from 'react';


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
    
    return (
        <div className='post-box'>
            <h4>Post</h4>
            <form>
                <p className='error' id='max-length' style={{'display':'none'}}>The body is at max length</p>
                <input id='title' placeholder='Title(Optional)' type='text' name='header' value={data.header} onChange={handleChange} />
                <textarea id='textarea' rows='2' placeholder='Body(Required)' name='body' value={data.body} onChange={handleChange} />
            </form>
        </div>
    )
}

export default MakePost