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

var shopdata = $.get('https://spreadsheets.google.com/feeds/cells/1yKszxtG9r5PM_YPjRIHP4WpwBaEr6KYo24-LdIs7T3Y/1/public/full?alt=json');

document.getElementById("shopContent").innerHTML = `
  ${shopdata.map(inflate).join('')}
`

function inflate(item){
    return `
    <div class="col-3 col-6-medium col-12-small">
            <section class="box feature">
                <a href="#" class="image featured"><img src="images/pic01.jpg" alt="" /></a>
                <h3><a href="#">A Subheading</a></h3>
                <p>
                    Phasellus quam 
                </p>
            </section>
        </div>
    `
}