import React, { useEffect, useState } from 'react'
import './Cursor.css'
import classNames from 'classnames';

const isMobile = () => {
    const ua = navigator.userAgent;
    return /Android|Mobi/i.test(ua);
};

function Cursor() {
    
    const [position, setPosition] = useState({x: 0, y: 0});
    const [hidden, setHidden] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);


   useEffect(() => {
       addEventListeners();
       onhandleLinkHoverEvents();
       return () => removeEventListeners();
   }, []);

   const onhandleLinkHoverEvents = () => {
           document.querySelectorAll("a").forEach(el => {
               el.addEventListener("mouseover", () => setLinkHovered(true));
               el.addEventListener("mouseout", () => setLinkHovered(false));
           });
    };

   const addEventListeners = () => {
       document.addEventListener("mousemove", onMouseMove);
       document.addEventListener("mouseenter", onMouseEnter);
       document.addEventListener("mouseleave", onMouseLeave);
       document.addEventListener("mousedown", onMouseDown);
       document.addEventListener("mouseup", onMouseUp);
   };

   const removeEventListeners = () => {
       document.removeEventListener("mousemove", onMouseMove);
       document.removeEventListener("mouseenter", onMouseEnter);
       document.removeEventListener("mouseleave", onMouseLeave);
       document.removeEventListener("mousedown", onMouseDown);
       document.removeEventListener("mouseup", onMouseUp);
   };

      const onMouseDown = () => {
           setClicked(true);
       };
    
       const onMouseUp = () => {
           setClicked(false);
       };

      const onMouseLeave = () => {
           setHidden(true);
       };
    
       const onMouseEnter = () => {
           setHidden(false);
       };

   const onMouseMove = (e) => {
       setPosition({x: e.clientX, y: e.clientY});
   };          
   
      const cursorClasses = classNames(
           'cursor',
           {
               'cursor--clicked': clicked,
               'cursor--hidden': hidden,
               'cursor--link-hovered': linkHovered
           }
       );  

    if (typeof navigator !== 'undefined' && isMobile()) return null;
    return (
        <div className={cursorClasses}
           style={{
               left: `${position.x}px`,
               top: `${position.y}px`
           }}>
           </div>
    )
}

export default Cursor
