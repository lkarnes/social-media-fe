import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom'




function Portal(props){
    var portalRoot = document.getElementById('portal')
    var el = document.createElement('div')

    useEffect(()=> {
        portalRoot.appendChild(el)
        return function cleanup(){
            portalRoot.removeChild(el)
        }
    })
    
    const {children} = props
    return ReactDOM.createPortal(children, el)
}


export default Portal