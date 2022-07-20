import React, { useEffect, useState } from 'react';
import menuImg from './images/hello.png'


const Window = ( { contentComponent, nameOfClass, componentTitle } ) => {

    return (
        <div className={`window-container ${nameOfClass}`}>
            <div className="window-header"> 
                <div className="ls">
                    <p className='title'>{componentTitle}</p>
                </div>
                <img src={menuImg} alt="minimize maximize close button" className="window-buttons" />
            </div>
            <div className="window-main">
                {contentComponent}
            </div>
        </div>
    )
}

export default Window