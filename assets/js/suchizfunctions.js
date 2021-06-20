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
          To: "animalprotect31@gmail.com",
          From: "suchizgames@gmail.com",
          Subject: `Message de ${name} pour via Contact de animalprotect.fr`,
          Body: `Nom: ${name} <br/> Email: ${email} <br/> Téléphone: ${phone} <br/> Message: ${message}`,
      }).then((message) => alert("Votre mail a bien été envoyé ! On revient vers vous très vite, merci !"));
  }
