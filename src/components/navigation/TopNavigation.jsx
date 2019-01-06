import React from 'react';
import { Menu, Dropdown, Image, Button, Popup } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';

const TopNavigation = ({ user, logout }) => (
  <Menu vertical inverted fixed="left" className="bg-dark">
    <Menu.Item as={NavLink} to="/">
      <strong>wedrinkin</strong>
    </Menu.Item>
    <Menu.Item>
      <Menu.Header>Drinks</Menu.Header>
      <Menu.Menu>
        <Menu.Item as={NavLink} to="/drinks">
          Browse
        </Menu.Item>
        <Menu.Item as={NavLink} to="/drinks/add">
          Add
        </Menu.Item>
      </Menu.Menu>
    </Menu.Item>
    <Popup
      trigger={
        <Menu.Item>
          <Menu.Header>
            {/* <Image avatar floated="left" src={gravatarUrl(user.email)} /> */}
            {/* {user.firstName} {user.lastName} <br /> */}
            {/* <span className="small emphasis text-subtle">{user.email}</span> */}
          </Menu.Header>
        </Menu.Item>
      }
      position="right center"
      on="click"
      hideOnScroll
    >
      <a onClick={() => logout()}>Logout</a>
    </Popup>
  </Menu>
);

export default TopNavigation;
