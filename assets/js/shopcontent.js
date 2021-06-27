var alldata = [];
var shopdata = [];
var displayed_data = [];
var current_page = 1;
var itemDisplayed = 1
var max_page = -1
var prevButton = document.getElementById("prevButton");
var nextButton = document.getElementById("nextButton");
var productTitle = document.getElementById("productTitle");

var categoriesChecked = []
var categoriesTable = []

fetch('https://spreadsheets.google.com/feeds/cells/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y/1/public/full?alt=json').then(
    function (response){ return response.json();}
).then(function(obj){
    alldata = obj.feed.entry;
        inflate(alldata, 1);
        productTitle.innerHTML = `TOUS NOS PRODUITS <span style="font-size: 0.8em">(${Math.ceil(alldata.length/colNumber)}  produits)</span> `;
}).catch(function(error){
    console.log(error);
});

fetch('https://spreadsheets.google.com/feeds/cells/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y/4/public/full?alt=json').then(
    function (response){ return response.json();}
).then(function(obj){
    initCategories(obj.feed.entry);

}).catch(function(error){
    console.log(error);
});


function arrayRemove(array, value) { 
    const index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
 
}

function addCategory(name){
    var upName = name.id.toUpperCase()
    categoriesTable.forEach((array, ind) => {
        if (array.includes(name.id)){
            if (categoriesChecked[ind].includes(upName))
                arrayRemove(categoriesChecked[ind], upName)
            else
                categoriesChecked[ind].push(upName)
        }
    });
        
    displayCategories()
}

function buildCategory(currentCategory){
    var content = "";
    var code = "";
    var title = currentCategory[0]
    currentCategory.forEach((item, index) => { 
        if (index != 0)
            content += `
                <div>
                    <input type="checkbox" id="${item}"  onclick="addCategory(${item})">
                    <label style="cursor: pointer;" for="${item}">${item}</label>
                </div>	
            `
    });

    code += `
    <li>
        <article class="box post-summary">
            <h3><a>${title}</a></h3>
            ${content}
        </article>
    </li>
    `
    return code
}

function initCategories(categories){
    var code = "";
    var currentCategory = []
    categories.forEach((item, index) => {
        
        if (item.content.$t != "END"){
            currentCategory.push(item.content.$t)
        } else {
            code += buildCategory(currentCategory)
            categoriesTable.push(currentCategory)
            currentCategory = [];
        }
    });
    for (var i=0; i < categoriesTable.length; i++)
        categoriesChecked.push([]) ;
    document.getElementById("categoriesMenu").innerHTML = code;
}


function displayCategories(){
    var filteredArray = [];
    alldata.forEach((item, index) => {
        if(index%colNumber == 0){
            var currentItem = []
            var currentItemString = []
            for (var i=0; i < colNumber; ++i){
                currentItemString.push(alldata[index+i].content.$t);
                currentItem.push(alldata[index+i]);
            }
            var allGood = true
            categoriesChecked.forEach((array, _) => {
                for (var j=0; j < array.length; j++){

                    if (currentItemString.includes(array[j])){
                        break;
                    } else {
                        allGood = false
                        break;
                    }
                }
            });    
            if (allGood)
                filteredArray.push(currentItem)           
        }
    });
    filteredArray = filteredArray.flat()
    productTitle.innerHTML = `Recherche personalisée <span style="font-size: 0.8em">(${Math.ceil(filteredArray.length/colNumber)}  produits)</span> `;
    inflate(filteredArray, 1);
}

var colNumber = 8

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
            var img = "images/produits/"+displayed_data[index+6].content.$t
            var title = displayed_data[index].content.$t
            var brand = displayed_data[index+1].content.$t
            var price = displayed_data[index+2].content.$t+"€"
            var description = displayed_data[index+5].content.$t
            code += `
            <div class="col-3 col-6-medium col-12-small">
                    <section class="box feature" style="cursor: pointer" onclick="onItemClick(${index})">
                        <img class="image featured" src="${img}" alt=""/>
                        <h3>${title}</h3>
                        <h4>${brand}</h4>
                        <h5>${price}</h5>
                        <p class="elipsedText">
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
    var img = "images/produits/"+displayed_data[index+6].content.$t
    var title = displayed_data[index].content.$t
    var brand = displayed_data[index+1].content.$t
    var price = displayed_data[index+2].content.$t+"€"
    var longDescription = displayed_data[index+7].content.$t
    productTitle.innerHTML = `${title}`;
    var code = `
    <article class="box page-content">
    <section class="productDetails">
    <span style="flex: 50%">
        <img  style="max-width: 300px"  src="${img}" alt="" />
    </span>
    <div style="flex: 0%; display: inline;">
        <header style="margin: 0em; padding: 0em">
        <h2 style="font-size: 2.3em; margin-bottom: 0">${brand}</h2> 
        <p >${price}</p>
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
    if ($(window).width() < 736)
        $('html, body').animate({ scrollTop: 0 }, 'medium');
    else
        $('html, body').animate({ scrollTop: 400 }, 'medium');
    
}

function backPressed(){
    inflate(shopdata, current_page);
    document.getElementById("actionButtons").style.display="block";
    if ($(window).width() < 736)
    $('html, body').animate({ scrollTop: 0 }, 'medium');
else
    $('html, body').animate({ scrollTop: 400 }, 'medium');
    productTitle.innerHTML = `TOUS NOS PRODUITS <span style="font-size: 0.8em">(${Math.ceil(alldata.length/colNumber)}  produits)</span> `
}

function nextPressed(){
    current_page += 1;
    prevButton.disabled = false;
    if(current_page == max_page)
        nextButton.disabled = true;
    inflate(shopdata, current_page);
    if ($(window).width() < 736)
    $('html, body').animate({ scrollTop: 0 }, 'medium');
else
    $('html, body').animate({ scrollTop: 400 }, 'medium');
}

function prevPressed(){
    current_page -= 1;
    nextButton.disabled = false;
    if(current_page == 1)
        prevButton.disabled = true;
    inflate(shopdata, current_page);
    if ($(window).width() < 736)
    $('html, body').animate({ scrollTop: 0 }, 'medium');
    else
    $('html, body').animate({ scrollTop: 400 }, 'medium');
}