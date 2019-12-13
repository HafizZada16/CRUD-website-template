// function check(){
//     var fullmail = document.getElementById("mailin").value ;

//     var indx = fullmail.search("@");
//     var username = fullmail.slice(0, indx);
//     var domain = fullmail.slice(indx+1);

//     document.getElementById("userin").value = username;
//     document.getElementById("domainin").value = domain;
// }

var saleRadioButtons = document.getElementsByName("onSale");

var inputs = document.getElementsByClassName("form-control");

var productsContainer;

if (localStorage.getItem("productData") == null) {
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem("productData"));
    displayProducts();
}

function validateName(inputValue) {
    var nameRegex = /^[a-zA-Z][a-zA-z0-9]{2,20}$/;
    if (nameRegex.test(inputValue) == false) {
        return false;
    }
    else {
        return true;
    }
}

function validateCategory(inputValue) {
    var categoryRegex = /^[a-zA-Z]{3,10}$/;
    if (categoryRegex.test(inputValue) == false) {
        return false;
    }
    else {
        return true;
    }
}

function validatePrice(inputValue) {
    var priceRegex = /^[0-9]{1,6}$/;
    if (priceRegex.test(inputValue) == false) {
        return false;
    }
    else {
        return true;
    }
}

function validateDesc(inputValue) {
    var descRegex = /^[a-zA-Z0-9]{3,100}$/;
    if (descRegex.test(inputValue) == false) {
        return false;
    }
    else {
        return true;
    }
}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
function addProduct() {
    var productImage = document.getElementById("inputGroupFile04").value;
    productImage = productImage.slice(12);
    var productName = document.getElementById("nameInp").value;
    var productCategory = document.getElementById("categoryInp").value;
    var productPrice = document.getElementById("priceInp").value;
    var productDesc = document.getElementById("descInp").value;
    var productSale = false;

    if (validateName(productName) == true && validateCategory(productCategory) == true && validatePrice(productPrice) == true && validateDesc(productDesc) == true) {
        if (saleRadioButtons[0].checked == true) {
            productSale = true;
        }

        var product =
        {
            image: productImage,
            name: productName,
            category: productCategory,
            price: productPrice,
            desc: productDesc,
            sale: productSale
        }

        productsContainer.push(product);
        localStorage.setItem("productData", JSON.stringify(productsContainer));
        // console.log(productsContainer);

        clearForm();
        displayProducts();
    }
    else {
        window.alert("Not Valid Input")
    }

}

function displayProducts() {
    var temp = "";

    for (var i = 0; i < productsContainer.length; i++) {

        //if (productsContainer[i].name == '' || productsContainer[i].desc == '' || productsContainer[i].price == '') {
        //  window.alert("please enter a value")
        //  }
        //else {
        temp += ` <div class="col-md-3">
            <div class="product mb-4">
            <div class="controlProduct"> 
            <img id="productImg" src="images/1.jpg" alt="img" class="img-fluid">
            <div class="controlLayer d-flex justify-content-center align-items-center">
            <button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger btn-sm">DELETE</button>
            <button onclick="updateProduct(`+ i + `)" class="btn btn-outline-warning btn-sm">UPDATE</button>
            </div>
            </div>
            <h4>`+ productsContainer[i].name + `<span class="ml-3 badge badge-info">` + productsContainer[i].category + `</span>
            </h4>
            <p>`+ productsContainer[i].desc + `</p>
            <span class="badge badge-pill badge-success priceBadge"> Price: `+ productsContainer[i].price + `</span>
           `;

        if (productsContainer[i].sale == true) {
            temp += `<div class="sale">sale</div>`;
        }

        temp += `</div> </div>`
        //  }
    }

    document.getElementById("productsRow").innerHTML = temp;
}

function searchProducts(term) {
    //console.log(term);
    var temp = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            temp += ` <div class="col-md-3">
            <div class="product mb-4">
            <div class="controlProduct"> 
            <img src="images/1.jpg" alt="img" class="img-fluid">
            <div class="controlLayer d-flex justify-content-center align-items-center">
            <button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger btn-sm">DELETE</button>
            <button onclick="updateProduct(`+ i + `)" class="btn btn-outline-warning btn-sm">UPDATE</button>
            </div>
            </div>
            <h4>`+ productsContainer[i].name + `<span class="ml-3 badge badge-info">` + productsContainer[i].category + `</span>
            </h4>
            <p>`+ productsContainer[i].desc + `</p>
            <span class="badge badge-pill badge-success priceBadge"> Price: `+ productsContainer[i].price + `</span>
           `;
            if (productsContainer[i].sale == true) {
                temp += `<div class="sale">sale</div>`;
            }
            temp += `</div> </div>`
        }
    }
    document.getElementById("productsRow").innerHTML = temp;
}

function deleteProduct(indx) {
    //console.log(indx);
    var deleted = productsContainer.splice(indx, 1);
    localStorage.setItem("productData", JSON.stringify(productsContainer));
    displayProducts();
}

function updateProduct(indx) {
    var productName = document.getElementById("nameInp").value;
    var productCategory = document.getElementById("categoryInp").value;
    var productPrice = document.getElementById("priceInp").value;
    var productDesc = document.getElementById("descInp").value;
    //var productSale = false;
    if (validateName(productName) == true && validateCategory(productCategory) == true && validatePrice(productPrice) == true && validateDesc(productDesc) == true) {
        productsContainer[indx].name = productName;
        productsContainer[indx].category = productCategory;
        productsContainer[indx].price = productPrice;
        productsContainer[indx].desc = productDesc;
        productsContainer[indx].sale = false;

        if (saleRadioButtons[0].checked == true) {
            productsContainer[indx].sale = true;
        }
        displayProducts();
        clearForm();
    }
    else
    {
        window.alert("Not Valid Input");
    }
}






