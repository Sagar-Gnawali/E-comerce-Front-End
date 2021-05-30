import React, { Component } from 'react';
import { Button } from '../../Common/SubmitButton/Button.component.js';
import { TiDeleteOutline } from 'react-icons/ti';
import './productForm.component.css';
const defaultForm = {
    name: '',
    description: '',
    brand: '',
    category: '',
    modelNumber: '',
    price: '',
    color: '',
    status: '',
    size: '',
    warrantyStatus: '',
    warrantyPeriod: '',
    isReturnEligible: '',
    isFeatured: '',
    quantity: '',
    discountedItem: '',
    discountType: '',
    discountValue: '',
    tags: '',
    manuDate: '',
    exipiryDate: ''
}
const IMG_URL = process.env.REACT_APP_IMG_URL;
export class ProductForm extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmitting: false,
            isValidForm: false,
            filesToUpload: [],
            selectedFiles: []
        }
    }
    componentDidMount() {
        const { productData } = this.props;
        if (productData) {
            this.setState({
                data: {
                    ...defaultForm,
                    ...productData,
                    discountedItem: productData.discount && productData.discount.discountedItem ? true : false,
                    discountType: productData.discount && productData.discount.discountType ? productData.discount.discountType : '',
                    discountValue: productData.discount && productData.discount.discountValue ? productData.discount.discountValue : ''
                }
            })
            if (productData.images) {
                let prevImg = productData.images.map(image => (
                    `${IMG_URL}/${image}`
                ))
                this.setState({
                    selectedFiles: prevImg
                })
            }
        }
    }
    handleChange = e => {
        let { name, type, value, checked, files } = e.target;
        if (type === 'file') {
            const { filesToUpload, selectedFiles } = this.state;
            filesToUpload.push(files[0]);
            selectedFiles.push(URL.createObjectURL(files[0]));
            return this.setState({
                filesToUpload,
                selectedFiles
            })
        }
        if (type === 'checkbox') {
            value = checked;
        }
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: value
            }
        }), () => {
            this.validateForm(name);
        })
    }
    validateForm = (fieldName) => {
        let errMsg;
        switch (fieldName) {
            case 'name':
            case 'category':
                errMsg = this.state.data[fieldName]
                    ? ''
                    : 'Required field *';
                break;
            default:
                break;
        }
        this.setState(prevError => ({
            error: {
                ...prevError.error,
                [fieldName]: errMsg
            }
        }), () => {
            const allError = Object
                .values(this.state.error)
                .filter(error => error);
            this.setState({
                isValidForm: allError.length === 0
            })
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.submitCallback(this.state.data, this.state.filesToUpload);
    }
    removeSelectedImage(index) {
        const { filesToUpload, selectedFiles } = this.state;
        filesToUpload.splice(index, 1);
        selectedFiles.splice(index, 1);
        this.setState({
            filesToUpload,
            selectedFiles
        })
    }
    render() {
        const { selectedFiles } = this.state;
        return (
            <>
                <h2>{this.props.title}</h2>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={this.state.data.name}
                        placeholder="name" onChange={this.handleChange} className="form-control" />
                    <p className="error">{this.state.error.name}</p>
                    <label htmlFor="description">Description</label>
                    <textarea rows="5" value={this.state.data.description} placeholder="Description of the product"
                        name="description" id="description" onChange={this.handleChange} className="form-control" />
                    <label htmlFor="brand">Brand</label>
                    <input type="text" name="brand" id="brand" value={this.state.data.brand}
                        placeholder="brand" onChange={this.handleChange} className="form-control" />
                    <label htmlFor="category">Category</label>
                    <input type="text" name="category" id="category" value={this.state.data.category}
                        placeholder="category" onChange={this.handleChange} className="form-control" />
                    <p className="error">{this.state.error.category}</p>
                    <label htmlFor="color">Color</label>
                    <input type="text" name="color" id="color" value={this.state.data.color} placeholder="color"
                        onChange={this.handleChange} className="form-control" />
                    <label htmlFor="modelNo">Model no</label>
                    <input type="text" name="modelNumber" id="modelNo" value={this.state.data.modelNumber}
                        placeholder="model no" onChange={this.handleChange} className="form-control" />
                    <label htmlFor="price">Price</label>
                    <input type="numder" name="price" id="price" value={this.state.data.price} placeholder="price"
                        onChange={this.handleChange} className="form-control" />
                    <label htmlFor="size">Size</label>
                    <input type="text" name="size" id="size" value={this.state.data.size} placeholder="size"
                        onChange={this.handleChange} className="form-control" />
                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" id="tags" value={this.state.data.tags}
                        placeholder="tags" onChange={this.handleChange} className="form-control" />
                    <input type="checkbox" name="isFeatured" id="isFeatured" checked={this.state.data.isFeatured}
                        onChange={this.handleChange} />
                    <label htmlFor="isFeatured"> &nbsp; Featured</label>
                    <br />
                    <input type="checkbox" name="isReturnEligible" id="isReturnEligible" checked={this.state.data.isReturnEligible}
                        onChange={this.handleChange} />
                    <label htmlFor="isReturnEligible" >&nbsp; Return Eligible</label>
                    <br />
                    <label htmlFor="manuDate">Manu Date</label>
                    <input type="date" name="manuDate" id="manuDate" value={this.state.data.manuDate}
                        onChange={this.handleChange} className="form-control" />
                    <label htmlFor="exipiryDate">Exipiry Date</label>
                    <input type="date" name="exipiryDate" id="exipiryDate" value={this.state.data.exipiryDate} onChange={this.handleChange}
                        className="form-control" />
                    <input type="checkbox" id="discountedItem" checked={this.state.data.discountedItem}
                        name="discountedItem" onChange={this.handleChange} />
                    <label htmlFor="discountedItem">&nbsp; Discounted Item</label>
                    <br />
                    {
                        this.state.data.discountedItem && (
                            <>
                                <label htmlFor="discountType">Discount Types</label>
                                <select name="discountType" value={this.state.data.discountType} onChange={this.handleChange} className="form-control" >
                                    <option disabled value="">(Discount Types)</option>
                                    <option value="percentage">Percentage</option>
                                    <option value="quantity">Quantity</option>
                                    <option value="value">Value</option>
                                </select>
                                <label htmlFor="discountValue">Discount Value</label>
                                <input type="text" name="discountValue" id="discountedValue" value={this.state.data.discountValue}
                                    placeholder="discount value" onChange={this.handleChange} className="form-control" />
                            </>
                        )
                    }
                    <input type="checkbox" name="warrantyStatus" id="warrantyStatus" checked={this.state.data.warrantyStatus} onChange={this.handleChange} />
                    <label htmlFor="warrantyStatus">&nbsp; Warranty Status</label>
                    <br />
                    {
                        this.state.data.warrantyStatus && (
                            <>
                                <label htmlFor="warrantyPeriod">Warranty Period</label>
                                <input type="text" name="warrantyPeriod" value={this.state.data.warrantyPeriod} placeholder="warranty period" onChange={this.handleChange} className="form-control" />
                            </>
                        )
                    }
                    <label >Choose Image</label>
                    <input type="file" className="form-control" onChange={this.handleChange}></input>
                    <br />
                    {
                        selectedFiles && selectedFiles.length >= 0 && (
                            selectedFiles.map((selectedFile, index) => (
                                <React.Fragment key={index}>
                                    <img src={selectedFile} width="200px" alt="image_product.jpeg"></img>
                                    <TiDeleteOutline className="deleteimg" color="red"
                                        onClick={() => this.removeSelectedImage(index)} size="1.5rem"
                                    /> &nbsp;
                                    <br />

                                </React.Fragment>
                            ))
                        )
                    }
                    <Button isSubmitting={this.props.isSubmitting}
                        isDisabled={!this.state.isValidForm}
                    />
                </form>
            </>
        )
    }
}