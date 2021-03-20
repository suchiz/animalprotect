var introductionIsDisplayed = 1;
var projectIsDisplayed = 1;
var bscUpsIsDisplayed = 1;
var ppkeIsDisplayed = 1;
var mscUpsIsDisplayed = 1;

var imgIntro = document.getElementById('imgIntro');
var imgProject = document.getElementById('imgProject');
var imgBscups = document.getElementById('imgBscups');
var imgMscppke = document.getElementById('imgMscppke');
var imgMscups = document.getElementById('imgMscups');

function show_hide_introduction(){
    if (introductionIsDisplayed == 1){
        document.getElementById("introductionDiv").style.display="inline";
        document.getElementById("introImgToHide").style.display="none";
        document.getElementById("introTextToHide").style.display="none";
        introductionIsDisplayed = 0;
        imgIntro.src = "images/dropdown_button_small_reverse.png"
    } else {
        document.getElementById("introductionDiv").style.display="none";
        document.getElementById("introImgToHide").style.display="inline";
        document.getElementById("introTextToHide").style.display="inline";
        introductionIsDisplayed = 1;
        imgIntro.src = "images/dropdown_button_small.png"
    }
}

function show_hide_project(){
    if (projectIsDisplayed == 1){
        document.getElementById("projectDiv").style.display="inline";
        projectIsDisplayed = 0;
        imgProject.src = "images/dropdown_button_reverse.png"
    } else {
        document.getElementById("projectDiv").style.display="none";
        projectIsDisplayed = 1;
        imgProject.src = "images/dropdown_button.png"
    }
}

function show_hide_bscups(){
    if (bscUpsIsDisplayed == 1){
        document.getElementById("bscupsDiv").style.display="inline";
        bscUpsIsDisplayed = 0;
        imgBscups.src = "images/dropdown_button_small_reverse.png"
    } else {
        document.getElementById("bscupsDiv").style.display="none";
        bscUpsIsDisplayed = 1;
        imgBscups.src = "images/dropdown_button_small.png"
    }
}

function show_hide_mscppke(){
    if (ppkeIsDisplayed == 1){
        imgMscppke.src = "images/dropdown_button_small_reverse.png"
        document.getElementById("mscppkeDiv").style.display="inline";
        ppkeIsDisplayed = 0;
    } else {
        document.getElementById("mscppkeDiv").style.display="none";
        ppkeIsDisplayed = 1;
        imgMscppke.src = "images/dropdown_button_small.png"
    }
}

function show_hide_mscups(){
    if (mscUpsIsDisplayed == 1){
        imgMscups.src = "images/dropdown_button_small_reverse.png"
        document.getElementById("mscupsDiv").style.display="inline";
        mscUpsIsDisplayed = 0;
    } else {
        document.getElementById("mscupsDiv").style.display="none";
        mscUpsIsDisplayed = 1;
        imgMscups.src = "images/dropdown_button_small.png"
    }
}


var statsTool = 1;
var toolsImg = document.getElementById('toolsImg');

function show_hide_toolsMore(){
    if (statsTool == 1){
        toolsImg.src = "images/dropdown_stats_reverse.png"
        document.getElementById("toolsMore").style.display="inline";
        statsTool = 0;
    } else {
        document.getElementById("toolsMore").style.display="none";
        statsTool = 1;
        toolsImg.src = "images/dropdown_stats.png"
    }
}

var images = document.querySelector('.image');

images.addEventListener('mouseover', changeDefOver);
images.addEventListener('mouseout', changeDefOut);

function changeDefOver(e) {
  e.target.classList.toggle('opacity-toggle');
}

function changeDefOut(e) {
  e.target.classList.toggle('opacity-toggle');
}

document.getElementById("contact-form").addEventListener("submit", submitForm);

function submitForm() {

    let name = document.getElementById("form-name").value;
    let email = document.getElementById("form-email").value;
    let message = document.getElementById("form-message").value;


    // document.querySelector("contact-form").reset();
    sendEmail(name, email, message);
    document.getElementById("contact-form").reset();
  }

  function sendEmail(name, email, message){
      Email.send({
          Host: "smtp.gmail.com",
          Username: 'suchizgames@gmail.com',
          Password: "gjwhxavkhmjzmcnu",/*"gjwhxavkhmjzmcnu"*/
          To: "suchizgames@gmail.com",
          From: "suchizgames@gmail.com",
          Subject: `${name} sent you a message`,
          Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`,
      }).then((message) => alert("Mail is sent successfully :). Thank you !"));

  }