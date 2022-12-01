import { useState, ChangeEvent,  } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface User {
    username: string,
    password: string
}

function Signup() {
    const [inputData, setInputData] = useState<User>({
        username: "",
        password: ""
    });
    const [confPass, setConfPass] = useState("");
    const [acceptTOS, setAcceptTOS] = useState(false);

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

    function onChangeConfPassword(e: ChangeEvent<HTMLInputElement>) {
        setConfPass( e.target.value );
    }

    function onChangeTOS(e: CheckboxChangeEvent) {
        setAcceptTOS(e.target.checked);
    }

    async function onFinish() {
        // check conf pass
        if ( inputData.password !== confPass ) {
            console.log(`Passwords don't match!`);
            return;
        }
        if ( !acceptTOS ) {
            console.log(`Did not agree to TOS!`);
            return;
        }

        //post request to /users/signup
        const res = await fetch("https://apiantdreactts-test.netlify.app/users/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        });
        if (res.ok) {
            const data = await res.json();
            console.log(`Sign up complete!`);
            console.log(`Logged in as ${data.user.username}`);
        } else {
            console.log(`Sign up failed: ${res.status}`);
            console.log(`${res.body}`);
        }
    }

    function onFinishFailed() {
        console.log('Submit failed');
    }

    return (
        <div className="signup">
            <Form
                className="signup--form"
                name="basic"
                labelCol={{ span: 10 }}
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

                <Form.Item
                    label="Confirm Password"
                    name="conf-password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onChange={(e) => onChangeConfPassword(e)} />
                </Form.Item>

                <Form.Item
                    name="tos-accept"
                    wrapperCol={{offset: 8, span: 16}}
                >
                    <Checkbox
                        onChange={(e) => onChangeTOS(e)}
                    >
                        I accept <a href="../README.md">TOS</a>
                    </Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Signup;
