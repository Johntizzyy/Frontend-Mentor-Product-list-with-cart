// // index.js

// import data from './data.json' //assert { type: 'json' };

// console.log(data); // Outputs the entire JSON object
// console.log(data.title); // Outputs: Hello World

// index.js

const dessertContainer = document.getElementById("dessert-cont");

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
                      (window.innerWidth <= 600)
                        ? data.image.mobile
                        : data.image.desktop
                    } />
                    <div class="addTocart">
                      <button>Add to cart</button>
                    </div>
                    <p>${data.category}</p>
        
                    <h2>${data.name}</h2>
                    <h2 class="price">$${(Number.isInteger(data.price))?data.price + ".00":data.price+'0'}</h2>
                  </div>
                `
    );
    dessertContainer.innerHTML = desserts;

  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
