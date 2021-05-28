$(document).ready(function () {
    // Initialize Cloud Firestore
    var storage = firebase.storage();
    var storageRef = storage.ref();

    $('input#file').change(function () {
        var url = window.URL.createObjectURL(this.files[0]);
        $('#file-preview').attr('src', url);
    });

    //upload new file
    $("#file-upload").click(function (e) {
        e.preventDefault();
        var file = $("input#file")[0].files[0];
        var uploadTask = storageRef.child('images/' + file.name).put(file);
        uploadTask.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress).text(Math.round(progress) + '%');

                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log("File URL: "+downloadURL);
                    window.location = "./app.html";
                });
            }
        );
    });

    //list all files
    var listRef = storageRef.child('images');
    // Find all the prefixes and items.
    listRef.listAll().then(function (result) {
        if (result.items.length == 0) {
            $('#files-list').append("<h4 class='no-files'>No files to view</h4>")
        } else {
            $(".no-files").empty();
            result.items.forEach(function (imageRef) {
                // And finally display them
                console.log(imageRef);

                displayImage(imageRef)
            });
        }

    }).catch(function (error) {
        // Handle any errors
    });

    function displayImage(imageRef) {
        imageRef.getDownloadURL().then(function (url) {
            // TODO: Display the image on the UI
            $('#files-list').prepend('<div class="col-md-3 card ml-md-3 mb-3" style="padding: 0px;"><img class="card-img-top" src="' + url + '" alt="Card image cap"><div class="card-body"><h5 class="card-title">' + imageRef.name + '</h5><a href="#" class="btn btn-danger" fullPath="' + imageRef.fullPath + '" id="file-delete">Delete</a></div></div>');
        }).catch(function (error) {
            // Handle any errors
        });
    }


    //delete file
    $('body').on('click', '#file-delete', function () {
        var fullPath = $(this).attr("fullPath");
        // Create a reference to the file to delete
        var desertRef = storageRef.child(fullPath);

        // Delete the file
        desertRef.delete().then(() => {
            alert("File deleted successfully");
            window.location = "./app.html";
        }).catch((error) => {
            // Uh-oh, an error occurred!
            alert(error);
        });
    });


});