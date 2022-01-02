
var alldata = [];
var currentDisplay = 0
var nb_case = 4;

fetch('https://sheets.googleapis.com/v4/spreadsheets/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y?includeGridData=true&key=AIzaSyAUZhEwzn7-ISGUiaHSRYvO_g0Hy5a44i4').then(
    function (response){ return response.json();}
).then(function(obj){
  alldata = obj.sheets[1].data[0].rowData;
  inflate(alldata, currentDisplay);
  inflateSide(alldata, 1, 2);
}).catch(function(error){
    console.log(error);
});

function inflate(array, page){
    var code = `
                <header>
                    <h2 style="font-size: 2.3em;">${alldata[page].values[0].formattedValue}</h2>
                    <ul class="meta">
                        <li class="icon fa-clock" style="font-size: 1.5em;">${alldata[page].values[1].formattedValue}</li>
                    </ul>
                </header>

                <section>
                    <span class="image featured"><img src="${"images/actu/"+alldata[page].values[3].formattedValue}" alt="" /></span>
                    <p style="text-align: justify;">
                        ${alldata[page].values[2].formattedValue}
                    </p>
                </section>
            `
    document.getElementById("mainActu").innerHTML = code;
}

function inflateSide(array, ind1, ind2){
    var code = `
                <li>
                    <article class="box post-summary">
                        <h3><a style="cursor: pointer;" onclick="actu1Pressed()">${alldata[ind1].values[0].formattedValue}</a></h3>
                        <ul class="meta" style="margin-bottom: 1em;">
                            <li class="icon fa-clock">${alldata[ind1].values[1].formattedValue}</li>
                        </ul>
                        <p class="side">
                            ${alldata[ind1].values[2].formattedValue}
                        </p>
                    </article>
                </li>
                <li>
                    <article class="box post-summary">
                        <h3><a style="cursor: pointer;" onclick="actu2Pressed()">${alldata[ind2].values[0].formattedValue}</a></h3>
                        <ul class="meta" style="margin-bottom: 1em;">
                            <li class="icon fa-clock">${alldata[ind2].values[1].formattedValue}</li>   
                        </ul>
                        <p class="side">
                            ${alldata[ind2].values[2].formattedValue}
                        </p>
                    </article>
                </li>
            `
    document.getElementById("sideActus").innerHTML = code;
}

function actu1Pressed(){
    switch (currentDisplay){
        case 0: currentDisplay = 1; inflateSide(alldata, 0, 2); break;
        case 1: currentDisplay = 0; inflateSide(alldata, 1, 2); break;
        case 2: currentDisplay = 0; inflateSide(alldata, 1, 2); break;
    }
    
    inflate(alldata, currentDisplay);
}
function actu2Pressed(){
    switch (currentDisplay){
        case 0: currentDisplay = 2; inflateSide(alldata, 0, 1); break;
        case 1: currentDisplay = 2; inflateSide(alldata, 0, 1); break;
        case 2: currentDisplay = 1; inflateSide(alldata, 0, 2); break;
    }
    inflate(alldata, currentDisplay);
}


