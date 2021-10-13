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

fetch('https://sheets.googleapis.com/v4/spreadsheets/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y?includeGridData=true&key=AIzaSyAUZhEwzn7-ISGUiaHSRYvO_g0Hy5a44i4').then(
    function (response){ return response.json();}
).then(function(obj){
    alldata = obj.sheets[0].data[0].rowData;
    inflate(alldata, 1);
    productTitle.innerHTML = `TOUS NOS PRODUITS <span style="font-size: 0.8em">(${alldata.length}  produits)</span> `;
    initCategories(obj.sheets[3].data[0].rowData);

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
            categoriesChecked[ind] = []
            categoriesChecked[ind].push(upName)
        }
    });
    console.log(categoriesTable)
    console.log(categoriesChecked)
    displayCategories()
}

function removeCategory(name){
    categoriesTable.forEach((array, ind) => {
        if (array.includes(name)){
            categoriesChecked[ind] = []
        }
    });
    displayCategories()
}

function buildCategory(currentCategory){
    var content = "";
    var code = "";
    var title = currentCategory[0]
    currentCategory.forEach((item, index) => { 
            if (index == 0)
                content += `
                <div>
                    <input type="radio" id="${title + "tous"}" onclick="removeCategory('${item}')" name="${title}" checked>
                    <label style="cursor: pointer;" for="${title + "tous"}">Tous</label>
                </div>	
        `
        else 
        content += `
            <div>
                <input type="radio" id="${item}" onclick="addCategory(${item})" name="${title}">
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
    categories.forEach((cat, index) => {
    
        cat.values.forEach(item => {
            if (item.formattedValue != "END"){
                currentCategory.push(item.formattedValue)
            } else {
                code += buildCategory(currentCategory)
                categoriesTable.push(currentCategory)
                currentCategory = [];
            }
        });
    });
    for (var i=0; i < categoriesTable.length; i++)
        categoriesChecked.push([]) ;
    document.getElementById("categoriesMenu").innerHTML = code;
}


function displayCategories(){
    var filteredArray = [];
    alldata.forEach((item, index) => {
        var currentItemString = []
        for (var i=0; i < item.values.length; ++i){
            currentItemString.push(item.values[i].formattedValue);
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
            filteredArray.push(item)           
    });
    productTitle.innerHTML = `Recherche personalisée <span style="font-size: 0.8em">(${filteredArray.length}  produits)</span> `;
    inflate(filteredArray, 1);
}


function inflate(array, page){
    var code = "";
    shopdata = array;
    if (array.length > 20){
        displayed_data = array.slice((page-1)*20,page*20);
        if (current_page < max_page)
            nextButton.disabled = false;
        if (max_page == -1)
            max_page = Math.ceil(array.length/20);
    }  
    else {
        displayed_data = array;
        nextButton.disabled = true;
    }
    displayed_data.forEach((item, index) => {
            var img = "images/produits/"+item.values[6].formattedValue
            var title = item.values[0].formattedValue
            var brand = item.values[1].formattedValue
            var price = item.values[2].formattedValue+"€"
            var description = item.values[5].formattedValue
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
    });
    document.getElementById("shopContent").innerHTML = code;
}

prevButton.disabled = true;

function onItemClick (index){
    var img = "images/produits/"+displayed_data[index].values[6].formattedValue
    var title = displayed_data[index].values[0].formattedValue
    var brand = displayed_data[index].values[1].formattedValue
    var price = displayed_data[index].values[2].formattedValue+"€"
    var longDescription = displayed_data[index].values[7].formattedValue
    productTitle.innerHTML = `${title}`;
    var code = `
    <article class="box page-content">
    <section class="productDetails">
    <span style="flex: 50%">
        <img  style="max-width: 300px"  src="${img}" alt="" />
    </span>
    <div style="flex: 50%; display: inline;">
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
    productTitle.innerHTML = `TOUS NOS PRODUITS <span style="font-size: 0.8em">(${alldata.length}  produits)</span> `
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