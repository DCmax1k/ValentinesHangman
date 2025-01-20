import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';

class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            login: true,
         };

         this.switchPage = this.switchPage.bind(this);
    }

    switchPage() {
        this.setState({
            login: !this.state.login,
        });
    }

    render() {
        return (
            <div className='Switch'>
                <div className={`slide ${this.state.login}`}>
                    
                    <Login ref={this.state.loginRef} switchPage={this.switchPage} loginBtnText={this.state.loginBtnText} customAlert={this.customAlert} />
                    <Signup ref={this.state.signupRef} switchPage={this.switchPage} signupBtnText={this.state.signupBtnText} customAlert={this.customAlert} />
                </div>
            </div>
        );
    }
}

export default Switch;