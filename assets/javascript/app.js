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

// Firebase watcher + initial page loader; this behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

    // Testing -- Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency);

    // Set up local variables for next arrival time and minutes away
    var nextArrival = calculateNextArrival(childSnapshot.val().firstTrainTime, childSnapshot.val().frequency);
    var minutesAway = calculateMinsAway(childSnapshot.val().firstTrainTime, childSnapshot.val().frequency);

    // Full list of items to the display
    $(".schedule-content").append("<div class='row'> " +
        '<div class="col-lg-2" id="train-name">' + childSnapshot.val().name + "</div>" +
        '<div class="col-lg-2" id="train-destination">' + childSnapshot.val().destination + "</div>" +
        '<div class="col-lg-2" id="train-frequency">' + childSnapshot.val().frequency + "</div>" +
        '<div class="col-lg-2" id="next-arrival">' + nextArrival + "</div>" +
        '<div class="col-lg-2" id="minutes-away">'  + minutesAway + "</div>"
    + "</div>" );

    // Handle any errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

}); // End Firebase watcher and initial page loader

// Calculate next arrival function
function calculateNextArrival(firstTime, trainFrequency) {

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var timeRemainder = diffTime % trainFrequency;
    console.log(timeRemainder);

    // Minute Until Train
    var timeMinutesTillTrain = trainFrequency - timeRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(timeMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    return moment(nextTrain).format("hh:mm");

} // End calculate next arrival function

// Calculate minutes away function
function calculateMinsAway(firstTime, trainFrequency) {

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var timeRemainder = diffTime % trainFrequency;
    console.log(timeRemainder);

    // Minute Until Train
    var timeMinutesTillTrain = trainFrequency - timeRemainder;
    console.log("MINUTES TILL TRAIN: " + timeMinutesTillTrain);

    return timeMinutesTillTrain;

} // End calculate minutes away function
