function getStoreHours() {
    var storeHourMessages = new Array(7);
    storeHourMessages[0] = "Our Sunday hours are 11am to 10pm"
    storeHourMessages[1] = "Our Monday hours are 10:30am to 10pm"
    storeHourMessages[2] = "Our Tuesday hours are 10:30am to 10pm"
    storeHourMessages[3] = "Our Wednesday hours are 10:30am to 10pm"
    storeHourMessages[4] = "Our Thursday hours are 10:30am to 10pm"
    storeHourMessages[5] = "Our Friday hours are 10:30am to 10pm"
    storeHourMessages[6] = "Our Saturday hours are 11am to 10pm"
    
    var currentDate = new Date();
    var message = storeHourMessages[currentDate.getDay()];
    document.getElementById('fixed-hours').innerHTML = message;        
}

$(document).ready(function(){
    getStoreHours();
});
