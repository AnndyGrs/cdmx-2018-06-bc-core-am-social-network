let config = {
  apiKey: 'AIzaSyBsJ8bn2J3oB76AixEu5ccgBLM8iAS1CSo',
  authDomain: 'post-d2d31.firebaseapp.com',
  databaseURL: 'https://post-d2d31.firebaseio.com',
  projectId: 'post-d2d31',
  storageBucket: 'post-d2d31.appspot.com',
  messagingSenderId: '101569059769'
};
firebase.initializeApp(config);

document.getElementById('toPost').addEventListener('click', event => {
  let post = document.getElementById('message').value;

  firebase.database().ref('comments').push({
    message: post
  });
});

firebase.database().ref('comments').on('value', snapshot => {
  let wall = '';
  snapshot.forEach(words => {
    let element = words.val();
    let message = element.message;
    wall += message + '<br>';
  });
  finalWall.innerHTML = wall;
});