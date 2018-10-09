web3App = {
    web3Provider: null,
    contracts: {},
    currAccount: null,
  
    init: function() {
        
      // Is there an injected web3 instance?
      if (typeof web3 !== 'undefined') {
        web3App.web3Provider = web3.currentProvider;
      } else {
        // If no injected web3 instance is detected, fall back to Ganache
        web3App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      }
      //web3 = new Web3(App.web3Provider);
  
      web3App.initContract();
    },
    
    initContract: function() {
      /*
       * Replace me...
       */
      $.getJSON('VoteContract.json', function(data) {
        // Get the necessary contract artifact file and instantiate it with truffle-contract
        var voteContractArtifact = data;
        web3App.contracts.voteContract = TruffleContract(voteContractArtifact);
      
        // Set the provider for our contract
        web3App.contracts.voteContract.setProvider(web3App.web3Provider);
      
        // Use our contract to retrieve and mark the adopted pets
        web3App.Web3GetAccounts();
        //return App.markAdopted();
      });
    },
    
    Web3GetAccounts : function(){
  
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
        $.each(accounts, function(key, value){
          $("#accountSelect").append($("<option></option>").attr("value", value).text(value));
        });
        web3App.setAccount();
      });
    },

    setAccount : function(){
      var selectedVal = $("#accountSelect option:selected").val();
      if(selectedVal != null){
        web3App.currAccount = selectedVal;
      }
    }
  };
  
  $(document).ready(function(){
    web3App.init();
    $(document).on('click', '#btn-account', web3App.setAccount);
  });
