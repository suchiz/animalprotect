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