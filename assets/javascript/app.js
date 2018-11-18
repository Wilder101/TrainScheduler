// TrainScheduler by WBM, 11/13/18, app.js file

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBO6tcjJKqHu7VINd8iRHFG3nAryL8NcvE",
    authDomain: "wilder-train-scheduler.firebaseapp.com",
    databaseURL: "https://wilder-train-scheduler.firebaseio.com",
    projectId: "wilder-train-scheduler",
    storageBucket: "wilder-train-scheduler.appspot.com",
    messagingSenderId: "1371104277"
};
firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values
    var name = "";
    var destination = "";
    var firstTrainTime = "";            // Use HH:mm - international time standard
    var frequency = "";                 // In minutes
    
    // Capture Button Click
    $("#add-train-submit-button").on("click", function(event) {

        // Don't refresh the page!
        event.preventDefault();

        // Capture inputs locally Firebase database
        name = $("#train-name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTrainTime = $("#first-train-time-input").val().trim();                
        frequency = $("#frequency-input").val().trim();

        // Testing
        console.log(name);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);

        // Update Firebase database
        database.ref().push({                   // Using .push from .set for data additions over replacement
            name: name,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        });
    });

// Firebase watcher + initial loader; this behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency);

    // full list of items to the display
    // addEmployeeRow(childSnapshot.val().name, childSnapshot.val().role, childSnapshot.val().startDate, childSnapshot.val().monthlyRate);

    $(".schedule-content").append("<div class='row'> " +
        '<div class="col-lg-2" id="train-name">' + childSnapshot.val().name + "</div>" +
        '<div class="col-lg-2" id="train-destination">' + childSnapshot.val().destination + "</div>" +
        '<div class="col-lg-2" id="train-frequency">' + childSnapshot.val().frequency + "</div>" +
        '<div class="col-lg-2" id="next-arrival">' + "10" + "</div>" +
        '<div class="col-lg-2" id="minutes-away">'  + "11" + "</div>"
        // '<div class="col-lg-2" id="total-billed">' + childSnapshot.val().monthlyRate + "</div>" + 
    + "</div>" );

    // Handle any errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

});

// Add Employee Row function
function addEmployeeRow (empName, empRole, empDate, empRate) {

    // Add row to employee-content
    let newRow = $("<div>").addClass("row");

    // console.log("addEmployeeRow function called");

    let newDiv = $("<div>").addClass("col-lg-2");
    newDiv.text = empName;
    // newRow.append(newDiv);
    newRow.text = newRow.text + newDiv;

    // let newDiv2 = $("<div>").addClass("col-lg-2");
    // newDiv2.text = empRole;
    // // newRow.append(newDiv2);
    // newRow.html = newRow.text + newDiv2;

    // let newDiv3 = $("<div>").addClass("col-lg-2");
    // newDiv3.text = empDate;
    // // newRow.append(newDiv3);
    // newRow.html = newRow.text + newDiv3;

    // let newDiv4 = $("<div>").addClass("col-lg-2");
    // newDiv4.text = "";                                // Fill in Months Worked later
    // // newRow.append(newDiv4);
    // newRow.html = newRow.text + newDiv4;

    // let newDiv5 = $("<div>").addClass("col-lg-2");
    // newDiv5.text = empRate;
    // // newRow.append(newDiv5);
    // newRow.html = newRow.text + newDiv5;

    // let newDiv6 = $("<div>").addClass("col-lg-2");
    // newDiv6.text = "";                               // Fill in Total Billed later
    // // newRow.append(newDiv6);
    // newRow.html = newRow.text + newDiv6;

    // $(".employee-content").append(newRow);

                // <div class="row">
                // <div class="col-lg-2" id="emp-name">Test</div>
                // <div class="col-lg-2" id="emp-role">Test</div>
                // <div class="col-lg-2" id="start-date">Test</div>
                // <div class="col-lg-2" id="months-worked">Test</div>
                // <div class="col-lg-2" id="monthly-rate">Test</div>
                // <div class="col-lg-2" id="total-billed">Test</div>
                // </div>

} // End add employee row function

