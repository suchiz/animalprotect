var alldata = [];
var shopdata = [];
var displayed_data = [];
var current_page = 1;
var itemDisplayed = 1
var max_page = -1
var prevButton = document.getElementById("prevButton");
var nextButton = document.getElementById("nextButton");
var productTitle = document.getElementById("productTitle");

var category = []
var brand = []
var animal = []

fetch('https://spreadsheets.google.com/feeds/cells/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y/1/public/full?alt=json').then(
    function (response){ return response.json();}
).then(function(obj){
    // console.log(obj.feed.entry[0]);
    // document.getElementById("shopContent").innerHTML = `
    alldata = obj.feed.entry;
    if (window.location.hash === '#CHIEN') {displayCategory('CHIEN')}
    else if (window.location.hash === '#CHAT') {displayCategory('CHAT')}
    else if (window.location.hash === '#RONGEUR') {displayCategory('RONGEUR')}
    else if (window.location.hash === '#RAFRAICHISSANT') {displayCategory('RAFRAICHISSANT')}
    else if (window.location.hash === '#HYGIENE') {displayCategory('HYGIENE')}
    else if (window.location.hash === '#VOITURE') {displayCategory('VOITURE')}
    else if (window.location.hash === '#EDUCATION') {displayCategory('EDUCATION')}
    else if (window.location.hash === '#MANTEAU') {displayCategory('MANTEAU')}
    else if (window.location.hash === '#PULL') {displayCategory('PULL')}
    else if (window.location.hash === '#CANICROSS') {displayCategory('CANICROSS')}
    else if (window.location.hash === '#AQUATIQUE') {displayCategory('AQUATIQUE')}
    else{
        inflate(alldata, 1);
        productTitle.innerHTML = `TOUS NOS PRODUITS <span style="font-size: 0.8em">(${Math.ceil(alldata.length/colNumber)}  produits)</span> `;
    }


}).catch(function(error){
    console.log(error);
});

function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function addCategory(name){
    if (category.includes(name))
        arrayRemove(category, name)
    else
        category.push(name)
}

function addBrand(name){
    if (brand.includes(name))
        arrayRemove(brand, name)
    else
        brand.push(name)
}

function addAnimal(name){
    if (animal.includes(name))
        arrayRemove(animal, name)
    else
        animal.push(name)
}

function initCategories(){
    
}

function displayFilter(){
    alldata.forEach((item, index) => {
        if(index%colNumber == 0){
           
            if(category.includes(alldata[index+3].content.$t) && 
            brand.includes(alldata[index+3].content.$t) && 
            category.includes(alldata[index+3].content.$t)){
                for(var i = 0; i < colNumber; i++){
                    filteredArray.push(alldata[index+i]);
                }
            }
        }
    });
    productTitle.innerHTML = `${category} <span style="font-size: 0.8em">(${Math.ceil(filteredArray.length/colNumber)}  produits)</span> `;
    inflate(filteredArray, 1);
}

function displayCategory(category){
    filteredArray = [];
    alldata.forEach((item, index) => {
        if(index%colNumber == 0){
            if(alldata[index+3].content.$t == category){
                for(var i = 0; i < colNumber; i++){
                    filteredArray.push(alldata[index+i]);
                }
            }
        }
    });
    productTitle.innerHTML = `${category} <span style="font-size: 0.8em">(${Math.ceil(filteredArray.length/colNumber)}  produits)</span> `;
    inflate(filteredArray, 1);
}

var colNumber = 7

function inflate(array, page){
    var code = "";
    shopdata = array;
    if (array.length/colNumber > 20){
        displayed_data = array.slice((page-1)*20*colNumber,page*20*colNumber);
        if (current_page < max_page)
            nextButton.disabled = false;
        if (max_page == -1)
            max_page = Math.ceil((array.length/colNumber)/20);
    }  
    else {
        displayed_data = array;
        nextButton.disabled = true;
    }
    displayed_data.forEach((item, index) => {
        if(index%colNumber == 0){
            
            var img = "images/produits/"+displayed_data[index+5].content.$t
            var title = displayed_data[index].content.$t
            var brand = displayed_data[index+1].content.$t
            var price = displayed_data[index+2].content.$t+"€"
            var description = displayed_data[index+4].content.$t
            console.log(index + "  :  " + img)
            code += `
            <div class="col-3 col-6-medium col-12-small">
                    <section class="box feature">
                        <img class="image featured" src="${img}" alt=""
                        onclick="onItemClick(${index})"
                        />
                        <h3>${title}</h3>
                        <h4>${brand}</h4>
                        <h5>${price}</h5>
                        <p>
                            ${description} 
                        </p>
                    </section>
                </div>
            `


        }
    });
    document.getElementById("shopContent").innerHTML = code;
}

prevButton.disabled = true;


function onItemClick (index){
    var img = "images/produits/"+displayed_data[index+5].content.$t
    var title = displayed_data[index].content.$t
    var brand = displayed_data[index+1].content.$t
    var price = displayed_data[index+2].content.$t+"€"
    var longDescription = displayed_data[index+6].content.$t
    productTitle.innerHTML = `${title}`;
    var code = `
    <article class="box page-content">
    <section style="display: flex; margin:0 0 2em 0;">
    <span style="flex: 50%">
        <img  style="max-width: 300px"  src="${img}" alt="" />
    </span>
    <div style="flex: 50%">
    <header >
    <h2 style="font-size: 2.3em;">${brand}</h2> 
    <p>${price}</p>
    </header>
    <p style="text-align: justify;">
        ${longDescription}
    </p>
    </div>

    </section>
    <ul class="actions" >
        <li><button onclick="backPressed()" class="button">Retour</button></li>
    </ul>
    </article>
    ` 

    document.getElementById("actionButtons").style.display="none";
    document.getElementById("shopContent").innerHTML = code;
    $('html, body').animate({ scrollTop: 400 }, 'medium');
    
}

function backPressed(){
    inflate(shopdata, current_page);
    document.getElementById("actionButtons").style.display="block";
    $('html, body').animate({ scrollTop: 400 }, 'medium');
}

function nextPressed(){
    current_page += 1;
    prevButton.disabled = false;
    if(current_page == max_page)
        nextButton.disabled = true;
    inflate(shopdata, current_page);
    $('html, body').animate({ scrollTop: 400 }, 'medium');
}

function prevPressed(){
    current_page -= 1;
    nextButton.disabled = false;
    if(current_page == 1)
        prevButton.disabled = true;
    inflate(shopdata, current_page);
    $('html, body').animate({ scrollTop: 400 }, 'medium');
}