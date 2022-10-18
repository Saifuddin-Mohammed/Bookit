let db, myPost;

document.addEventListener("DOMContentLoaded", event =>{
    const app = firebase.app();

    db = firebase.firestore();

    myPost = db.collection('posts').doc('firstpost');
});

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result =>{
        const user = result.user;
        document.write(`Hello ${user.displayName}`);
        console.log(user)
        myPost.get()
        .then(doc =>{
            const data = doc.data();
            document.write (data.text)
        })
    })
    .catch(console.log)
}
