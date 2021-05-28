$(document).ready(function () {


    //Register new user
    $("button#register-user").click(function (e) {
        e.preventDefault();
        var first_name = $("input#FirstName").val();
        var last_name = $("input#LastName").val();
        var email = $("input#Email").val();
        var password = $("input#Passowrd").val();

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {

                var user = firebase.auth().currentUser;

                user.updateProfile({
                  displayName: first_name+" "+last_name
                }).then(function() {
                  // Update successful.
                }).catch(function(error) {
                  // An error happened.
                });


                // Signed in 
                var user = userCredential.user;
                alert("Creadte!");
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
                alert(errorMessage);
            });


    });

    //login user
    $("button#login-user").click(function (e) {
        e.preventDefault();
        var email = $("#Email").val();
        var password = $("#Password").val();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                alert("User logged in!");
                window.location = "./app.html"
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);

            });

    });


    //on auth changes
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            $("h4.text-dark.mb-4").text("Welcome, "+user.displayName);
            $(".fullName").text(user.displayName)
            $(".user").hide();
            $("#logout-user").show();
            var page = location.pathname.split('/').slice(-1)[0];
            if(page == "app.html") {

            } else {
                window.location = "./app.html"
            }

            // ...
        } else {
            // User is signed out
            // ...
        }
    });

    //logout user
    $("#logout-user").click(function (e) {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            alert("Sign-out successful.")
            window.location = "./login.html"
        }).catch((error) => {
            // An error happened.
            alert(error);
        });
    });

});