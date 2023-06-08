import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PAYPAL_CLIENT_ID from "./client_id";

const PayPalButton = props => {
    const { total, onPaymentSuccess, onPaymentError } = props

    return (
        <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
            <PayPalButtons
                forceReRender={[total()]}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: total(),
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        onPaymentSuccess(data)
                    });
                }}
                onError={(error) => {
                    onPaymentError(error)
                }}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalButton