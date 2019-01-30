import React from 'react';
import {  Navbar, NavbarToggler, NavbarBrand} from 'reactstrap';

export default class Toolbar extends React.Component {

  render() {
    return (
      <div>
        <Navbar color="danger" dark>
          <NavbarBrand href="/" className="mr-auto" tabIndex="1">Seattle's Restaurant Finder</NavbarBrand>
          <NavbarToggler role="button" aria-pressed="false" tabIndex="0" onClick={this.props.close} className="mr-2" />
        </Navbar>
      </div>
    );
  }
}