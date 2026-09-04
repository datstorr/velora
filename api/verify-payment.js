// This verifies that the payment actually came from Razorpay and wasn't faked.
const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      cart,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }

    // Payment is genuinely confirmed at this point.
    // NOTE: There's no database yet, so order details aren't saved anywhere
    // automatically. For now, this just logs to Vercel's function logs.
    // Next step (recommended): send yourself an email/notification here
    // with the order + customer details so you know to ship it.
    console.log("NEW PAID ORDER:", {
      payment_id: razorpay_payment_id,
      customer,
      cart,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Verification failed" });
  }
};
