// -----------category box color --------------------------
// *************start**********************
// finding the div of category box
var x = document.getElementsByClassName("categories");
console.log(x);
// iterating over list of divs having class "categories"
for (var i of x){
    // assigning different color according to innerText of the div
    if(i.innerText == "Work"){
        // setting color to parent element of captured innerText
        i.parentElement.style.backgroundColor = "green";
    }
    else if(i.innerText == "Personal"){
        i.parentElement.style.backgroundColor = "#6b6bce"; 
    }
    else if(i.innerText == "Public"){
        i.parentElement.style.backgroundColor = "#ab5e5e"; 
    }
    else if(i.innerText == "School"){
        i.parentElement.style.backgroundColor = "orange"; 
    }
    else if(i.innerText == "Home"){
        i.parentElement.style.backgroundColor = "darkgreen"; 
    }
}
// ************************END*******************************
// ---Handling visibility and accountability of hidden update form---
// ************************START*****************************
function visible(){
    // finding and storing div with id "hidden-form" in variable div
    var div = document.getElementById("hidden-form");
    // handling visibility style property with ".style.visibility"
    div.style.visibility = "visible";
    // refreshing page(30 sec == 30000 millisec) after making form visible
    setTimeout(function(){
        window.alert('Time-out redirecting to home page');
        // inbuilt function for reloading the page
        location.reload();
    },30000);
}
// handling close button for hidden update form
function closeWin(){
    // capturing div
    var div = document.getElementById("hidden-form");
    // setting visibility to hidden
    div.style.visibility = "hidden"; 
    location.reload()
}
// ******************************END*****************************
// restrictions to date callender so that user can not enter previous dates
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("calender").setAttribute("min", today);
document.getElementById("calender-up").setAttribute("min", today);