//-----------------------------------------------------------------------------------
// ADD TO CART BUTTON
//-----------------------------------------------------------------------------------
const addToCartBtn = document.querySelector(".atc-btn");
const item = document.querySelector(".item-name");
const itemImg = document.querySelector(".thumbnail-imgs");
const price = document.querySelector(".price");
const minusQty = document.querySelector(".qty-minus");
const plusQty = document.querySelector(".qty-plus");
const qty = document.querySelector(".qty");

const cartImgSrc =
  itemImg.firstElementChild.firstElementChild.getAttribute("src");
const priceString = price.innerText;
const priceNumber = parseFloat(priceString.replace(/[^0-9.-]+/g, "")).toFixed(
  2,
);

qty.value = 0;
let numberQty = parseInt(qty.value);

qty.addEventListener("change", (event) => {
  numberQty = parseInt(event.target.value);
});

minusQty.addEventListener("click", () => {
  if (numberQty > 0) {
    numberQty = numberQty - 1;
    qty.value = numberQty;
  }
});
plusQty.addEventListener("click", () => {
  if (numberQty < 999) {
    numberQty = numberQty + 1;
    qty.value = numberQty;
  }
});

addToCartBtn.addEventListener("click", () => {
  if (qty.value > 0) {
    const cart = [];
    const cartItem = {
      name: item.innerText,
      imgSrc: cartImgSrc,
      qty: qty.value,
      price: `$${priceNumber}`,
      total: `$${(qty.value * priceNumber).toFixed(2)}`,
    };

    cart.push(cartItem);

    window.localStorage.setItem("cart", JSON.stringify(cart));
    qty.value = 0;
    numberQty = parseInt(qty.value);
    updateCartDisplay();
    updateCartContents();
  }
});

//-----------------------------------------------------------------------------------
// SHOW CART
//-----------------------------------------------------------------------------------
const cartIcon = document.querySelector(".cart-icon");
const cartInfoContainer = document.querySelector(".cart-info-container");

cartIcon.addEventListener("click", () => {
  cartInfoContainer.classList.toggle("d-none");
});

//-----------------------------------------------------------------------------------
// BUILD CART ITEM COMPONENT
//-----------------------------------------------------------------------------------
const buildCartItemComponent = (item) => {
  // ---
  const divCartItem = document.createElement("div");
  divCartItem.classList.add("cart-item");

  // -
  const ImgCartItem = document.createElement("img");
  ImgCartItem.classList.add("cart-item-img");
  ImgCartItem.setAttribute("src", item.imgSrc);
  ImgCartItem.setAttribute("alt", `${item.name} image`);
  // -

  // --
  const divCartItemText = document.createElement("div");
  divCartItemText.classList.add("cart-item-text");

  // -
  const spanCartItemName = document.createElement("span");
  spanCartItemName.classList.add("cart-item-name");
  spanCartItemName.innerText = item.name;
  // -

  // -
  const div = document.createElement("div");

  const spanCartItemUnitPrice = document.createElement("span");
  spanCartItemUnitPrice.classList.add("cart-item-unit-price");
  spanCartItemUnitPrice.innerText = item.price;

  const spanX = document.createElement("span");
  spanX.innerText = " x ";

  const spanCartItemQty = document.createElement("span");
  spanCartItemQty.classList.add("cart-item-qty");
  spanCartItemQty.innerText = `${item.qty} `;

  const spanCartItemTotal = document.createElement("span");
  spanCartItemTotal.classList.add("cart-item-total");
  spanCartItemTotal.innerText = item.total;

  div.appendChild(spanCartItemUnitPrice);
  div.appendChild(spanX);
  div.appendChild(spanCartItemQty);
  div.appendChild(spanCartItemTotal);
  // -

  divCartItemText.appendChild(spanCartItemName);
  divCartItemText.appendChild(div);
  // --

  // --
  const divCartDeleteIcon = document.createElement("div");
  divCartDeleteIcon.classList.add("cart-delete-icon");
  divCartDeleteIcon.setAttribute("onclick", "cartDeleteItem(event)");

  const svgDeleteIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  svgDeleteIcon.setAttribute("width", "14");
  svgDeleteIcon.setAttribute("height", "16");
  svgDeleteIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgDeleteIcon.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

  const pathDeleteIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  pathDeleteIcon.setAttribute("fill", "#C3CAD9");
  pathDeleteIcon.setAttribute("fill-rule", "nonzero");
  pathDeleteIcon.setAttributeNS(
    null,
    "d",
    "M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z",
  );
  pathDeleteIcon.setAttribute("id", "a");

  svgDeleteIcon.appendChild(pathDeleteIcon);

  divCartDeleteIcon.appendChild(svgDeleteIcon);
  // --

  divCartItem.appendChild(ImgCartItem);
  divCartItem.appendChild(divCartItemText);
  divCartItem.appendChild(divCartDeleteIcon);
  // ---

  return divCartItem;
};

//-----------------------------------------------------------------------------------
// CART CONTENTS UPDATE
//-----------------------------------------------------------------------------------
const updateCartDisplay = () => {
  const cart = JSON.parse(window.localStorage.getItem("cart" || []));
  const cartFilled = document.querySelector(".cart-filled");
  const cartEmpty = document.querySelector(".cart-empty");
  const cartBadge = document.querySelector(".cart-icon-badge");

  if (cart.length > 0) {
    cartEmpty.classList.add("d-none");
    cartBadge.classList.remove("d-none");
    cartFilled.classList.remove("d-none");
  } else {
    cartEmpty.classList.remove("d-none");
    cartBadge.classList.add("d-none");
    cartFilled.classList.add("d-none");
  }
};

const updateCartContents = () => {
  const cart = JSON.parse(window.localStorage.getItem("cart" || []));
  const cartFilled = document.querySelector(".cart-filled");
  const cartItemComponents = document.querySelectorAll(".cart-item");
  const cartBadge = document.querySelector(".cart-icon-badge");
  cartItemComponents.forEach((cartItemComponent) => {
    cartItemComponent.remove();
  });
  let qtyCount = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      qtyCount = qtyCount + parseInt(item.qty);
      console.log(qtyCount);
      const builtCartItemComponent = buildCartItemComponent(item);
      cartFilled.prepend(builtCartItemComponent);
    });
  }
  cartBadge.firstElementChild.innerText = qtyCount;
};

window.onload = () => {
  updateCartDisplay();
  updateCartContents();
};

//-----------------------------------------------------------------------------------
// DELETE CART ITEM
//-----------------------------------------------------------------------------------
const cartDeleteItem = (event) => {
  const itemName =
    event.target.parentElement.parentElement.parentElement.querySelector(
      ".cart-item-name",
    ).innerText;
  const cart = JSON.parse(window.localStorage.getItem("cart" || []));

  cart.forEach((item, index) => {
    if (item.name === itemName) {
      cart.splice(index, 1);
    }
  });

  window.localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  updateCartContents();
};
