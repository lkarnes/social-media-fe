import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({children}) => {
  const mount = document.getElementById("portal");
  const el = document.createElement("div");
  useEffect(() => {
    if(mount){
      mount.appendChild(el);
      return () => mount.removeChild(el);
    }
    
  });

  return createPortal(children, el)
};

export default Portal;

