import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

class Paypal extends Component {
  render() {
    const onSuccess = payment => {
      ///console.log(JSON.stringify(payment));
      this.props.onSuccess(payment);

      ///The payment was succeeded! {paid: true,
      // cancelled: false,
      // payerID: "NT32EVWTVA9GW",
      // paymentID: "PAYID-LTBGSVA9LS90464MY901122B",
      // paymentToken: "EC-8AV0144814082100U", …}
      // address: {recipient_name: "test buyer",
      // line1: "1 Main St", city: "San Jose",
      // state: "CA", postal_code: "95131", …}
      // cancelled: falseemail: "ngthu1995-buyer@yahoo.com.vn"paid: truepayerID: "NT32EVWTVA9GW"
      // paymentID: "PAYID-LTBGSVA9LS90464MY901122B"paymentToken: "EC-8AV0144814082100U"
      // returnUrl: "https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LTBGSVA9LS90464MY901122B&token=EC-8AV0144814082100U&PayerID=NT32EVWTVA9GW"__proto__: Object
    };

    const onCancel = data => {
      console.log(JSON.stringify(data));
    };

    const onError = err => {
      console.log(JSON.stringify(err));
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;

    const client = {
      sandbox:
        "AZh3TgoFJJIiv6PNpdDH8LFlurMLIndB_2jWvaeVLHr1_imWOsznjuwKXI9_dsEsjtn7lhcvaw2j2_U2",
      prodcution: ""
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout"
          }}
        />
      </div>
    );
  }
}

export default Paypal;
