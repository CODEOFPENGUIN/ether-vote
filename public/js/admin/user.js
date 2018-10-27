
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
    $("#pwd").val("");
    $("#address").val("");
    $("#username").val(stringToEmpty(username));
    $("#address").text(addr);
}

function selectAddr(addr){
    if(!$("#username").val()
    || $("#username").val() == undefined){
        alert("사용자를 선택해 주세요.");
        return false;
    }
    $("#address").val("");
    $("#address").text(addr);
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
        var html ="<tr onclick='selectAddr(\"" + value + "\")'><td>" + ++i + "</td><td name='addrTd'>"+value+"</td></tr>";
        tb.append(html);
    });
}

function reset(){
    $('input').val("");
}

function updateUser(){
    var uName = $('#username').val();
    var pwd = $('#pwd').val();
    var addr = $('#address').text();
    $.post("/admin/user/update"
                  ,{username:uName,password:pwd,address:addr}
                  ,function(result){
                    getList();
              })
    
}

function addUser(){
    var uName = $('#username').val();
    var pwd = $('#pwd').val();
    var addr = $('#address').text();
    $.post("/signup"
                  ,{username:uName,password:pwd,address:addr}
                  ,function(result){
                    getList();
              })
}

function deleteUser(){

}

function initUser(){
    $.post("/admin/user/init"
            ,{}
            ,function(result){
                getList();
        })
}

function initUserInfo(){
    removeAll();
    
    
    
}

function removeAll(){
    $.post("/admin/user/deleteAll"
        ,{}
        ,function(result){
            if(result){
                var trs = $('#addressList').find("tr>td[name='addrTd']");
                var inx = 0;
                $.each(trs, function(indexInArray, value){
                    var addr = $(this).text();
                    var uName = indexInArray + 1;
                    var pwd = indexInArray + 1;
                    var addr = addr;
                    $.ajax({
                        type: 'POST',
                        url: "/signup",
                        data: {username:uName,password:pwd,address:addr},
                        success: function(){},
                        dataType: "json",
                        async:false
                      });                    
                });

                getList();
            }
        })
}

function insertAll(){
    //$.post("/admin/user/insertAll");
}

$(document).ready(function(){
    getList();
    
    web3App.init();
    web3App.Web3GetAccounts(getAccount);

    $('.btn-circle').on('click', reset);
    $('#btn-add').on('click', addUser);
    $('#btn-update').on('click', updateUser);
    $('#btn-delete').on('click', deleteUser);

    $('#btn-init').on('click', initUserInfo);
});