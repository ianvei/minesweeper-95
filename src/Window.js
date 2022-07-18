import React, { useEffect, useState } from 'react';
import menuImg from './images/hello.png'


const Window = ( { contentComponent, nameOfClass, componentTitle } ) => {

    return (
        <div className={`window-container ${nameOfClass}`}>
            <div class="window-header"> 
                <div class="ls">
                    <p className='title'>{componentTitle}</p>
                </div>
                <img src={menuImg} alt="minimize maximize close button" class="window-buttons" />
            </div>
            <div class="window-main">
                {contentComponent}
            </div>
        </div>
    )
}

export default Window