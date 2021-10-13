fetch('https://sheets.googleapis.com/v4/spreadsheets/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y?includeGridData=true&key=AIzaSyAUZhEwzn7-ISGUiaHSRYvO_g0Hy5a44i4').then(
    function (response){ return response.json();}
).then(function(obj){
  inflate2(obj.sheets[2].data[0].rowData);
}).catch(function(error){
    console.log(error);
});

function inflate2(array){
    var code = "";
    array.forEach((item, index) => {
            var color;
            if (item.values[4].formattedValue == "bleu")
                color = "team_member";
            else if (item.values[4].formattedValue == "vert")
                color = "team_member alt";
            else
                color = "team_member alt2";

            code += `
                <div class="${color}">
                    <div class="team_img">
                        <img src="images/staff/${item.values[3].formattedValue}" alt="Team_image">
                    </div>
                    <h3>${item.values[0].formattedValue}</h3>
                    <p class="role">${item.values[1].formattedValue}</p>
                    <p>${item.values[2].formattedValue}</p>
                </div>
            `
    });
   
    document.getElementById("staffMembers").innerHTML = code;
}