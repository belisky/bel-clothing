import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey ='pk_test_51KSHcAKYath4DzrJStgSa3Ynj6OABlrlybX6j86bYW4nOxyfZJ1LZ4bz3ECoaRYlyLTufsMXzl8CwejKkLsZiYHD00M729yI0x'
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='B Clothing Ltd.'
            billingAddress
            shippingAddress 
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}        
        />
    )


};

export default StripeCheckoutButton;
