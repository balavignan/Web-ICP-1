function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showUser(JSON.parse(this.responseText));
        }
        else if (this.readyState == 4) {
            noSuchUser(user)
        }
    };
    xhttp.open("GET", "https://api.github.com/users/" + user, true);
    xhttp.send();
}

function showUser(user) {

    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content

    $("#header").text(user.login)
    $("#avatar").append('<img src="'+user.avatar_url+'" width="100px" height="100px"/>')
    $("#information").append('<a href="'+user.html_url+'">Github Url</a></br><a href="'+user.repos_url+'">Repo Url</a>')

}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed

    $("#header").text("no such profile")
}


$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        $("#header").html("")
        $("#avatar").html("")
        $("#information").html("")
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
             getGithubInfo(username);
            //if the response is successful show the user's details
          //  if (response.status == 200) {
          //      showUser(JSON.parse(response.responseText));
                //else display suitable message
          //  } else {
           //     noSuchUser(username);
          //  }
        }
    })
});
