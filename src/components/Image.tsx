import { useState, useEffect } from 'react';
import { Button } from 'antd';

function Image() {
    interface Image {
        "total_results": number;
        "page": number;
        "per_page": number;
        "photos": [
            {
              "id": number,
              "width": number,
              "height": number,
              "url": string,
              "photographer": string,
              "photographer_url": string,
              "photographer_id": number,
              "avg_color": string,
              "src": {
                "original": string,
                "large2x": string,
                "large": string,
                "medium": string,
                "small": string,
                "portrait": string,
                "landscape": string,
                "tiny": string
              },
              "liked": boolean,
              "alt": string
            }
        ],
          "next_page": string
    }

    const [allImages, setAllImages] = useState({} as Image);
    const [theImage, setTheImage] = useState(
        {
            "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
            "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
            "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
            "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
            "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
            "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
            "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
        }
    );

    useEffect( () => {
        fetch("https://api.pexels.com/v1/search?query=nature", {
            method: 'GET',
            headers: {
                // maybe hide this?
                Authorization: "563492ad6f91700001000001ea826d5752da4918ac2086a81da34b1d"
            } 
        })
        .then( (response) => response.json() )
        .then( (json: Image) => setAllImages(json));

        console.log("Request to API");
    }, []);

    function getRandomImage() {
        const randomNum = Math.floor(Math.random() * allImages.photos.length);
        setTheImage( (allImages as Image).photos[randomNum].src );
    }

    return(
        <div className='toLoad'>
                <Button type="primary" onClick={getRandomImage}>GET RANDOM PHOTO</Button>
                <img className="toLoad--img" src={theImage.large2x} alt="Random Nature Scenery" />
                <Button className="toLoad--link" type="link" href="https://www.pexels.com">Photos provided by Pexels</Button>
        </div>
    );
}

export default Image;
