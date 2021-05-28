$(document).ready(function () {
    var database = firebase.database();

    //write data
    // database.ref('products/' + 'product_2').set({
    //     name: 'Product one',
    // });

    //read data
    const dbRef = firebase.database().ref();
    dbRef.child("products").child('product_1').get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            $("#data").text(JSON.stringify(snapshot.val().name));
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
});