
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

function getAccount(error, accounts) {
    if (error) {
      console.log(error);
    }
    console.log(accounts);
    var tb = $('#addressList');
    tb.html("");
    var i = 0;   
    $.each(accounts, function(key, value){
        var html ="<tr onclick='selectAddr(\"" + value + "\")'><td>" + ++i + "</td><td>"+value+"</td></tr>";
        tb.append(html);
    });
}

$(document).ready(function(){
    getList();
    
    web3App.init();
    web3App.Web3GetAccounts(getAccount);

});