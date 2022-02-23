import {Product} from "./Product"
import React from "react";
import store from "../redux/configureStore";


export class ProductPage extends React.Component {

    renderProducts = () => {
        return store.getState().products.map(product => {
            return (
                <Product
                id={product._id}
                image={product.image}
                key={product._id}
                price={product.price}
                title={product.title}
                />
            )
        })
    };


    render() {
        return (
            <div className="d-flex flex-wrap justify-content-around mb-5">
                {this.renderProducts()}
            </div>
        )
    }
}