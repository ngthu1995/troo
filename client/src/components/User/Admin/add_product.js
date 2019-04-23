import React, { Component } from "react";
import UserLayout from "../../../hoc/user";
import FormField from "../../utils/Form/formfield";
import {
  update,
  generateData,
  ifFormValid,
  populateOptionFields,
  resetFields
} from "../../utils/Form/formActions";
import FileUpload from "../../utils/Form/fileupload";

import { connect } from "react-redux";
import {
  getBrands,
  getLifestyles,
  addProduct,
  clearProduct
} from "../../../actions/products_actions";

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Product name",
          name: "name_input",
          type: "text",
          placeholder: "Enter your product name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          label: "Product description",
          name: "description_input",
          type: "text",
          placeholder: "Add your description"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Product price",
          name: "price_input",
          type: "text",
          placeholder: "Enter your price"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      brand: {
        element: "select",
        value: "",
        config: {
          label: "Product brand",
          name: "brand_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      shipping: {
        element: "select",
        value: "",
        config: {
          label: "Shipping",
          name: "shipping_input",
          options: [
            {
              key: true,
              value: "Yes"
            },
            {
              key: false,
              value: "No"
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      available: {
        element: "select",
        value: "",
        config: {
          label: "Available, in stock",
          name: "available_input",
          options: [
            {
              key: true,
              value: "Yes"
            },
            {
              key: false,
              value: "No"
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      lifestyle: {
        element: "select",
        value: "",
        config: {
          label: "Lifestyle",
          name: "lifestyle_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      size: {
        element: "select",
        value: "",
        config: {
          label: "Size",
          name: "size_input",
          options: [
            {
              key: 20,
              value: "Daily"
            },
            {
              key: 21,
              value: "Weekly"
            },
            {
              key: 22,
              value: "Monthly"
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      publish: {
        element: "select",
        value: "",
        config: {
          label: "Publish",
          name: "publish_input",
          options: [
            {
              key: true,
              value: "Public"
            },
            {
              key: false,
              value: "Hidden"
            }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showlabel: false
      }
    }
  };

  updateField = newFormdata => {
    this.setState({
      formdata: newFormdata
    });
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "products");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formdata, "products");
    this.setState({
      formSuccess: true,
      formdata: newFormData
    });

    setTimeout(() => {
      this.setState(
        {
          formSuccess: false
        },
        () => {
          this.props.dispatch(clearProduct());
        }
      );
    }, 3000);
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "products");
    let formIsValid = ifFormValid(this.state.formdata, "products");

    if (formIsValid) {
      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if (this.props.products.addProduct.success) {
          this.resetFieldHandler();
        } else {
          this.setState({
            formError: true
          });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  componentDidMount() {
    const formdata = this.state.formdata;

    this.props.dispatch(getBrands()).then(response => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.brands,
        "brand"
      );
      console.log(newFormData);

      this.updateField(newFormData);
    });

    this.props.dispatch(getLifestyles()).then(response => {
      const newFormData = populateOptionFields(
        formdata,
        this.props.products.lifestyles,
        "lifestyle"
      );
      console.log(newFormData);

      this.updateField(newFormData);
    });
  }

  imagesHandler = images => {
    const newFormData = { ...this.state.formdata };

    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    this.setState({
      formdata: newFormData
    });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add product</h1>
          <form onSubmit={event => this.submitForm(event)}>
            <FileUpload
              imagesHandler={images => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />

            <FormField
              id={"name"}
              formdata={this.state.formdata.name}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"description"}
              formdata={this.state.formdata.description}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"price"}
              formdata={this.state.formdata.price}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id={"brand"}
              formdata={this.state.formdata.brand}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"shipping"}
              formdata={this.state.formdata.shipping}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"available"}
              formdata={this.state.formdata.available}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id={"lifestyle"}
              formdata={this.state.formdata.lifestyle}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"size"}
              formdata={this.state.formdata.size}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id={"publish"}
              formdata={this.state.formdata.publish}
              change={element => this.updateForm(element)}
            />

            <div>
              {this.state.formSuccess ? (
                <div className="form_success">Success</div>
              ) : null}
              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={event => this.submitForm(event)}>
                Add product
              </button>
            </div>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(AddProduct);
