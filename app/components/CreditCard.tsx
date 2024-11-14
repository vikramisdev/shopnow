import React, { useState } from "react";

const CreditCard = () => {
  const [form, setForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted form data:", form);
    alert("Payment Successful!");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg md:px-6 py-2">
      <div className="flex gap-x-10">
        <div>
          {/* Card Holder Name */}
          <label className="block mb-2 font-medium">Card Holder Name</label>
          <input
            type="text"
            name="cardHolder"
            required
            value={form.cardHolder}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded-md mb-4"
          />
        </div>

        <div>
          {/* Card Number */}
          <label className="block mb-2 font-medium">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            maxLength={16}
            required
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="w-full px-3 py-2 border rounded-md mb-4"
          />
        </div>
      </div>

      <div className="flex gap-x-10">
        <div>
          {/* Expiry Date */}
          <label className="block mb-2 font-medium">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            maxLength={5}
            required
            value={form.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            className="w-full px-3 py-2 border rounded-md mb-4"
          />
        </div>

        <div>
          {/* CVV */}
          <label className="block mb-2 font-medium">CVV</label>
          <input
            type="password"
            name="cvv"
            maxLength={5}
            required
            value={form.cvv}
            onChange={handleChange}
            placeholder="123"
            className="w-full px-3 py-2 border rounded-md mb-4"
          />
        </div>
      </div>
    </form>
  );
};

export default CreditCard;
