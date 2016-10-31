
function setConfig()
{
    //Objeto texts
    var texts = {
        "title" : 'Shopping Control'
    };
    document.title = texts.title;
    document.getElementById("navTitle").innerHTML = texts.title;
}

setConfig();