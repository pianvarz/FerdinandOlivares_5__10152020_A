// DRY application
const createElement = element => document.createElement(element);
const append = (parent, el) => parent.appendChild(el);
const classElement = (element, classArray) => {
    classArray.forEach(el => {
        element.classList.add(el);
    });
};

let cart = [];

// transferring productDetailButton of cameras to the product.html 
const urlParams = new URLSearchParams(window.location.search);
let idCamera = urlParams.get("id");

// const productOfInterest = document.getElementById('productOfInterest');
const productContainer = document.querySelector('.productContainer');

// Linking to html file and setting up cart variable
// const addedCartProducts = document.getElementById('addedCartProducts');

// Placement of fetched interested camera (productInfo) 
let camera = null;

// Function for redirecting (clicking the button) to the other cameras available
const backMainFunction = () => window.location = ("../../index.html" + "#featuredProducts")

// cartProducts & cartProductsParse - number of products placed in the cart 
const cartProducts = localStorage.getItem('cart');
const cartProductsParse = JSON.parse(window.localStorage.getItem('cart')); 

// transferring productDetailButton to the product.html 
const fetchProductID = () => {
    fetch("http://localhost:3000/api/cameras/" + idCamera)
    .then(response => response.json())
    .then(function (data) {
        camera = data;
         // Making up DOM for productInfo.html
         let productSection = createElement('section'); // section
         classElement(productSection, ["productSection"]);

         let divNamePrice = createElement('div');
         let divButtons = createElement('div'); // Div for the buttons

         let cameraName = createElement('h2'); // For the Camera name
         classElement(cameraName, ['divNamePrice']);
        cameraName.innerHTML = camera.name;

        let cameraPrice = createElement('span'); // For Camera Price
        classElement(cameraPrice, ['divNamePrice']);
        cameraPrice.innerHTML = 'Camera Price: $' + camera.price / 100;

        let cameraDescription = createElement('p'); // For Camera Description
        classElement(cameraDescription, ['cameraDescription']);
        cameraDescription.innerHTML = 'Camera Description: ' + camera.description;

        let cameraImg = createElement('img'); // For Camera image
        classElement(cameraImg, ['cameraImg']);
        cameraImg.src = camera.imageUrl;

        let cameraLabel = createElement('label'); // For Camera lenses labels
        classElement(cameraLabel, ['cameraLabel']);
        cameraLabel.innerHTML = "Type of Lense: ";

        let cameraLenses = createElement('select');
        classElement(cameraLenses, ['cameraLenses']);
        for (let i = 0; i < camera.lenses.length; i++) { // Function for including values in the lenses tab
            let option = createElement('option');
            let lenses = camera.lenses[i];
            option.setAttribute('value', lenses);
            option.innerHTML = lenses;
            append(cameraLenses, option);
        };

        let otherCameraButton = createElement('button'); // For directing to the homepage products
        classElement(otherCameraButton, ['productButtons']);
        otherCameraButton.innerHTML = "See Other Cameras";
            otherCameraButton.addEventListener('click', e => {
                window.location.href = "../index.html";
            });

        let addProductCartButton = createElement('button'); // For add product to cart function
        classElement(addProductCartButton, ['addProductCartButton']);
        addProductCartButton.innerHTML = 'Add to Cart';

        //Append section
        append(productSection, divNamePrice);
        append(productSection, cameraImg);
        append(productSection, cameraLabel);
        append(productSection, cameraDescription);
        append(productSection, divButtons);

        //Camera Details
        append(divNamePrice, cameraName);
        append(divNamePrice, cameraPrice);
        append(divButtons, otherCameraButton);
        append(divButtons, addProductCartButton);

        //Lenses
        append(cameraLabel, cameraLenses);
        document.getElementById('productOfInterest').appendChild(productSection);

        addProductCartButton.addEventListener("click", () => {
        // Adding products to cart function
            const addProductCart = () => {
                const addCamera = {
                    id: camera._id,
                    name: camera.name,
                    image: camera.imageUrl,
                    description: camera.description,
                    lenses: cameraLenses.value,
                    price: camera.price
                };
                cart = [...cart, addCamera];
                localStorage.setItem('cart', JSON.stringify(cart));
            }

            addProductCart();
            alert("Product's added in the cart");
        });
});
}

fetchProductID();