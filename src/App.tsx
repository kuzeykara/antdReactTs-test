import { useState } from 'react';
import Header from './components/Header'
import Value from './components/Value';
import Image from './components/Image';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
    const [showComponent, setShowComponent] = useState( {
        value: false,
        image: false,
        login: false,
        signup: false,
    } );

    function showMenu(id: string) {
        switch (id) {
            case "value":
                setShowComponent( () => {
                    return ({
                        value: true,
                        image: false,
                        login: false,
                        signup: false,
                    });
                } );
                break;
            case "image":
                setShowComponent( () => {
                    return ({
                        value: false,
                        image: true,
                        login: false,
                        signup: false,
                    });
                } );
                break;
            case "login":
                setShowComponent( () => {
                    return({
                        value: false,
                        image: false,
                        login: true,
                        signup: false,
                    });
                } );
                break;
            case "signup":
                setShowComponent( () => {
                    return({
                        value: false,
                        image: false,
                        login: false,
                        signup: true,
                    });
                } );
                break;
            case "all":
                setShowComponent( () => {
                    return ({
                        value: true,
                        image: true,
                        login: false,
                        signup: false,
                    });
                } );
                break;
        }
    }

    return (
        <>
            <Header showMenu={showMenu} />
            <div className='App'>
                {showComponent.login && <Login />}
                {showComponent.signup && <Signup />}
                {showComponent.value && <Value />}
                {showComponent.image && <Image />}
            </div>
        </>
    );
}

export default App;