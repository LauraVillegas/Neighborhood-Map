import React from 'react';
import {  Navbar, NavbarToggler, NavbarBrand} from 'reactstrap';

export default class Toolbar extends React.Component {

  render() {
    return (
      <div>
        <Navbar color="danger" dark>
          <NavbarBrand href="/" className="mr-auto">Seattle's Restaurant Finder</NavbarBrand>
          <NavbarToggler onClick={this.props.close} className="mr-2" />
        </Navbar>
      </div>
    );
  }
}