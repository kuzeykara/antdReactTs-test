import { Menu } from "antd";
import type { MenuProps } from "antd";


const items: MenuProps['items'] = [
    {
        label: 'ALL',
        key: 'all',
    },
    {
        label: 'Value',
        key: 'value',
    },
    {
        label: 'Image',
        key: 'image',
    },
    {
        label: 'Log In',
        key: 'login',
    },
    {
        label: 'Sign Up',
        key: 'signup',
    },
];

const Header: React.FC<{showMenu:Function}> = (props) => {
    const onClick: MenuProps['onClick'] = (e) => {
        props.showMenu(e.key);
    }

    return (
        <>
            <Menu onClick={onClick} items={items} mode="horizontal" />
        </>
    );
}

export default Header;
