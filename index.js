document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout-button");

  let order = {
    items: [],
    total: 0,
  };

  function addToCart(name, price) {
    order.items.push({ name, price });
    order.total += price;
    updateCart();
  }

  function updateCart() {
    cartItemsList.innerHTML = "";
    total = 0;

    order.items.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("cart-item");
      listItem.innerHTML = `
            <span>${item.name}</span>
            <span>R${item.price}</span>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
      cartItemsList.appendChild(listItem);
      total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
  }

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = button.parentElement;
      const name = product.querySelector("h2").textContent;
      const price = parseFloat(
        product.querySelector("p").textContent.replace("Price: R", "")
      );
      addToCart(name, price);
    });
  });

  cartItemsList.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      const itemIndex = parseInt(event.target.getAttribute("data-index"), 10);
      if (
        !isNaN(itemIndex) &&
        itemIndex >= 0 &&
        itemIndex < order.items.length
      ) {
        order.items.splice(itemIndex, 1);
        updateCart();
      }
    }
  });

  checkoutButton.addEventListener("click", function () {
    if (order.items.length === 0) {
      alert("Your cart is empty. Add items before checkout.");
    } else {
      alert("Thank you for your purchase!");
      order.items = [];
      order.total = 0;
      updateCart();
    }
  });
});
