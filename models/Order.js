import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    line_items: Object,
    firstname: String,
    lastname: String,
    mobilenumber: String,
    email: String,
    city: String,
    address: String,
    postcode: String,
    state: String,
    country: String,
    paid: Boolean
}, {
    timestamps: true
})

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;