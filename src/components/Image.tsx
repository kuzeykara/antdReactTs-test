import { useState, useEffect } from 'react';
import { Button } from 'antd';

interface ImageData {
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
function Image() {

    const [allImages, setAllImages] = useState<ImageData>({} as ImageData);
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
                Authorization: process.env.REACT_APP_PEXELS_KEY as string
            }
        })
        .then( (response) => response.json() )
        .then( (json: ImageData) => setAllImages(json));

        console.log("Request to API");
    }, []);

    function getRandomImage() {
        const randomNum = Math.floor(Math.random() * allImages.photos.length);
        setTheImage( (allImages as ImageData).photos[randomNum].src );
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
