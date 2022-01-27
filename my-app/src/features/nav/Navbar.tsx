import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface IProps {
    createForm: () => void;
}

export const Navbar: React.FC<IProps> = ({createForm}) => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" 
                    style={{marginRight: '10px'}}/>
                    Home
                </Menu.Item>

                <Menu.Item
                    name='produse'
                />
                <Menu.Item
                    name='contact'
                />
                <Menu.Item>
                    <Button onClick={createForm} positive content='Adaugare produs' />
                </Menu.Item>
            </Container>
        </Menu>
    )
};
