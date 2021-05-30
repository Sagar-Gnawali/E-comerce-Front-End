import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReview_ac } from '../../../../actions/products/product.action.js';
import { Button } from '../../../Common/SubmitButton/Button.component.js';
const defaultForm = {
    ratingPoint: 0,
    ratingMessage: ''
}
class ProductReview extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            }
        }
    }
    componentDidMount() {
        this.productId = this.props.match.params['product_id'];
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('data is ',this.state.data);
        this.props.addReview(this.state.data, this.productId);
    }
    render() {
        return (
            <div>
                <h2>Add review:</h2>
                <form onSubmit={this.handleSubmit} className="form-group">
                    <label htmlFor="point">Point:</label>
                    <input type="number" onChange={this.handleChange}
                        id="point" name="ratingPoint" className="form-control" />
                    <label htmlFor="message">Message:</label>
                    <input type='text' name='ratingMessage' id='message'
                        onChange={this.handleChange} className="form-control" />
                    <Button isSubmitting={this.props.isSubmitting} />
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isSubmitting: state.product.isSubmitting
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addReview: (data, id) => dispatch(addReview_ac(data, id))
    }
}
export const ProductReviewForm = connect(mapStateToProps, mapDispatchToProps)(ProductReview);
