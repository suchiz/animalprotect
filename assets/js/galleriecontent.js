fetch('https://spreadsheets.google.com/feeds/cells/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y/5/public/full?alt=json').then(
    function (response){ return response.json();}
).then(function(obj){
    // console.log(obj.feed.entry[0]);
    // document.getElementById("shopContent").innerHTML = `
  alldata = obj.feed.entry;
  inflate(obj.feed.entry);

}).catch(function(error){
    console.log(error);
});


function inflate(array){
    var code = "";
    array.forEach((item, index) => {
        var path = "images/gallerie/" + item.content.$t
            code += `
            <div class="col-3 col-12-mobile"><a  href="${path}" class="image fit">
            <img 
            src="${path}" alt="" title="" /></a></div>
            `
        
    });
   
    document.getElementById("gallery").innerHTML = code;
}