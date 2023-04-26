// Define an array to store form data
let formDataArray = [];

// To store items added in cart
let cartProducts = [];
//form Validationsc1
// console.log(document.getElementById("ID"));
document.getElementById("ID").addEventListener("blur", function () {
  if (document.getElementById("ID").value === "") {
    document.getElementById("id-error").style.display = "block";
  } else {
    document.getElementById("id-error").style.display = "none";
  }
});

document.getElementById("name").addEventListener("blur", function () {
  if (document.getElementById("name").value === "") {
    document.getElementById("name-error").style.display = "block";
  } else {
    document.getElementById("name-error").style.display = "none";
  }
});

document.getElementById("price").addEventListener("blur", function () {
  if (document.getElementById("price").value === "") {
    document.getElementById("price-error").style.display = "block";
  } else {
    document.getElementById("price-error").style.display = "none";
  }
});
// To update the character Count
document.getElementById("description").addEventListener("input", function () {
  let descriptionString = document.getElementById("description").value;
  //   console.log(descriptionString);

  if (descriptionString.length <= 50) {
    document.getElementById("counter").textContent = descriptionString.length;
  }
});

// Function to submit the form data
function submitForm() {
  // Get the form data
  let formData = {
    id: document.getElementById("ID").value,
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value,
  };

  // reset character count
  //   console.log(document.getElementById("description").value);

  formDataArray.push(formData);

  addProductsToPanel();

  document.getElementById("myForm").reset();
  document.getElementById("counter").textContent = "0";
}

// Function to add the products to the Panel
function addProductsToPanel() {
  let productsSection = document.getElementById("products");

  productsSection.innerHTML = "";

  for (let i = 0; i < formDataArray.length; i++) {
    // console.log(formDataArray[i]);

    let productDiv = document.createElement("div");
    productDiv.classList.add("item-container");

    productDiv.innerHTML = `
      <p>Name: ${formDataArray[i].name}</p>
      <p>Price: ${formDataArray[i].price}</p>
      <p>Description: ${formDataArray[i].description}</p>
      <button class="list-btn add-btn" onclick="addProductToCart(${i})">Add</button>
      <button class="list-btn rst-btn" onclick="removeProduct(${i})">Remove</button>
    `;

    productsSection.appendChild(productDiv);

    // console.log(productDiv);
  }
}

function removeProduct(index) {
  formDataArray.splice(index, 1);

  addProductsToPanel();

  cartProducts.splice(index, 1);
  updateCart();
}

function addProductToCart(index) {
  let product = formDataArray[index];
  // console.log(product);

  let cartItem = cartProducts.find((item) => {
    return item.name === product.name;
  });
  console.log(cartItem);

  if (cartItem) {
    cartItem.quantity++;
    // console.log(cartItem);
    updateCart();
  } else {
    cartProducts.push({
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    updateCart();
  }
}

function updateCart() {
  let cartTable = document.getElementById("cartTable");
  let grandTotalEle = document.getElementById("grandTotal");

  cartTable.innerHTML = `
        <tr>
          <th>Serial Number</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Remove Item</th>
        </tr>
      `;
  // cartProducts.innerHTML = "";

  let grandTotal = 0;
  for (let i = 0; i < cartProducts.length; i++) {
    grandTotalEle.innerHTML = "";

    let totalPrice = cartProducts[i].price * cartProducts[i].quantity;
    grandTotal += totalPrice;

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${i + 1}</td>
        <td>${cartProducts[i].name}</td>
        <td>${cartProducts[i].price}</td>
        <td>
          <button onclick="decreaseQuantity(${i})">-</button>
          ${cartProducts[i].quantity}
          <button onclick="increaseQuantity(${i})">+</button>
        </td>
        <td class='total-price'>${totalPrice}</td>
        <td><button class="list-btn rst-btn" onclick="removeItem(${i})">Remove</button></td>
        
        
      `;

    // Add the row to the cart table
    cartTable.appendChild(row);
    grandTotalEle.innerHTML = `Grand Total : ${grandTotal}`;
    // console.log(row);
  }

  if (cartTable.rows.length === 1) {
    grandTotalEle.innerHTML = `Grand Total : ${Number("0")}`;
  }
  // console.log(cartTable.rows.length);

  // Add Discount
  let bill_amount = document.getElementById("bill_amount");
  bill_amount.innerHTML = `${grandTotal}`;

  discountBill(grandTotal);
}
// To get discount
function discountBill(grandTotal) {
  document.getElementById("discount").addEventListener("input", function () {
    let bill_amount = document.getElementById("bill_amount");
    bill_amount.innerHTML = `${grandTotal}`;
    let discount = Number(document.getElementById("discount").value);
    // console.log(discount);
    if (discount > 0) {
      let payment = grandTotal - grandTotal * (discount / 100);
      // console.log(payment);
      // console.log(typeof grandTotal);
      bill_amount.innerHTML = `${payment}`;
    }
  });
}

// document.getElementById("discount").addEventListener("input", function () {
//   let discount = document.getElementById("discount").value;

//   //   console.log(descriptionString);
// let abcd = document.getElementById()

//   document.getElementById(bill_amount).innerHTML = "discount";
// });
// Function to increase the quantity of a cart item
function increaseQuantity(index) {
  cartProducts[index].quantity++;
  updateCart();
}

// Function to decrease the quantity of a cart item
function decreaseQuantity(index) {
  if (cartProducts[index].quantity > 1) {
    cartProducts[index].quantity--;
  }
  updateCart();
}

function removeItem(index) {
  cartProducts.splice(index, 1);
  updateCart();
}
