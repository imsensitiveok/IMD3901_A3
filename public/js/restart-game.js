// RESTART BUTTON
// --------------
document.querySelector("#restart_button").addEventListener('click', function() {
    
    //reload scene (resets all values to default):
    location.reload();

    //bring player back to selection page:
    window.location.href ="index.html";
});