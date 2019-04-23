import React, { Component } from "react";
import FormField from "../../utils/Form/formfield";
import {
  update,
  generateData,
  ifFormValid,
  resetFields
} from "../../utils/Form/formActions";

import { connect } from "react-redux";
import { getLifestyles, addLifestyle } from "../../../actions/products_actions";

class ManageLifestyles extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "lifestyle_input",
          type: "text",
          placeholder: "Enter the lifestyle"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  showCategoryItems = () =>
    this.props.products.lifestyles
      ? this.props.products.lifestyles.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "lifestyles");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formdata, "lifestyles");

    this.setState({
      formdata: newFormData,
      formSuccess: true
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "lifestyles");
    let formIsValid = ifFormValid(this.state.formdata, "lifestyles");
    let existingLifestyles = this.props.products.lifestyles;
    console.log(existingLifestyles);

    if (formIsValid) {
      this.props
        .dispatch(addLifestyle(dataToSubmit, existingLifestyles))
        .then(response => {
          if (response.payload.success) {
            this.resetFieldsHandler();
          } else {
            this.setState({ formError: true });
          }
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  componentDidMount() {
    this.props.dispatch(getLifestyles());
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Lifestyles</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"name"}
                formdata={this.state.formdata.name}
                change={element => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <button onClick={event => this.submitForm(event)}>
                Add lifestyle
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ManageLifestyles);
