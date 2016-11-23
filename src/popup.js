


// Find US/DE info
var usde_url=window.location.href ;
var usde_id = document.getElementsByClassName('formatted-id')[0].innerText;
var usde_type="User Story"


if (usde_id.startsWith("DE"))
{
    usde_type="Defect"
}

var potential_title_elements = document.getElementsByClassName('simpleTextDetailField');
var usde_title="";

for (var i=0; i<potential_title_elements.length; ++i) {
   if (potential_title_elements[i].tagName==='INPUT')
   {
        usde_title= potential_title_elements[i].value;
        break;
   }
}

var showPopup=false;

if (showPopup)
{
// Hide if popup is visible
if ($('#dantePluginPopup') && $('#dantePluginPopup').is(':visible'))
{
    $('#dantePluginPopup').hide();
}
else{



// HTML string
var popupHtmlString = '<textarea id="dantePluginTextArea" readOnly="true" cols="250" rows="50">'+
"Type: "+ usde_type+'&#13;&#10;'+
"Name: "+usde_id+'&#13;&#10;'+
"Title: "+usde_title+'&#13;&#10;'+
"Url:&#13;&#10;"+usde_url+'&#13;&#10;'+
'</textarea>'; 

// Insert popup

var existingPupUpWindow = $('#dantePluginPopup')[0];

if (!existingPupUpWindow)
{
var node = document.createElement("DIV");                 
node.setAttribute("id", "dantePluginPopup");
node.innerHTML=popupHtmlString;

var refNode = document.getElementsByClassName('ribbon-navigation')[0];
var parent = refNode.parentNode;

document.body.appendChild(node);

var pupUpWindow = $('#dantePluginPopup');

pupUpWindow.css("position","absolute");
    pupUpWindow.css("top", Math.max(0, (($(window).height() - $(pupUpWindow).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    pupUpWindow.css("left", Math.max(0, (($(window).width() - $(pupUpWindow).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
}
else
{
    $('#dantePluginPopup').show();
}

var textArea = $('#dantePluginTextArea');

// Focus on single click
textArea.focus(function() {
    $this = $(this);
    
    $this.select();
    
    window.setTimeout(function() {
        $this.select();
    }, 1);

    // Work around WebKit's little problem
    $this.mouseup(function() {
        // Prevent further mouseup intervention
        $this.unbind("mouseup");
        return false;
    });
});

textArea.focus();


 // Handle click when outside window
$(window).click(function() {
    $('#dantePluginPopup').hide();
});

$('#dantePluginPopup').click(function(event){
    event.stopPropagation();
});

// ESC button
$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        $('#dantePluginPopup').hide();
    }
});

}
}



var subject = usde_id;
// var body="Example message";


var body="Type: "+ usde_type+'%0D%0A'+
"Name: "+usde_id+'%0D%0A'+
"Title: "+usde_title+'%0D%0A'+
"Url: "+usde_url;

var messageString = "mailto:?subject="+subject+
"&body=" + body;

window.location.href = messageString;

// window.location.href = "mailto:?subject=Subject&body=message%20goes%20here";


