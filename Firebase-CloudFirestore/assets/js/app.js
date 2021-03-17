$(document).ready(function () {
    // Initialize Cloud Firestore
    var db = firebase.firestore();

    //add new task to database
    $("#add-task").click(function (e) { 
        e.preventDefault();
        var task_content = $("input#task-content").val();
        // Add a new document with a generated id.
        db.collection("tasks").add({
            task: task_content
        })
        .then((docRef) => {
            $('#table-tasks').empty(); //remove table content before re-append tasks
            getAllTasks();
            console.log("Document written with ID: ", docRef.id);
            alert("Task successfully added!");
        })
        .catch((error) => {
            alert("Error adding task");
            console.error("Error adding document: ", error);
        });
    });
    
    //delete task from database
    $('body').on('click', '#remove-task', function () {
        var task_id = $(this).attr("task-id");
        db.collection("tasks").doc(task_id).delete().then(() => {
            $('#table-tasks').empty(); //remove table content before re-append tasks
            getAllTasks();
            alert("Task successfully deleted!")
            console.log("Document successfully deleted!");
        }).catch((error) => {
            alert("Error removing task!")
            console.error("Error removing document: ", error);
        });
    });


    //Read all tasks from firestore
    function getAllTasks() {
        db.collection("tasks").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                if (querySnapshot) {
                    var data = doc.data();
                    var task = data.task;
                    var task_id = doc.id;
                    $("#table-tasks").append('<tr><td>'+task+'</td><td><button type="button" task-id="'+task_id+'" id="remove-task" class="btn btn-outline-danger">Remove</button></td></tr>')
                
                } else {
                    $("#table-tasks").append('<tr class="text-center"><td>No tasks to show</td></tr>')
                }
            });
        }).catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    getAllTasks();
});