import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const STRIPE_PUBLIC_KEY =
    "pk_test_51L3kkxAhvzsHjyHscQs0MVqvbH1R4Giun0aoU2KTc4WIZMAftwnUrOlUlaeQOnlpXJnX8IN20EMXq4nbGoxM8Sqw00X1eHVwWv";

const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const onToken = (token) => {
        setStripeToken(token);
    };
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/checkout/payment",
                    {
                        tokenId: stripeToken.id,
                        amount: 2000,
                    }
                );
                navigate("/success");
            } catch (err) {
                console.error(err);
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, navigate]);
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {stripeToken ? (
                <span>Processing. Please wait...</span>
            ) : (
                <StripeCheckout
                    name="Lama Shop"
                    image="https://avatars.githubusercontent.com/u/1486366?v=4"
                    billingAddress
                    shippingAddress
                    description="Your total is $20"
                    amount={2000} // = $20
                    token={onToken}
                    stripeKey={
                        process.env.STRIPE_PUBLIC_KEY || STRIPE_PUBLIC_KEY
                    }
                >
                    <button
                        style={{
                            border: "none",
                            width: 120,
                            borderRadius: 5,
                            padding: "20px",
                            backgroundColor: "black",
                            color: "white",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        Pay now
                    </button>
                </StripeCheckout>
            )}
        </div>
    );
};

export default Pay;
