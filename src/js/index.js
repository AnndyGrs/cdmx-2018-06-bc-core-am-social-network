document.getElementById('session').addEventListener('click', event => {
  location.assign('views/signin.html');
});

document.getElementById('newSession').addEventListener('click', event => {
  location.assign('views/signup.html');
});

document.getElementById('signUp').addEventListener('click', event => {
  let newEmail = document.getElementById('newEmail').value;
  let newPassword = document.getElementById('newPassword').value;
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let dateBorn = document.getElementById('dateBorn').value;

  firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert('Error! Tu correo o contraseña no pueden ser campos vacios.');
    });

  db.collection('users').add({
    first: firstName,
    last: lastName,
    born: dateBorn
  })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function(error) {
      console.log('Error adding document: ', error);
    });
});

document.getElementById('signIn').addEventListener('click', event => {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert('Error! Tu correo o contraseña son incorrectos.');
    });
});

const observer = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('usuario activo');
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      
      location.assign('views/wall.html');
    }
  });
};

observer();