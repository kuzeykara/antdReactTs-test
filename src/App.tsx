import { useState } from 'react';
import Header from './components/Header'
import Value from './components/Value';
import Image from './components/Image';


function App() {
    const [showComponent, setShowComponent] = useState( {
        value: false,
        image: false,
    } );

    function showMenu(id: string) {
        /*
        setShowComponent( prevShowComponent => {
            return ( {
                ...prevShowComponent,
                [id]: id === "value" ? !prevShowComponent.value : !prevShowComponent.image
            } );
        } );
        */
        switch (id) {
            case "value":
                setShowComponent( () => {
                    return ({
                        value: true,
                        image: false,
                    });
                } );
                break;
            case "image":
                setShowComponent( () => {
                    return ({
                        value: false,
                        image: true,
                    });
                } );
                break;
            case "all":
                setShowComponent( () => {
                    return ({
                        value: true,
                        image: true,
                    });
                } );
                break;
        }
    }

    return (
        <>
            <Header showMenu={showMenu} />
            <div className='App'>
                {showComponent.value && <Value />}
                {showComponent.image && <Image />}
            </div>
        </>
    );
}

export default App;