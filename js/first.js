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

//var initData = '{"image":"images/2.jpg","name":"aaa","category":"aaa","price":"0","desc":"aaa","sale":true}';
// console.log(initData);
// productsContainer = JSON.parse(initData);
// console.log(productsContainer);
// localStorage.setItem("productData", JSON.stringify(productsContainer));
//console.log((JSON.parse(localStorage.getItem("productData")).length));

/**HANDLE LOCAL STORAGE */
if (localStorage.getItem("productData") == null || (JSON.parse(localStorage.getItem("productData")).length) == 0) {
    var temp = `<img id="productImg" src="/images/" alt=" " class="img-fluid">`;
    document.getElementById("productsRow").innerHTML = temp;
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem("productData"));
    displayProducts();
}
/**END HANDLE LOCAL STORAGE */

/**Default hide alert */
$("#prodNameAlert").css("display", "none");
$("#prodCategAlert").css("display", "none");
$("#prodPriceAlert").css("display", "none");
$("#prodDescAlert").css("display", "none");

var nameV;
var categV;
var priceV;
var descV;
/**Validation Functions */
function validateProdName(inputValue) {
    var nameRegex = /^[a-zA-Z][a-zA-z0-9-,._ ]{2,20}$/;
    if (nameRegex.test(inputValue) == false) {
        $("#prodNameAlert").css("display", "block");
        nameV = 1;
        return false;
    }
    else {
        $("#prodNameAlert").css("display", "none");
        nameV = 0;
        return true;
    }
}

function validateProdCateg(inputValue) {
    var categoryRegex = /^[a-zA-Z ]{3,10}$/;
    if (categoryRegex.test(inputValue) == false) {
        $("#prodCategAlert").css("display", "block");
        categV = 1;
        return false;
    }
    else {
        $("#prodCategAlert").css("display", "none");
        categV = 0;
        return true;
    }
}

function validateProdPrice(inputValue) {
    var priceRegex = /^[0-9]{1,6}$/;
    if (priceRegex.test(inputValue) == false) {
        $("#prodPriceAlert").css("display", "block");
        priceV = 1;
        return false;
    }
    else {
        $("#prodPriceAlert").css("display", "none");
        priceV = 0;
        return true;
    }
}

function validateProdDesc(inputValue) {
    var descRegex = /^[a-zA-Z0-9-_,.:; ]{3,100}$/;
    if (descRegex.test(inputValue) == false) {
        $("#prodDescAlert").css("display", "block");
        descV = 1;
        return false;
    }
    else {
        $("#prodDescAlert").css("display", "none");
        descV = 0;
        return true;
    }
}
/**END VALIDATION FUNCTIONS */


/**BUTTON ADD ABLE */
$('#addProdBtn').attr("disabled", true);
$('.updateProdBtn').attr("disabled", true);


function addProdDisable() {
    if (nameV == 0 && categV == 0 && priceV == 0 && descV == 0) {
        $('#addProdBtn').attr("disabled", false);
        $('.updateProdBtn').attr("disabled", false);
    }
    else {
        $('#addProdBtn').attr("disabled", true);
        $('.updateProdBtn').attr("disabled", true);
    }
}
/**END BUTTON ADD ABLE */

/**CLEAR FORM WHEN DONE */
function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
/**END CLEAR FORM WHEN DONE */

/**ADD PRODUCT */
function addProduct() {
    var prodImg = document.getElementById("inputGroupFile04").value;
    slashIndx = prodImg.lastIndexOf("\\");
    prodImg = prodImg.slice(slashIndx + 1);
    var productImage = document.getElementById('productImg').src = 'images/' + prodImg + '';
    var productName = document.getElementById("nameInp").value;
    var productCategory = document.getElementById("categoryInp").value;
    var productPrice = document.getElementById("priceInp").value;
    var productDesc = document.getElementById("descInp").value;
    var productSale = false;

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
    displayProducts();
    clearForm();
    $('#addProdBtn').attr("disabled", true);
    $('.updateProdBtn').attr("disabled", true);
}
/**END ADD PRODUCT */

/**Display PRODUCT */
function displayProducts() {
    var temp = "";

    for (var i = 0; i < productsContainer.length; i++) {

        temp += ` <div class="col-md-3">
            <div class="product mb-4 ">
            <div class="controlProduct "> 
            <img id="productImg" src="`+ productsContainer[i].image + `" alt=" " class="img-fluid">
            <div class="controlLayer d-flex justify-content-center align-items-center">
            <button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger btn-sm">DELETE</button>
            <button onclick="updateProduct(`+ i + `)" class="btn btn-outline-warning btn-sm updateProdBtn">UPDATE</button>
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
    document.getElementById("productsRow").innerHTML = temp;
}
/**END DISPLAY PRODUCT */

/**SEARCH PRODUCT */
function searchProducts(term) {
    //console.log(term);
    var temp = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            temp += ` <div class="col-md-3">
            <div class="product mb-4">
            <div class="controlProduct"> 
            <img id="productImg" src="`+ productsContainer[i].image + `" alt=" " class="img-fluid">
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
/**END SEARCH PRODUCT */

/**DELETE PRODUCT */
function deleteProduct(indx) {
    //console.log(indx);
    var deleted = productsContainer.splice(indx, 1);
    localStorage.setItem("productData", JSON.stringify(productsContainer));
    if (productsContainer.length == 0) {
        var temp = `<img id="productImg" src="/images/" alt=" " class="img-fluid">`;
        document.getElementById("productsRow").innerHTML = temp;
        //console.log(productsContainer.length);
    }
    else {
        displayProducts();
    }
}
/**END DELETE PRODUCT */

/**UPDATE PRODUCT */
function updateProduct(indx) {
    var prodImg = document.getElementById("inputGroupFile04").value;
    slashIndx = prodImg.lastIndexOf("\\");
    prodImg = prodImg.slice(slashIndx + 1);
    var productImage = document.getElementById('productImg').src = 'images/' + prodImg + '';
    var productName = document.getElementById("nameInp").value;
    var productCategory = document.getElementById("categoryInp").value;
    var productPrice = document.getElementById("priceInp").value;
    var productDesc = document.getElementById("descInp").value;
    //var productSale = false;

    productsContainer[indx].image = productImage;
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
    $('#addProdBtn').attr("disabled", true);
    $('.updateProdBtn').attr("disabled", true);
}
/**END UPDATE PRODUCT */


// var prodImg = document.getElementById("inputGroupFile04").value;
//     slashIndx = prodImg.lastIndexOf("\\");
//     prodImg = prodImg.slice(slashIndx+1);
//     console.log(prodImg);
//     console.log(slashIndx);



// var arr = [];
// console.log(arr.length);