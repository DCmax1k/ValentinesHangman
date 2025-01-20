import React, { Component } from 'react';

const chanceOfMessage = 0.9;
const rounds = [
    {
        round: 1,
        phrase: "I LOVE YOU",
    },
    {
        round: 2,
        phrase: "YOU ARE MY DAYLIGHT",
    },
    {
        round: 3,
        phrase: "YOU ARE MY DREAM COME TRUE",
    },
    {
        round: 4,
        phrase: "BEST FIVE MONTHS EVER",
    },
    {
        round: 5,
        phrase: "CANES ON ME ANYTIME",
    },
    {
        round: 6,
        phrase: "PROVIDE THE BEST FOR THE BEST",
    },
    {
        round: 7,
        phrase: "POPCORN AND MOVIE NIGHT",
    },
    {
        round: 8,
        phrase: "FACE ME IN THE DAILY WORDLE",
    },
    {
        round: 9,
        phrase: "FORTNITE GOD",
    },
    {
        round: 10,
        phrase: "DEEP IN LOVE UNTIL WE ARE OLD",
    },

];
const hangmanQuotes = ["Am I dead yet?", "You got it, cmon", "You're killing me", "I'm hanging in there", "Don’t kill me, please", "I’m not scared, yet..", "Try to guess correct next", "Hopefully you'll get it"]
const hangmanQuotesLast = ["I’ll accept my fate...", "1 more life, pleaseee no"]

class Hangman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            round: 0,
            phrase: "",
            phraseEncoded: [], // [['I'], ['l', 'o', 'v', 'e'], ['y', 'o', 'u']]
            uniqueLetters: [], // ['I', 'l', 'o', 'v', 'e', 'y', 'u']  // Splice the letter out if the letter is guessed, if the array is empty, the game is won
            correctGuesses: [], // ['l', 'o', 'v', 'e', 'y', 'u'] // If the letter is in the phrase, add it to the array
            wrongGuesses: [], // ['a', 'b', 'c'] // If the letter is not in the phrase, add it to the array
            livesUsed: 0,
            
            inputLetter: "",

            gameWon: false,
            gameLost: false,

            hangmanMessage: "",
        }
        this.setRound = this.setRound.bind(this);
        this.inputLetter = this.inputLetter.bind(this);
        this.submitLetter = this.submitLetter.bind(this);
        this.handleKeyDownGuess = this.handleKeyDownGuess.bind(this);
        this.goBack = this.goBack.bind(this);
        this.nextRound = this.nextRound.bind(this);
        this.exitGame = this.exitGame.bind(this);
        this.setHangmanMessage = this.setHangmanMessage.bind(this);
    }

    componentDidMount() {
        this.setRound(1);
    }

    setRound(round) {
        if (round > rounds.length) return;
        const phrase = rounds[round - 1].phrase;
        const phraseEncoded = phrase.split(' ').map(word => word.split(''));
        const uniqueLetters = [...new Set(phrase.split(' ').join(''))];

        // Reset the game
        this.setState({round, phrase, phraseEncoded, uniqueLetters, correctGuesses: [], wrongGuesses: [], livesUsed: 0, gameWon: false, gameLost: false, inputLetter: "", hangmanMessage: ""});
    }

    inputLetter(e) {
        if (this.state.gameWon || this.state.gameLost) return;
        const letter = e.target.value[0];
        const setLetter = letter ? letter.toUpperCase() : "";
        const validLettersUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (!validLettersUppercase.includes(setLetter)) return;
        this.setState({inputLetter: setLetter});
    }

    handleKeyDownGuess(e) {
        if (e.key === 'Enter') {
            this.submitLetter();
        }
    }

    submitLetter() {
        if (this.state.gameWon || this.state.gameLost) return;
        const letter = this.state.inputLetter;
        if (!letter) return;
        if (this.state.correctGuesses.includes(letter) || this.state.wrongGuesses.includes(letter)) return;
        if (this.state.uniqueLetters.includes(letter)) {
            // Correct guess
            this.setHangmanMessage(true);
            const newCorrectGuesses = [...this.state.correctGuesses, letter];
            const newUniqueLetters = this.state.uniqueLetters.filter(uniqueLetter => uniqueLetter !== letter);
            this.setState({
                correctGuesses: newCorrectGuesses,
                uniqueLetters: newUniqueLetters,
            });
            if (newUniqueLetters.length === 0) {
                this.setState({gameWon: true});
            }
        } else {
            // Incorrect guess
            this.setHangmanMessage();
            const newWrongGuesses = [...this.state.wrongGuesses, letter];
            const livesUsed = this.state.livesUsed + 1;
            this.setState({
                wrongGuesses: newWrongGuesses,
                livesUsed,
            });
            if (livesUsed === 6) {
                this.setState({gameLost: true});
            }
        }
        this.setState({inputLetter: ""});
    }

    setHangmanMessage(removeMessage = false) {
        if (removeMessage || this.state.livesUsed >= 5) {
            this.setState({hangmanMessage: ""});
            return;
        }
        if (this.state.livesUsed === 4) {
            const hangmanMessage = hangmanQuotesLast[Math.floor(Math.random() * hangmanQuotesLast.length)];
            this.setState({hangmanMessage});
            return;
        }
        const random = Math.random();
        if (random < chanceOfMessage) {
            const hangmanMessage = hangmanQuotes[Math.floor(Math.random() * hangmanQuotes.length)];
            this.setState({hangmanMessage});
        } else {
            this.setState({hangmanMessage: ""});
        }

    }

    exitGame() {
        window.location.href = '/';
    }

    goBack() {
        const round = this.state.round;
        console.log(round);
        if (round === 1) return this.exitGame();
        this.setRound(round - 1);
    }
    nextRound() {
        const round = this.state.round;
        if (this.state.gameLost) {
            this.setRound(round);
        } else if (this.state.gameWon) {
            this.setRound(round + 1);
        } else {
            this.setRound(round + 1);
            console.log(this.state.round);
        }
        
        if (round + 1 > rounds.length) {
            this.exitGame();
        }
    }

    render() {
        const wrongGuesses = this.state.wrongGuesses;
        const nextButtonText = this.state.gameLost ? 'Retry' : this.state.gameWon ? 'Next' : 'Skip';
        return (
            <div className='Hangman'>
                <h1 className='header'>Round {this.state.round} of {rounds.length}</h1>

                <div className='phrase'>
                    {this.state.phraseEncoded.map((word, i) => {
                        return (
                            <div key={i} className='word'>
                                {word.map((letter, j) => {
                                    return (
                                        <div key={j} className={`letter ${this.state.correctGuesses.includes(letter) ? 'active' : 'hidden'}`}>
                                            {letter}
                                            <div className='underscore'></div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                
                <div className='hanger'>
                    <img src='/images/hangman/hanger.svg' className='frame' alt='Hanger' style={{zIndex: 1}} />

                    <div className={`messageBox ${this.state.hangmanMessage === "" ? "hidden" : ""}`}>
                        <img src='/images/hangman/messageBox.svg' alt='message box' />
                        <p>{this.state.hangmanMessage}</p>
                    </div>

                    <img className={`deadEyes ${this.state.gameLost ? 'show':''}`} src='/images/hangman/deadEyes.svg' alt='dead eyes' />

                    <div className='wholeBody'>
                        <img src='/images/hangman/head.png' alt='Head' style={{display: wrongGuesses.length > 0 ? "block" : "none", zIndex: 5, height: '40%', top: '-5%', left: '50%', transform: 'translateX(-50%)'}} />
                        <img src='/images/hangman/torso.png' alt='Torso' style={{display: wrongGuesses.length > 1 ? "block" : "none", zIndex: 4, height: '35%', top: '28%', left: '50%', transform: 'translateX(-50%)'}} />
                        <img src='/images/hangman/leftArm.png' alt='Left Arm' style={{display: wrongGuesses.length > 2 ? "block" : "none", zIndex: 3, height: '30%', top: '31%', left: '10%'}} />
                        <img src='/images/hangman/rightArm.png' alt='Right Arm' style={{display: wrongGuesses.length > 3 ? "block" : "none", zIndex: 3, height: '30%', top: '34%', right: '10%'}} />
                        <img src='/images/hangman/leftLeg.png' alt='Left Leg' style={{display: wrongGuesses.length > 4 ? "block" : "none", zIndex: 3, height: '22%', bottom: '19%', left: '21%'}} />
                        <img src='/images/hangman/rightLeg.png' alt='Right Leg' style={{display: wrongGuesses.length > 5 ? "block" : "none", zIndex: 3, height: '22%', bottom: '19%', right: '21%'}} />

                    </div>
                </div>

                <div className='guessCont'>
                    <button className={`exit actionButton`} onClick={this.goBack}>Go back</button>
                    <button className={`next actionButton ${this.state.gameWon ? 'animateNext':''} ${this.state.gameLost ? 'animateRetry':''}`} onClick={this.nextRound}>{nextButtonText}</button>

                    <div className='guess'>
                        <p>Guess</p>
                        <input type='text' onInput={this.inputLetter} value={this.state.inputLetter} onKeyDown={this.handleKeyDownGuess} />
                    </div>
                    <div className='submit'>
                        <button onClick={this.submitLetter}>
                            <img src='/images/icons/upArrow.svg' alt='Submit' />
                        </button>
                    </div>
                </div>

                <div className="guesses">
                    <p>Wrong guesses:</p>
                    <div className='letters'>
                        {this.state.wrongGuesses.map((letter, i) => {
                            return (
                                <div key={i} className='letter'>
                                    {letter}
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default Hangman;