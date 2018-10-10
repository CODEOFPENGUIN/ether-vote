
function getList(){
    $.get("/admin/user/getUserList"
                ,{}
                ,function(result){
                var tb = $('#userlist');
                tb.html("");                
                var inx = 0;
                $.each(result,function(a,b){
                    var html ="<tr onclick='selectUser(\"" + b.username + "\",\"" + stringToEmtyStr(b.address) + "\")'><td>" + (++inx) + "</td><td>"+b.username+"</td><td>"+stringToEmtyStr(b.address)+"</td></tr>";
                    tb.append(html);
                })
                })
}

function selectUser(username, addr){
    $("#username").val("");
    $("#address").val("");
    $("#username").val(stringToEmpty(username));
    $("#address").val(addr);
}

function selectAddr(addr){
    if(!$("#username").val()
    || $("#username").val() == undefined){
        alert("사용자를 선택해 주세요.");
        return false;
    }
    $("#address").val("");
    $("#address").val(addr);
}

$(document).ready(function(){
    getList();
});