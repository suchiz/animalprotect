fetch('https://sheets.googleapis.com/v4/spreadsheets/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y?includeGridData=true&key=AIzaSyAUZhEwzn7-ISGUiaHSRYvO_g0Hy5a44i4').then(
    function (response){ return response.json();}
).then(function(obj){
  alldata = obj.sheets[4].data[0].rowData;
  inflate(alldata);

}).catch(function(error){
    console.log(error);
});


function inflate(array){
    var code = "";
    array.forEach((item, index) => {
        var path = "images/gallerie/" + item.values[0].formattedValue
            code += `
            <div class="col-3 col-12-mobile"><a  href="${path}" class="image fit">
            <img 
            src="${path}" alt="" title="" /></a></div>
            `
        
    });
   
    document.getElementById("gallery").innerHTML = code;
}