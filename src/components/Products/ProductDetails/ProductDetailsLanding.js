import React, { Component } from 'react';
import Details from './Details/Details.js';
import { ProductReviewForm } from './ProduReview/ProductReviewForm.js';
export class ProductDetailsLanding extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>    
                <Details match={this.props.match} />
                <ProductReviewForm match={this.props.match} />
            </div>
        )
    }
}