import React, { Component } from 'react';
import { handleError } from '../../../utils/handleError';
import { HttpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toaster';
import { Loader } from '../../Common/Loader/Loader.component';
import { ProductForm } from '../ProductForm/productForm.component.js';
export class EditProduct extends Component {
    constructor() {
        super();

        this.state = {
            product: {},
            isSubmitting: false,
            isLoading: false
        }
    }
    componentDidMount() {
        this.procutId = this.props.match.params['id'];
        this.setState({
            isLoading: true
        })
        HttpClient
            .GET(`/product/${this.procutId}`, true)
            .then(res => {
                this.setState({
                    product: res.data
                })
            })
            .catch(error => {
                handleError(error);
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }
    edit = (data, files) => {
        this.setState({
            isSubmiting: true
        })
        HttpClient
            .UPLOAD('PUT',`/product/${this.procutId}`, data, files)
            .then(res => {
                notify.showInfo(`Product updated successfully !`);
                this.props.history.push('/view_product');
            })
            .catch(error => {
                handleError(error);
                this.setState({
                    isSubmiting: false
                })
            })

    }
    render() {
        let content = this.state.isLoading
            ? <Loader></Loader>
            : <ProductForm
                isSubmitting={this.state.isSubmiting}
                submitCallback={this.edit}
                title="Update Product"
                productData={this.state.product}
            />;
        return content;
    }

}
