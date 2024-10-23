document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartList = document.getElementById('cart-list');
    const cart = {};

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            if (cart[productName]) {
                cart[productName].quantity += 1;
                cart[productName].totalPrice += productPrice;
            } else {
                cart[productName] = {
                    price: productPrice,
                    quantity: 1,
                    totalPrice: productPrice
                };
            }
            renderCart();
        });
    });

    function renderCart() {
        cartList.innerHTML = '';
        for (const product in cart) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${product} - Quantity: ${cart[product].quantity}, Total Price: $${cart[product].totalPrice.toFixed(2)}`;
            cartList.appendChild(listItem);
        }
    }
});
