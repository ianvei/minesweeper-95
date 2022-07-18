import React, { useEffect, useState } from 'react';
import Window from './Window';
import ExampleContent from './ExampleContent';
import { Link } from 'react-router-dom'

const Leaderboard = ( ) => {
    return (
        <div className='leaderboard'>
            <Window contentComponent={<ExampleContent />} nameOfClass="example" componentTitle='test component'/>
            <button><Link to="/">Back to Game</Link></button>
        </div>
    )
}

export default Leaderboard