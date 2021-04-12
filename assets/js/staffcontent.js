fetch('https://spreadsheets.google.com/feeds/cells/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y/3/public/full?alt=json').then(
    function (response){ return response.json();}
).then(function(obj){
  inflate2(obj.feed.entry);
}).catch(function(error){
    console.log(error);
});

function inflate2(array){
    var code = "";
    array.forEach((item, index) => {
        if(index%5 == 0){
            var color;
            if (array[index+4].content.$t == "bleu")
                color = "team_member";
            else if (array[index+4].content.$t == "vert")
                color = "team_member alt";
            else
                color = "team_member alt2";

            code += `
                <div class="${color}">
                    <div class="team_img">
                        <img src="images/staff/${array[index+3].content.$t}" alt="Team_image">
                    </div>
                    <h3>${array[index].content.$t}</h3>
                    <p class="role">${array[index+1].content.$t}</p>
                    <p>${array[index+2].content.$t}</p>
                </div>
            `
        }
    });
   
    document.getElementById("staffMembers").innerHTML = code;
}