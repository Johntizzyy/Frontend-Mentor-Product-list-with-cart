// // index.js

// import data from './data.json' //assert { type: 'json' };

// console.log(data); // Outputs the entire JSON object
// console.log(data.title); // Outputs: Hello World

// index.js

const dessertContainer = document.getElementById("dessert-cont");
// console.log(finalCart.textContent)

fetch("./data.json") // Adjust the path if necessary
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json(); // Parse the JSON data
    
  })
  .then((Data) => {
    let desserts = Data.map(
      (data) =>
        `
                <div class="card dessertItems">
                    <img src=${
                      window.innerWidth <= 600
                        ? data.image.mobile
                        : data.image.desktop
                    } />
                    <div class="addTocart" data-name=${
                      data.name
                    } data-category=${data.category} data-price=${
          Number.isInteger(data.price) ? data.price + ".00" : data.price + "00"
        } data-image = ${window.innerWidth <= 600
          ? data.image.mobile
          : data.image.desktop}>
                      <button id="addToCartBtn">Add to cart</button>
                    </div>
                    <p>${data.category}</p>
        
                    <h2>${data.name}</h2>
                    <h2 class="price">$${
                      Number.isInteger(data.price)
                        ? data.price + ".00"
                        : data.price + "0"
                    }</h2>
                  </div>
                `
    );
    dessertContainer.innerHTML = desserts;

    const buttons = document.querySelectorAll("#addToCartBtn");
    buttons.forEach((button) => {
      let count = 0;
      let totalP = 0;
      let pricesArray = [];

      button.onclick = () => {
        const product = button.parentElement;
        const productName = product.getAttribute("data-name");
        let productPrice = parseFloat(product.getAttribute("data-price"));
        const productCat = product.getAttribute("data-category");
        const productImage = product.getAttribute("data-image")

        const orderTotal = document.querySelectorAll(".block-display");
        const emptyCart = document.getElementById("emptyCart");


        console.log(orderTotal);


        const iProduct = document.getElementById("product-name");


        iProduct.innerHTML = productName;

        emptyCart.style.display = "none";
        orderTotal.forEach((element) => {
          element.style.display = "block";
        }); //.style.display = "block"
        console.log(iProduct);
        count += 1;
        totalP += productPrice;


        pricesArray.push(productPrice);
        console.log(pricesArray);


        let priceSum = 0
        for(const num of pricesArray){
          priceSum += num
        }
        console.log(priceSum)


        const cartItems = document.getElementById("cartItemsz");
        const total = document.getElementById('total')
        
        const cartItem = `

          <div class="itemDetails">
            <div class="product-count">${count}x</div
              ><div class="initial-price">@${Number.isInteger(productPrice)?`${productPrice}.00`:`${productPrice}0`}</div
              ><div class="total-price">$${Number.isInteger(priceSum)?`${priceSum}.00`:`${priceSum}0`}</div></div>              

          </div>
               
      `;

        cartItems.innerHTML = cartItem;
        total.innerHTML = Number.isInteger(priceSum)?`$${priceSum}.00`:`$${priceSum}0`
  


        confirmButton.addEventListener("click", () => {
          finalCart.style.display = "block";
          overlay.style.display = "block"
          // document.body.style.backgroundColor = "red"
          finalCartStyle(productImage,count,productName,productPrice,priceSum)
          // console.log(finalCart)
        });
      };
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });



const confirmButton = document.getElementById("confirm-button");
const finalCart = document.getElementById("confirm");
const overlay = document.getElementById('overlay')




function finalCartStyle(img,count,productName,productPrice,priceSum) {
  let finalCartDiv = `
  <img src="assets/images/icon-order-confirmed.svg" />
      <h1>Order confirmed</h1>
      <p>We hope you enjoy your foodd</p>

      <div id="final-cart-container">

        <div class="final-cart">
          <div class="div-1">
            <img src=${img} />
            <div class="cart-details">
              <h3>${productName}</h3>
              <p><span class="s-1">${count}x</span> <span class="s-2">@${Number.isInteger(productPrice)?`${productPrice}.00`:`${productPrice}0`}</span></p>
            </div>
          </div>
          <div class="total">$${Number.isInteger(priceSum)?`${priceSum}.00`:`${priceSum}0`}</div>
      </div>

      <div class="order-total block-display" >
        <div>
          <p>Order total</p>
          <div class="total">$${Number.isInteger(priceSum)?`${priceSum}.00`:`${priceSum}0`}</div>
        </div>
        <button id="confirm-button">Confirm Order</button>
      </div>
  `;
  return finalCart.innerHTML = finalCartDiv
}
