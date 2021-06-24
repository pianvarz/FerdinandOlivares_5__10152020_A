// DRY application
const createElement = element => document.createElement(element);
const append = (parent, el) => parent.appendChild(el);
const classElement = (element, classArray) => {
    classArray.forEach(el => {
        element.classList.add(el);
    });
};

// Linking to html file and setting up cart variable
let cart = [];
// Products placed under the cart
// // cartProducts & cartProductsParse - number of products placed in the cart 
const cartProducts = localStorage.setItem("cart", JSON.stringify(cart));

// Setting products in index.html
// fetchIndex - API request and if/else function if successful 

const fetchIndex = () => {
    fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(function (data) {
    for (let camera of data) { 
        // Making up DOM for index.html
        // let mainBlock = createElement("section"); // mainBlock for productContainer 
        // classElement(mainBlock, ["mainBlock"]);
        
        // let productContainer = createElement("div"); //productContainer - main body that includes all products
        // classElement(productContainer, ["pro-con"]);

        let cameraCard = createElement("section"); //cameraCard(class="card")- product element
        classElement(cameraCard, ["card"]);

        let cameraDetails = createElement("div"); //cameraDetails (class="productDetails" - product"s title and descrip. 
        classElement(cameraDetails, ["cameraDetails"]);

        let cameraButtons = createElement("div");
        classElement(cameraButtons, ["cameraButtons"]);

        // Creating Elements for DOM
        let cameraImg = createElement("img"); //    Image 
        classElement(cameraImg, ["cameraImg"]);
        cameraImg.setAttribute("alt", "Avalailable Cameras");
        cameraImg.src = camera.imageUrl;

        let cameraName = createElement("h2"); //    H2
        classElement(cameraName, ["cameraName"]);
        cameraName.innerHTML = camera.name;

        let cameraPrice = createElement("span");//     span(camera price)
        classElement(cameraPrice, ["cameraPrice"]);
        cameraPrice.innerHTML = "Camera Price: $" + camera.price / 100 + ".00";

        let cameraDescription = createElement("p");//   p
        classElement(cameraDescription, ["cameraDescription"]);
        cameraDescription.innerHTML = "Camera Description: " + camera.description;

        let productDetailsButton = createElement("button");//   Two Buttons; productDetails & addProductCart
        classElement(productDetailsButton, ["buttons"]);
        productDetailsButton.innerHTML = "More Info";

        // let addProductCartButton = createElement("button");
        // classElement(addProductCartButton, ["addProductCartButton"]);
        // addProductCartButton.innerHTML = "Add to Cart";

        const productDetails = () => {     //addEventListener for productDetails 
            productDetailsButton.addEventListener("click", () => {
                let id = camera._id;
                document.location.href = "./frontEnd/productInfo.html?id=" + id;
            });
        };

        productDetails ();

        //addEventListener for addProductCart

        // addProductCartButton.addEventListener("click", () => {
        //     const addProductCart = () => {
        //         const addCamera = {
        //             id: camera._id,
        //             name: camera.name,
        //             image: camera.imageUrl,
        //             description: camera.description,
        //             lense: camera.lenses[0], // [prompt('Please pick a type of lense', )],
        //             price: camera.price
        //         };
        //         cart = [...cart, addCamera];

        //         localStorage.setItem('cart', JSON.stringify(cart));
        
        //         console.log(cart.length);
        //         // addedCartProducts.innerHTML = cart.length;
        //     };
        //     try {
        //         addProductCart();
        //         alert("Product's added in the cart")
        //     } catch (error) {
        //         containerCameras.innerHTML = "<div class = error><strong> Error, please try again later!</strong></div>";
        //     }
        // });
        // Append JS created section
        //Cards details
        append(cameraDetails, cameraName);
        append(cameraCard, cameraImg);         //Image in Card
        
        append(cameraDetails, cameraPrice);
        append(cameraDetails, cameraDescription);
        append(cameraCard, cameraDetails);
        
        //DOM placement
        append(cameraCard, cameraButtons);
        document.getElementById("containerCameras").appendChild(cameraCard);


        //Buttons Placement
        append(cameraButtons, productDetailsButton);
        // append(cameraButtons, addProductCartButton);

        // document.getElementById("containerCameras").appendChild(mainBlock); //Appending html"s #containerCamera to child mainBlock
    }

    }) .catch(error => {
            console.log(error);
    });
};

fetchIndex();

// // Cart number of pruducts
// // Function for showing number of added products in cart for all pages
// let productsInCart = JSON.parse(localStorage.getItem('cart'));
// if (!productsInCart === 0) {
//    addedCartProducts.innerHTML = 0;
// } else {
//    addedCartProducts.innerHTML = cart.length;
// }