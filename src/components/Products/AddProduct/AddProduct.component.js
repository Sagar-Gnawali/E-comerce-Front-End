import React, { Component } from 'react'
import { handleError } from '../../../utils/handleError.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { notify } from '../../../utils/toaster.js';
import { ProductForm } from '../ProductForm/productForm.component.js';

export class AddProduct extends Component {
    constructor() {
        super();
        this.state = {
            isSubmitting: false
        }
    }
    add = (data, files) => {
        this.setState({
            isSubmitting: true
        })
        console.log('Data in add function is >>', files);
        HttpClient.UPLOAD('POST', '/product', data, files)
            .then(res => {
                notify.showInfo('Product added successfully !');
                this.props.history.push('view_product')
            })
            .catch(error => {
                this.setState({
                    isSubmitting: false
                })
                handleError(error);
            })
    }
    render() {
        return (
            <div>
                <ProductForm
                    title="Add Product"
                    submitCallback={this.add}
                    isSubmitting={this.state.isSubmitting}
                />
            </div>
        )
    }
}
