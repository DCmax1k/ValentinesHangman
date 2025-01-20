import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }
    

    render() {
        return (
            <div className='Index'>
                <div className='indexDecor' style={{marginLeft: '3vh'}}>
                    <img src='/images/indexDecor.svg' alt='Decor' />
                </div>

                <Link to='/game'>
                    <button className='redButton playGame'>
                        Play Game
                    </button>
                </Link>


            </div>
        )
    }
}

export default Index;