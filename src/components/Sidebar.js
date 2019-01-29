import React , { Component }from 'react';
import { FormGroup, Label, Input,  } from 'reactstrap';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import { get_view } from '../utility'
class Sidebar extends Component {

render() {
    return (
      <div id="sidebar">
        <FormGroup>
          <Label htmlFor="namedInput" for="filterVenue" className="font-weight-bold title">Search</Label>
          <Input tabIndex="0"
            type="search"
            name="search"
            id="filterVenue"
            placeholder="Restaurant Name"
            value={this.props.query}
          onChange={(e) => { this.props.changeQuery(e.target.value) }}
          />
        </FormGroup>
        <div>
        {this.props.venues && this.props.venues.length > 0 && this.props.venues.map((venue, index) =>
            (
                <Card className="marker-content p-1" key={venue.id} onClick={() => { this.props.card_click(venue) }}>
                <CardImg top width="100%" src={get_view(venue.location.lat, venue.location.lng)} alt="Card image cap" />
                <CardBody  >
                  <CardTitle className="medium-font font-weight-bold">{venue.name}</CardTitle>
                  <CardText>{venue.location.formattedAddress.join(', ')}</CardText>
                </CardBody>
              </Card>
             
            ))
            }
      </div>
      </div>
      
    );
  }
}

export default Sidebar;
