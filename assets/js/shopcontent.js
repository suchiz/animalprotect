
var alldata = [];
var shopdata = [];
var displayed_data = [];
var current_page = 1;
var max_page;
var prevButton = document.getElementById("prevButton");
var nextButton = document.getElementById("nextButton");
var productTitle = document.getElementById("productTitle");



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
        productTitle.innerHTML = `TOUS NOS PRODUITS <span style="font-size: 0.8em">(${alldata.length/6}  produits)</span> `;
    }


}).catch(function(error){
    console.log(error);
});

function displayCategory(category){
    filteredArray = [];
    
    alldata.forEach((item, index) => {
        if(index%6 == 0){
           
            if(alldata[index+3].content.$t == category){
                for(var i = 0; i < 6; i++){
                    filteredArray.push(alldata[index+i]);
                }
            }
        }
    });
    productTitle.innerHTML = `${category} <span style="font-size: 0.8em">(${filteredArray.length/6}  produits)</span> `;
    inflate(filteredArray, 1);
}

function inflate(array, page){
    var code = "";
    shopdata = array;
    if (array.length/6 > 20){
        displayed_data = array.slice((page-1)*20*6,page*20*6);
        nextButton.disabled = false;
        max_page = Math.ceil((array.length/6)/20);
    }  
    else {
        displayed_data = array;
        nextButton.disabled = true;
    }
    displayed_data.forEach((item, index) => {
        if(index%6 == 0){
            code += `
            <div class="col-3 col-6-medium col-12-small">
                    <section class="box feature">
                        <a href="${"images/produits/"+displayed_data[index+5].content.$t}" class="image featured">
                        <img src="${"images/produits/"+displayed_data[index+5].content.$t}" alt="" /></a>
                        <h3>${displayed_data[index].content.$t}</h3>
                        <h4>${displayed_data[index+1].content.$t}</h4>
                        <h5>${displayed_data[index+2].content.$t+"€"}</h5>
                        <p>
                            ${displayed_data[index+4].content.$t} 
                        </p>
                    </section>
                </div>
            `
        }
    });
   
    document.getElementById("shopContent").innerHTML = code;
}

prevButton.disabled = true;

function nextPressed(){
    current_page += 1;
    prevButton.disabled = false;
    inflate(shopdata, current_page);
    if(current_page == max_page)
        nextButton.disabled = true;
}

function prevPressed(){
    current_page -= 1;
    nextButton.disabled = false;
    if(current_page == 1)
        prevButton.disabled = true;
    inflate(shopdata, current_page);
}