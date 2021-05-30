import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch_product_ac } from '../../../../actions/products/product.action';
import { Loader } from '../../../Common/Loader/Loader.component';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
const IMG_URL = process.env.REACT_APP_IMG_URL;


class Details extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.productId = this.props.match.params['product_id'];
        this.props.fetchProduct({ _id: this.productId });
    }

    getImage = (product = []) => {
        let images = [
            {
                original: 'https://picsum.photos/id/1018/1000/600/',
                thumbnail: 'https://picsum.photos/id/1018/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1015/1000/600/',
                thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1019/1000/600/',
                thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
        ];
        let productImage = (product.images || []).map(img => ({
            original: `${IMG_URL}/${img}`,
            thumbnail: `${IMG_URL}/${img}`
        }));
        return productImage.length > 0
            ? productImage
            : images;
    }
    render() {
        const { isFetching, product } = this.props;
        console.log('Product is >>',product)
        let content = this.isFetching
            ? <Loader></Loader>
            : <>
                <h2>Product Details</h2>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <h4>Product images</h4>
                        <ImageGallery items={this.getImage(product)} />
                    </div>
                    <div className="col-md-6">
                        <h4>Product details:</h4>
                        <p>Name: {product.name}</p>
                        <p>Category: {product.category}</p>
                        <p>Tags: {product.tags}</p>
                        <p>Price: NRP.{product.price}</p>
                        <strong>Ratings:</strong>
                        {
                            (product.ratings || []).map((rating, index) => (
                                <li style={{listStyleType:'none'}}>
                                    <h2>{rating.point}</h2>
                                    <p>{rating.message}</p>
                                    <p>{rating.createdAt}</p>
                                </li>
                            ))
                        }
                    </div>
                </div>
            </>
        return content;
    }
}
const mapStateToProps = (rootStore) => {
    return {
        product: rootStore.product.product,
        isFetching: rootStore.product.isFetching
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchProduct: (id) => dispatch(fetch_product_ac(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);