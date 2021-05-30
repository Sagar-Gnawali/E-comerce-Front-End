import React, { Component } from 'react';
import './ViewProducts.component.css';
import { Loader } from '../../Common/Loader/Loader.component';
import { RiDeleteBinLine } from 'react-icons/ri';
import { AiTwotoneEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/DateAndTime';
import { fetchProducts_ac, updateProductStore, removeProduct_ac } from '../../../actions/products/product.action';
import { connect } from 'react-redux';
const IMG_URL = process.env.REACT_APP_IMG_URL;
class ViewProductComponent extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        if (this.props.searchData) {
            this.props.update_product_store(this.props.searchData);
        } else {
            this.props.fetch();
        }
    }
    editProduct = (id) => {
        this.props.history.push(`/edit_product/${id}`);
    }
    removeProduct = (id, index, productname) => {
        const confirm = window.confirm(`Are you sure to delete ${productname} ?`);
        if (confirm) {

            this.props.remove(id,productname);
        }
    }
    render() {
        let content = this.props.isLoading
            ? <Loader />
            : <table className="table">
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Created At</th>
                        <th>Price</th>
                        <th>Tags</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (this.props.products || []).map((product, index) => (
                            <tr key={product._id}>
                                <td >{index + 1}</td>
                                <td><Link to={`/product_detail/${product._id}`}>{product.name}</Link></td>
                                <td>{product.category}</td>
                                <td>{formatDate(product.createdAt, "YYYY-MM-DD")}</td>
                                <td>{product.price}</td>
                                <td>{product.tags.length > 0 ? product.tags.join(',') : 'N/A'}</td>
                                <td>
                                    <img src={`${IMG_URL}/${product.images[0]}`} width="150px" alt="Product_img.jpeg" />
                                </td>
                                <td>
                                    <AiTwotoneEdit className="icon" color="blue" size="1.5rem"
                                        onClick={() => this.editProduct(product._id)} />
                                    &nbsp;
                                    <RiDeleteBinLine onClick={() => this.removeProduct(product._id, index, product.name)}
                                        color="red" size="1.5rem" className="icon" />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        return (
            <>
                <span className="title">{this.props.searchData ? 'Search Results' : 'View Products'}</span>
                {
                    this.props.searchData && (
                        <>
                            <button onClick={this.props.resetSearch} className="btn btn-success reset">Reset Search Result</button>
                            <br />
                        </>
                    )
                }
                {content}
            </>
        )
    }
}
const mapStateToProps = (rootStore) => ({
    a: '',
    b: '',
    products: rootStore.product.products,
    isLoading: rootStore.product.isLoading
})
const mapDispatchToProps = dispatch => ({
    fetch: (params) => dispatch(fetchProducts_ac(params)),
    update_product_store: (data) => dispatch(updateProductStore(data)),
    remove: (id,name) => dispatch(removeProduct_ac(id,name))
})
export const ViewProduct = connect(mapStateToProps, mapDispatchToProps,)(ViewProductComponent);