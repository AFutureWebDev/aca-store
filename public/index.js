window.onload = function() {
    mainDiv = document.getElementById("mainScreen");
    register = document.getElementById("register");
    home = document.getElementById("home");
    txtEmail = document.getElementById("email");
    txtPassword = document.getElementById("password");
    btnSignUp = document.getElementById("btn-signup");
    btnSignUp.onclcik = signUp;
    Products(products);
}

function signUp() {
    let email = txtEmail.value;
    let password = txtPassword.value;
    mainDiv.style.display = "block";
    register.style.display = "none";
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

// didn't finish sessions storage...lost on next step
Products(products);
let parsedItems = JSON.parse(sessionStorage.getItem('cart'));

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
// Created this variable for sessionStorage
let cart = [];
function addToCart(id) {
    let cartItems = document.getElementById('cart-items');
    let product = products.find(function(product) {
        return product.id == id;
    });
    // pushing the items into the array and then adding them into sessionStorage
    cart.push(product);
    sessionStorage.setItem('cart', JSON.stringify(cart));

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


