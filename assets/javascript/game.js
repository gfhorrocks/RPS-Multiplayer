var database = firebase.database();
var playerOne;
var playerTwo;
var connections;

var connectionsRef = database.ref("/connections");
// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function (snap) {

    // If they are connected..
    if (snap.val()) {

        // Add user to the connections list.
        var con = connectionsRef.push(true);

        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});

connectionsRef.on("value", function (snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    $("#connected-viewers").text("Connected Users: " + snap.numChildren());
    
    connections = snap.numChildren();
   
    if (snap.numChildren() === 1) {
        console.log("Setting Player 1");
        database.ref().set({
            playerOne: snap.val()
        })
    } else if (snap.numChildren() === 2) {
        console.log("Setting Player 2");
        database.ref().set({
            playerTwo: snap.val()
        })
    }

    console.log("Connected: " +connections);
});

