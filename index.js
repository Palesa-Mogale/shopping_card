document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let cart = [];
  let total = 0;

  function updateCart() {
    cartItemsList.innerHTML = "";
    total = 0;

    cart.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("cart-item");
      listItem.innerHTML = `
                <span>${item.name}</span>
                <span>R${item.price}</span>
                <button class="remove-item" data-name="${item.name}">Remove</button>
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
      cart.push({ name, price });
      updateCart();
    });
  });

  cartItemsList.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
      const itemName = event.target.getAttribute("data-name");
      const itemIndex = cart.findIndex((item) => item.name === itemName);
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCart();
      }
    }
  });
});
