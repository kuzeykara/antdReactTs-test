import { useState, ChangeEvent } from "react";
import { Button, Form, Input } from "antd";

interface User {
    username: string,
    password: string
}

function Login() {
    const [inputData, setInputData] = useState<User>({
        username: "",
        password: ""
    });

    function onLogin() {
        
    }

    function onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
        setInputData( (prevInputData) => {
            return ( {
                ...prevInputData,
                username: e.target.value
            } );
        } );
    }

    function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
        setInputData( (prevInputData) => {
            return ( {
                ...prevInputData,
                password: e.target.value
            } );
        } );
    }

    async function onFinish() {
        const res = await fetch("/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        });
        const data: User[] = await res.json();
        if (data.length > 0) {
            console.log(`Logged in as ${data[0].username}!`);
            onLogin();
        } else {
            console.log(`Log in failed!`);
        }
    }

    function onFinishFailed() {
        console.log('Submit failed');
    }

    return (
        <div className="login">
            <Form
                className="login--form"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input onChange={(e) => onChangeUsername(e)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onChange={(e) => onChangePassword(e)} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    Log In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
