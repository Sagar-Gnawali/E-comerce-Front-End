import React, { Component } from 'react';
import { handleError } from '../../../utils/handleError.js';
import { HttpClient } from '../../../utils/httpClient.js';
import { notify } from '../../../utils/toaster.js';
import { Button } from '../../Common/SubmitButton/Button.component.js';
import { ViewProduct } from '../ViewProduct/ViewProducts.component.js';
const defaultForm = {
    category: '',
    name: '',
    minPrice: '',
    maxPrice: '',
    fromDate: '',
    toDate: '',
    tags: '',
    multipleDateRange: false
}
export class SearchProduct extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmittng: false,
            categories: [],
            allProducts: [],
            names: [],
            searchResults: []
        }
    }
    componentDidMount() {
        HttpClient
            .POST('/product/search', {})
            .then(res => {
                let ctgry = [];
                res.data.forEach((item, index) => {
                    if (!ctgry.includes(item.category)) {
                        ctgry.push(item.category);
                    }
                })
                this.setState({
                    categories: ctgry,
                    allProducts: res.data
                })
            })
            .catch(error => {
                handleError(error);
            })
    }
    handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            value = checked;
        }
        if (name === 'category') {
            this.prepareNames(value);
        }
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }))
    }
    prepareNames = selectedCategory => {
        const { allProducts } = this.state;
        const names = allProducts.filter(item => item.category === selectedCategory);
        this.setState({
            names
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
        const { data } = this.state;
        if (!data.multipleDateRange) {
            data.toDate = data.fromDate;
        }
        HttpClient
            .POST('/product/search', data)
            .then(res => {
                if (!res.data.length) {
                    notify.showInfo("Sorry ! We can't find that product.");
                }
                this.setState({
                    searchResults: res.data
                })
                if (res.data.length > 0) {
                    notify.showInfo('Here your search result !', 3000);
                }
            })
            .catch(error => {
                handleError(error);
            })
            .finally(() => {
                this.setState({
                    isSubmitting: false
                })
            })
    }
    resetSearch = () => {
        this.setState({
            data: {
                ...defaultForm
            },
            searchResults: []
        })
    }
    render() {
        let content = this.state.searchResults.length > 0
            ? <ViewProduct searchData={this.state.searchResults} resetSearch={this.resetSearch} />
            :
            <>
                <h2>Search Product</h2>
                <form onSubmit={this.handleSubmit} noValidate className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select name="category" id="category" value={this.state.data.category}
                        className="form-control" onChange={this.handleChange}>
                        <option disabled value="">(Select Categories)</option>
                        {this.state.categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    {
                        this.state.names.length > 0 && (
                            <>
                                <label htmlFor="name">Name:</label>
                                <select name="name" id="name" value={this.state.data.name}
                                    className="form-control" onChange={this.handleChange}>
                                    <option disabled value="">(Select Categories)</option>
                                    {this.state.names.map((item, index) => (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </>
                        )
                    }
                    <label htmlFor="brand">Brand:</label>
                    <input type="text" name="brand" id="brand" placeholder="brand"
                        onChange={this.handleChange} className="form-control" />
                    <label htmlFor="color">Color:</label>
                    <input type="text" name="color" id="color" placeholder="color"
                        onChange={this.handleChange} className="form-control" />
                    <label htmlFor="minprice">Min Price:</label>
                    <input type="number" name="minPrice" id="minprice" placeholder="min price"
                        onChange={this.handleChange} className="form-control" />
                    <label htmlFor="maxprice">Max Price:</label>
                    <input type="number" name="maxPrice" id="maxprice" placeholder="max price"
                        onChange={this.handleChange} className="form-control" />
                    <label >Select Date:</label>
                    <input type="date" name="fromDate" onChange={this.handleChange}
                        className="form-control" />
                    <input type="checkbox" name="multipleDateRange" onChange={this.handleChange} />
                    <label >&nbsp;Multiple Date Range</label>
                    <br />
                    {
                        this.state.data.multipleDateRange && (
                            <>
                                <label >To Date:</label>
                                <input type="date" name="toDate" onChange={this.handleChange}
                                    className="form-control" />
                            </>
                        )
                    }
                    <label htmlFor="tags">Tags:</label>
                    <input type="text" name="tags" id="tags" placeholder="tags"
                        onChange={this.handleChange} className="form-control" />
                    <Button isSubmitting={this.state.isSubmittng}
                    />
                </form>
            </>
        return content;
    }
}