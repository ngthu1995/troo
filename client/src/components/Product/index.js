import React, { Component } from "react";
import PageTop from "../utils/page_top";

import ProdNfo from "./prodNfo";
import ProdImg from "./prodImg";

import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail
} from "../../actions/products_actions";
import { addToCart } from "../../actions/user_actions";

class ProductPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id)).then(response => {
      if (!this.props.products.productDetail) {
        this.props.history.push("/");
      }
    });
    console.log(id);
  }

  componentWillMount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCartHandler(id) {
    this.props.dispatch(addToCart(id));
  }

  render() {
    return (
      <div>
        <PageTop title="Product Detail" />
        <div className="container">
          {this.props.products.productDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProdImg detail={this.props.products.productDetail} />
                </div>
              </div>
              <div className="right">
                <ProdNfo
                  addToCart={id => this.addToCartHandler(id)}
                  detail={this.props.products.productDetail}
                />
              </div>
            </div>
          ) : (
            "Loading"
          )}
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

export default connect(mapStateToProps)(ProductPage);
