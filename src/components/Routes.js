import React from "react";
import {Routes, Route} from "react-router-dom";
import { LandingPage } from "../LandingPage";
import { EditPage } from "./EditProduct";
import HomePage from "./Home";
import { RenderProductDetail } from "./ProductDetail";
import { ProductPage } from "./ProductPage";

export class AppRoutes extends React.Component {
    render() {

        return (
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/shop' element={<ProductPage/>} />
                <Route path='/shop/:productId' element={<RenderProductDetail/>} />
                <Route path='/editStore' element={<EditPage/>} />
            </Routes>
        )
    }
}