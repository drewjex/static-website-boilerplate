import "../scss/style.scss";
import "font-awesome/css/font-awesome.css";

if(navigator.userAgent.indexOf("Edge") != -1 ) 
{
    require("../scss/edge.scss");
} 
else if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) 
{
    require("../scss/opera.scss");
}
else if(navigator.userAgent.indexOf("Chrome") != -1 )
{
    require("../scss/chrome.scss");
}
else if(navigator.userAgent.indexOf("Safari") != -1)
{
    require("../scss/safari.scss");
}
else if(navigator.userAgent.indexOf("Firefox") != -1 ) 
{
    require("../scss/firefox.scss");
}
else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ))
{
    require("../scss/ie.scss");
} 
