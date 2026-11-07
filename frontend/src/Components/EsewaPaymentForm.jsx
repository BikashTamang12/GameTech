import React from 'react';

const EsewaPaymentForm = () => {
  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input type="text" id="amount" name="amount" value="100" readOnly required />
      <input type="text" id="tax_amount" name="tax_amount" value="10" readOnly required />
      <input type="text" id="total_amount" name="total_amount" value="110" readOnly required />
      <input type="text" id="transaction_uuid" name="transaction_uuid" value="241028" readOnly required />
      <input type="text" id="product_code" name="product_code" value="EPAYTEST" readOnly required />
      <input type="text" id="product_service_charge" name="product_service_charge" value="0" readOnly required />
      <input type="text" id="product_delivery_charge" name="product_delivery_charge" value="0" readOnly required />
      <input type="text" id="success_url" name="success_url" value="https://developer.esewa.com.np/success" readOnly required />
      <input type="text" id="failure_url" name="failure_url" value="https://developer.esewa.com.np/failure" readOnly required />
      <input type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" readOnly required />
      <input type="text" id="signature" name="signature" value="i94zsd3oXF6ZsSr/kGqT4sSzYQzjj1W/waxjWyRwaME=" readOnly required />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default EsewaPaymentForm;
