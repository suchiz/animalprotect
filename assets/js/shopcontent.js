var shopdata = [];
fetch('https://spreadsheets.google.com/feeds/cells/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y/1/public/full?alt=json').then(
    function (response){ return response.json();}
).then(function(obj){
    // console.log(obj.feed.entry[0]);
    // document.getElementById("shopContent").innerHTML = `
  inflate(obj.feed.entry)

}).catch(function(error){
    console.log(error);
});

function inflate(array){
    var code ="";
    array.forEach((item, index) => {
        if(index%6 == 0){
            code += `
            <div class="col-3 col-6-medium col-12-small">
                    <section class="box feature">
                        <a href="#" class="image featured"><img src="${"images/"+array[index+5].content.$t}" alt="" /></a>
                        <h3>${array[index].content.$t}</h3>
                        <h4>${array[index+1].content.$t}</h4>
                        <h5>${array[index+2].content.$t+"€"}</h5>
                        <p>
                            ${array[index+4].content.$t} 
                        </p>
                    </section>
                </div>
            `
        }
    });

    document.getElementById("shopContent").innerHTML = code;
   

}