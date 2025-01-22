import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allImagesLoaded: false,
            initialLoad: false,

        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.loadImages = this.loadImages.bind(this);
    }

    componentDidMount() {
        const imageUrls = [
            '/images/indexDecor.png',
            '/images/heart.png',
        ];
        this.loadImages(imageUrls);
      }

    loadImages(imageUrls) {
        setTimeout(() => {
            this.setState({ initialLoad: true });
        }, 100);
        // Array of image URLs to preload

        // Preload images
        const imagePromises = imageUrls.map((url) => {
            return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
            });
        });

        // Wait for all images to load
        Promise.all(imagePromises)
            .then(() => {
            this.setState({ allImagesLoaded: true }); // Update state when done
            
            })
            .catch((error) => {
            console.error("Error loading images:", error);
            });
    }

    render() {
        return (
            <div className={`Index ${this.state.allImagesLoaded ? 'Loaded' : ''}`}>

                <div className={`loadingBar ${this.state.initialLoad ? 'initial':''} ${this.state.allImagesLoaded ? 'Loaded' : ''}`}>
                    <div className='loadingBarFill'></div>
                </div>

                <div className='indexDecor' style={{marginLeft: '3vh'}}>
                    <img src='/images/indexDecor.png' alt='Decor' />
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