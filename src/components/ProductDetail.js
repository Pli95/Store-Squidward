import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import store from "../redux/configureStore"
import "./ProductDetail.css"
import noImage from '../images/No_Image_Available.jpeg'

export const RenderProductDetail = () => {
    const { productId } = useParams();
    const product = store.getState().products.filter(p => p._id === productId)
    return product.map(p => {
        return (
            <ProductDetail
                key={p.id}
                id={p.id}
                image={p.image}
                title={p.title}
                description={p.description}
                price={p.price}
            />
        )
    })

}

class ProductDetail extends React.Component {

    render() {
        return (
            <div className="productDetail">
                {!this.props.image[0] ? <img src={noImage} /> :
                    <Carousel variant="dark" interval={null} >

                        {this.props.image.map(function (image, i) {
                            return <Carousel.Item>
                                <img
                                    src={image}
                                    alt={`slide ${i}`}
                                />
                            </Carousel.Item>
                        })}
                    </Carousel>
                }

                <Card border='light'>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Subtitle>${this.props.price.toFixed(2)}</Card.Subtitle>
                    <Card.Text>{this.props.description}</Card.Text>
                </Card>
            </div>
        )
    }
}