
var alldata = [];
var currentDisplay = 0
var nb_case = 4;

fetch('https://spreadsheets.google.com/feeds/cells/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y/2/public/full?alt=json').then(
    function (response){ return response.json();}
).then(function(obj){
    // console.log(obj.feed.entry[0]);
    // document.getElementById("shopContent").innerHTML = `
  alldata = obj.feed.entry;
  inflate(alldata, currentDisplay);
  inflateSide(alldata, 1, 2);
}).catch(function(error){
    console.log(error);
});

function inflate(array, page){
    var code = `
                <header>
                    <h2 style="font-size: 2.3em;">${alldata[0+(page*nb_case)].content.$t}</h2>
                    <ul class="meta">
                        <li class="icon fa-clock" style="font-size: 1.5em;">${alldata[1+(page*nb_case)].content.$t}</li>
                    </ul>
                </header>

                <section>
                    <span class="image featured"><img src="${"images/actu/"+alldata[3+(page*nb_case)].content.$t}" alt="" /></span>
                    <p style="text-align: justify;">
                        ${alldata[2+(page*nb_case)].content.$t}
                    </p>
                </section>
            `
    document.getElementById("mainActu").innerHTML = code;
}

function inflateSide(array, ind1, ind2){
    var code = `
                <li>
                    <article class="box post-summary">
                        <h3><a style="cursor: pointer;" onclick="actu1Pressed()">${alldata[0+(ind1*nb_case)].content.$t}</a></h3>
                        <ul class="meta" style="margin-bottom: 1em;">
                            <li class="icon fa-clock">${alldata[1+(ind1*nb_case)].content.$t}</li>
                        </ul>
                        ${alldata[2+(ind1*nb_case)].content.$t}
                    </article>
                </li>
                <li>
                    <article class="box post-summary">
                        <h3><a style="cursor: pointer;" onclick="actu2Pressed()">${alldata[0+(ind2*nb_case)].content.$t}</a></h3>
                        <ul class="meta" style="margin-bottom: 1em;">
                            <li class="icon fa-clock">${alldata[1+(ind2*nb_case)].content.$t}</li>   
                        </ul>
                        ${alldata[2+(ind2*nb_case)].content.$t} 
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
