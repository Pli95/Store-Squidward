import React from "react";
import { Nav } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import noImage from '../images/No_Image_Available.jpeg'

export class Product extends React.Component {
    render() {
        console.log(this.props.image)
        return (
            <div>
                <LinkContainer to={`/shop/${this.props.id}`} style={{color: 'black', fontFamily: 'Kiona-Bold,sans-serif'}}>
                    <Nav.Link>
                        <Card border="light" style={{ width: '15rem', height: '15rem' }}>
                            <Card.Img
                                variant="top"
                                src={this.props.image[0] ? this.props.image[0] : noImage}
                                alt={this.props.title}
                                style={{ height: "50%", objectFit: "contain", padding: "5px" }}
                                onMouseOver={e => (e.currentTarget.src = this.props.image[1] ? this.props.image[1] : e.currentTarget.src)}
                                onMouseOut={e => (e.currentTarget.src = this.props.image[0]? this.props.image[0] : noImage)}
                            />
                            <Card.Body>
                                <Card.Title style={{fontSize: '15px'}}>{this.props.title.toUpperCase()}</Card.Title>
                                <Card.Subtitle className="text-muted">${this.props.price.toFixed(2)}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Nav.Link>
                </LinkContainer>
            </div>

        )
    }
}