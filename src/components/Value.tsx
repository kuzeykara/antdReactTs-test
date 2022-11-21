import { useState } from 'react';
import { Button, Space } from 'antd';


function Value() {
    const [theValue, setTheValue] = useState(0);

    function handleClick(operation: string) {
        switch (operation) {
            case "add":
                setTheValue( prevValue => prevValue+1 );
                break;
            case "sub":
                setTheValue( prevValue => prevValue-1 );
                break;
            case "mul":
                setTheValue( prevValue => prevValue*2 );
                break;
            case "div":
                setTheValue( prevValue => prevValue/2 );
                break;
            case "res":
                setTheValue(0);
        }
    }

    return(
        <div className='value'>
            <div className='toChange'>
                <h1>{theValue}</h1>
                <h3>Click the buttons below to change the value!</h3>
            </div>
            <div className="buttons">
                <Space wrap className="buttons--operations">
                    <Button type="primary" onClick={() => handleClick("add")}>Add 1!</Button>
                    <Button type="primary" onClick={() => handleClick("sub")}>Subtract 1!</Button>
                    <Button type="primary" onClick={() => handleClick("mul")}>Multiply by 2!</Button>
                     <Button type="primary" onClick={() => handleClick("div")}>Divide by 2!</Button>
                     <Button onClick={() => (console.log("Doing nothing!"))} >Do nothing.</Button>
                </Space>
                <Space wrap className="buttons--other">
                    <Button danger={true} onClick={() => handleClick("res")}>RESET</Button>
                </Space>
            </div>
        </div>
    );
}

export default Value;
