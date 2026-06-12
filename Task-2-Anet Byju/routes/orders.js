const express = require("express");
const router = express.Router();

const orders = require("../data/orders");
const orderItems = require("../data/orderItems");
const carts = require("../data/carts");
const cartItems = require("../data/cartItems");
const products = require("../data/products");
const activityLogs = require("../data/activityLogs");

// GET ALL ORDERS
router.get("/", (req, res) => {
    res.json(orders);
});


// GET ORDERS BY USER
router.get("/user/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);

    const userOrders = orders.filter((o) => o.userId === userId);

    const enriched = userOrders.map((order) => {
        const items = orderItems.filter((i) => i.orderId === order.id);

        return {
            ...order,
            items,
        };
    });

    res.json(enriched);
});

// GET ORDER BY ID
router.get("/:id", (req, res) => {
    const orderId = parseInt(req.params.id);

    const order = orders.find((o) => o.id === orderId);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    const items = orderItems.filter((i) => i.orderId === orderId);

    const detailedItems = items.map((item) => {
        const product = products.find((p) => p.id === item.productId);

        return {
            ...item,
            product,
            total: item.price * item.quantity,
        };
    });

    res.json({
        order,
        items: detailedItems,
    });
});





// CREATE ORDER (CHECKOUT FROM CART)
router.post("/checkout", (req, res) => {
    const { userId } = req.body;

    const cart = carts.find((c) => c.userId === userId);

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    const items = cartItems.filter((i) => i.cartId === cart.id);

    if (items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    const newOrderId = orders.length + 1;

    const newOrder = {
        id: newOrderId,
        userId,
        totalAmount: 0,
        status: "Placed",
        createdAt: new Date().toISOString().split("T")[0],
    };

    orders.push(newOrder);
    activityLogs.push({
        id: activityLogs.length + 1,
        userId,
        action: `Placed order #${newOrderId}`,
        timestamp: new Date().toISOString(),
    });

    items.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);

        const orderItem = {
            id: orderItems.length + 1,
            orderId: newOrderId,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
        };

        totalAmount += product.price * item.quantity;

        orderItems.push(orderItem);
    });

    newOrder.totalAmount = totalAmount;

    // clear cart after order
    for (let i = cartItems.length - 1; i >= 0; i--) {
        if (cartItems[i].cartId === cart.id) {
            cartItems.splice(i, 1);
        }
    }

    res.status(201).json({
        message: "Order placed successfully",
        order: newOrder,
    });
});


// UPDATE ORDER STATUS
router.put("/:id", (req, res) => {
    const order = orders.find((o) => o.id === parseInt(req.params.id));

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    const { status } = req.body;

    const allowedStatus = ["Placed", "Shipped", "Delivered", "Cancelled"];

    if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    order.status = status;
    activityLogs.push({
        id: activityLogs.length + 1,
        userId: order.userId,
        action: `Updated order #${order.id} status to ${status}`,
        timestamp: new Date().toISOString(),
    });

    res.json({
        message: "Order status updated",
        order,
    });
});


// DELETE ORDER
router.delete("/:id", (req, res) => {
    const index = orders.findIndex((o) => o.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Order not found" });
    }

    const deleted = orders.splice(index, 1);

    // also remove order items
    for (let i = orderItems.length - 1; i >= 0; i--) {
        if (orderItems[i].orderId === deleted[0].id) {
            orderItems.splice(i, 1);
        }
    }

    activityLogs.push({
        id: activityLogs.length + 1,
        userId: deleted[0].userId,
        action: `Deleted order #${deleted[0].id}`,
        timestamp: new Date().toISOString(),
    });

    res.json({
        message: "Order deleted successfully",
        order: deleted[0],
    });
});

module.exports = router;