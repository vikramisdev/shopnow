const USDToINR = (usd: number) =>
	`₹${Math.round(usd * 83).toLocaleString("en-IN")}`;

export default USDToINR;
