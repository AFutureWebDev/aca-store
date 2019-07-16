let products = [];

window.onload = function() {
    fetch("https://acastore.herokuapp.com/products")
        .then(response => response.json())
        .then(data => products = data)
        .then(products => Products(products))
    mainDiv = document.getElementById("mainScreen");
    register = document.getElementById("register");
    home = document.getElementById("home");
    txtEmail = document.getElementById("email");
    txtPassword = document.getElementById("password");
    btnSignUp = document.getElementById("btn-signup");
    btnSignUp.onclick = signUp;
    adminBtn = document.getElementById("admin-btn");
    adminBtn.onclick = admin;
    adminContainer = document.getElementById("admin-container");
    txtName = document.getElementById("product-name");
    txtDescription = document.getElementById("product-description");
    txtPrice = document.getElementById("product-price");
    btnSave = document.getElementById("save-btn");
    btnSave.onclick = save;
}

class User {
    constructor(email, password, cartId) {
      this.email = email;
      this.password = password;
      this.cartId = cartId;
    }
  }

function signUp() {
    mainDiv.style.display = "block";
    register.style.display = "none";
    let newUser = new User(txtEmail.value, txtPassword.value, null);
    fetch("https://acastore.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(response => response.json());
    console.log(newUser);
    localStorage.setItem('newUser', JSON.stringify(newUser));
}

function showHome() {
    Products(products);
}


function Products(products) {
let productLi = "";
let detailsButton = document.createElement('button').value = "More Details";
let toCartButton = document.createElement('button').value = "Add to Cart";

for (let i =0; i < products.length; i++) {
        let product = products[i];
        productLi += `<div class ="container">${product.name}
        <div class="product-image"><img id="picture" src=${product.imgUrl}></div>
        <div class="details" style="visibility: hidden;" id="${product.id}">
            <div>Description: ${product.description}</div>
            <div>Price: ${product.price}</div>
            <div>Number of Reviews: ${product.reviewsNum}</div>
            <div>Rating: ${product.rating}</div>
        </div>
        </div>
        <button onclick = "moreDetails(${product.id})">${detailsButton}</button>
        <button onclick ="addToCart(${product.id});calculateCartTotal();">${toCartButton}</button>
        <select id="quantity">
            <option value="">--Quantity--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>`;
}
document.getElementById("products").innerHTML= productLi;
}

function populateCart() {
parsedItems.forEach()
    let cartItems = document.getElementById('cart-items');
    let li = document.createElement('li');
    let removeButton = document.createElement('button');
    removeButton.innerHTML = "Remove";
    removeButton.addEventListener("click", function(){
        this.parentElement.remove();
    })
    li.appendChild(document.createTextNode(product.name));
    cartItems.appendChild(li);
    let price = document.createElement('span');
    price.className = "amount";
    price.style.paddingLeft = "10px";
    price.appendChild(document.createTextNode(product.price));
    li.appendChild(price);
    li.append(removeButton);
}



function moreDetails(id) {
    let detailsDiv = document.getElementById(id);
    if (detailsDiv !== null) {
        if (detailsDiv.style.visibility === "visible") {
            detailsDiv.style.visibility = "hidden";
        } else if (detailsDiv.style.visibility === "hidden") {
            detailsDiv.style.visibility = "visible";
        }
    } 
}

function addToCart(id) {
    let cartItems = document.getElementById('cart-items');
    let product = products.find(function(product) {
        return product.id == id;
    });
    let li = document.createElement('li');
    let removeButton = document.createElement('button');
    removeButton.innerHTML = "Remove";
    removeButton.addEventListener("click", function(){
        this.parentElement.remove();
        calculateCartTotal();
    })
    li.appendChild(document.createTextNode(product.name));
    cartItems.appendChild(li);
    let price = document.createElement('span');
    price.className = "amount";
    price.style.paddingLeft = "10px";
    price.appendChild(document.createTextNode(product.price));
    li.appendChild(price);
    li.append(removeButton);
}



function calculateCartTotal() {
   let amounts = document.getElementsByClassName("amount");
   let total = 0;
   for (let i = 0; i < amounts.length; i++) {
       const amount = parseFloat(amounts[i].innerText.replace('$', ''));
       total = total + amount;
       total = Math.round(total * 100) / 100;
   }
   console.log(total);
   let cartTotal = document.getElementById('cart-total');
   cartTotal.innerText = "$" + total;
}

function search() {
    let searchWord = document.getElementById("searchBox").value.toLowerCase();
    let filteredProducts = products.filter(p => p.name.toLowerCase() === searchWord)

    Products(filteredProducts);
}


class Save {
    constructor(name, description, price) {
      this.name = name;
      this.description = description;
      this.price = price;
    }
  }

function admin(){
    adminContainer.style.display = "block";
}

function save() {
    let newProduct = new Save(txtName.value, txtDescription.value, txtPrice.value);
    fetch("https://acastore.herokuapp.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    }).then(response => response.json());
    console.log(newProduct);
    localStorage.setItem('newProduct', JSON.stringify(newProduct));
    Products(products);
}


