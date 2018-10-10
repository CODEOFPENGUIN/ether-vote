function stringToEmpty(str){
    if(str == undefined
        || str == null
        || !str){
        return "";
    }
    return str;
}

function stringToNA(str){
    if(str == undefined
        || str == null
        || !str){
        return "N/A";
    }
    return str;
}
function stringToEmtyStr(str, replace){
    if(str == undefined
        || str == null
        || !str){

        return !replace || replace == undefined || replace == null ? stringToNA(str) : replace;
    }
    return str;
}