import React, { Component } from 'react';

import Hangman from './Hangman';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: 'password', // password, pregame, hangman
            pass: '',

            alerts: [],
        }

        this.inputPass = this.inputPass.bind(this);
        this.checkPass = this.checkPass.bind(this);
        this.startGame = this.startGame.bind(this);
        this.showHint = this.showHint.bind(this);
        this.handleKeyDownPassword = this.handleKeyDownPassword.bind(this);
        this.customAlert = this.customAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.applyDecay = this.applyDecay.bind(this);

    }

    inputPass(e) {
        this.setState({pass: e.target.value});
    }
    checkPass() {
        const convertedPass = this.state.pass.toLowerCase();
        const pass = convertedPass.replace(/\s/g, '');
        // if (pass === 'iloveyou') {
        if (pass === 'iloveyoumore') {
            this.setState({screen: 'pregame'});
        } else {
            this.customAlert('Try again', false);
        }
    }
    startGame() {
        this.setState({screen: 'hangman'});
    }

    showHint() {
        // this.customAlert('Hint: Something you love to tell to me', true);
        this.customAlert('Hint: Response', true);
    }
    goBack() {
        window.location.href = '/';
    }
    handleKeyDownPassword(e) {
        if (e.key === 'Enter') {
            this.checkPass();
        }
    }

    customAlert(message, good) {
        const id = Math.random() + '' + Date.now();
        const alerts = this.state.alerts;
        const alert = {
            id,
            txt: message,
            status: good,
            animate: false,
        };
        alerts.push(alert);
        this.setState({
            alerts,
        });

        if (alerts.length === 1) {
            this.applyDecay(alert);
        }
    }

    closeAlert(alert) {
        const alerts = this.state.alerts;
        let ind = alerts.findIndex((alrt) => alrt.id === alert.id);
        if (ind < 0) return;
        alerts[ind].animate = true;
        this.setState({
            alerts,
        });
        setTimeout(() => {
            const updatedAlerts = this.state.alerts;
            updatedAlerts.splice(ind, 1);
            this.setState({
                alerts: updatedAlerts,
            });

            if (updatedAlerts.length > 0) {
                this.applyDecay(updatedAlerts[0]);
            }
        }, 300);
    }

    applyDecay(alert) {
        setTimeout(() => {
            this.closeAlert(alert);
        }, 3000);
    }

    render() {
        return (
            <div className='Game'>
                {/* Alert messages */}
                <div className='alerts'>
                    {this.state.alerts.filter((al, i) => i===0).map((alert, i) => {
                        // Auto close alert after 10 seconds
                        return (
                        <div className={`alert ${alert.status} ${alert.animate ? 'animate' : ''}`} key={alert.id}>
                            <img onClick={() => this.closeAlert(alert)} src={alert.status ? '/images/icons/hollowHeart.svg' : '/images/icons/redHollowX.svg'} alt='Close notification' />
                            {alert.txt}
                        </div>
                        )
                    })}
                </div>

                {this.state.screen === 'password' ? (

                    <div className="passwordScreen">
                        <img src='/images/heart.png' alt='heart' style={{height: '10vh'}} />

                        <p className='bigText'>What's the password</p>

                        <input type='text' className='passwordInput input' placeholder='Password...' onInput={this.inputPass} value={this.pass} onKeyDown={this.handleKeyDownPassword} />

                        <button className='redButton playGame' onClick={this.checkPass} >
                            Next
                        </button>

                        <button className='hint' onClick={this.showHint} >
                            Hint
                        </button>

                        <button className='redButton goBack' onClick={this.goBack} >
                            Go back
                        </button>
                    </div>

                ) : this.state.screen === 'pregame' ? (
                    <div className='pregameScreen'>
                        <img src='/images/heart.png' alt='heart' style={{height: '10vh'}} />

                        {/* <p className='bigText'>I love you more.</p> */}
                        <p className='bigText'>No you don't.</p>

                        <p className='bigText'>Now, lets get started!</p>

                        <button className='redButton startGame' onClick={this.startGame} >
                            Start
                        </button>

                    </div>

                ) : this.state.screen === 'hangman' ? (
                    <Hangman customAlert={this.customAlert} />
                ) : null}


            </div>
        )
    }
}

export default Game;