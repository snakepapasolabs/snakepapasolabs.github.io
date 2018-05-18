/*
 * Build.js - Retrieve data from smart contract from Serpentio <serpentio.com>
 * @author Alber Erre <arblugo@gmail.com> <albererre.com>
*/

  var Serpentio;
  var userAccount;
  var totalBalance;
  var numParticipants;
  var currentCountdownDate;
  var thisUserReturns;

  function _getBalance() {
    //var totalBalance; //web3 1.0 not working
    //Serpentio.methods.getBalance().call().then(function (promise) { totalBalance = promise; });
    return new Promise (function (resolve, reject) {
    	Serpentio.getBalance(function(error, result) {
    	if(!error) {
    		totalBalance = result.c[0];
            resolve(totalBalance);
        	}
    	else {
        	reject(error);
    		}
    	})
    });
  }

  function _getParticipants() {
    //var numParticipants; //web3 1.0 not working
    //Serpentio.methods.getParticipants().call().then(function (promise) { numParticipants = promise; }); 
    return new Promise (function (resolve, reject) {
    	Serpentio.getParticipants(function(error, result) {
    	if(!error) {
    		numParticipants = result.c[0];
            resolve(numParticipants);
        	}
    	else {
        	reject(error);
    		}
    	})
    });
  }

  function _getCountdownDate() {
    //var currentCountdownDate; //web3 1.0 not working
    //Serpentio.methods.getCountdownDate().call().then(function (promise) { currentCountdownDate = new Date(promise); }); 

    return new Promise (function (resolve, reject) {
    	Serpentio.getCountdownDate(function(error, result) {
    	if(!error) {
    		unix_time = result.c[0];
    	    regular_date = new Date(unix_time*1000);
            currentCountdownDate = moment(regular_date).format("Do MMM YYYY, h:mm:ss");
            console.log(currentCountdownDate);
            resolve(currentCountdownDate);
        	}
    	else {
        	reject(error);
    		}
    	})
    });
  }

  function _getReturns() {
    //var thisUserReturns; //web3 1.0 not working
    //Serpentio.methods.getReturns(userAccount).call().then(function (promise) { thisUserReturns = promise; }); 
    return new Promise (function (resolve, reject) {
    	Serpentio.getReturns(web3.eth.accounts[0], function(error, result) {
    	if(!error) {
    		thisUserReturns = result.c[0];
            resolve(thisUserReturns);
        	}
    	else {
        	reject(error);
    		}
    	})
    });
  }

  function PlaySerpentio() {
    //return Serpentio.methods.Play("I've played via web :D").send()
    //return Serpentio.Play("I've played via web :D").send();

  }

  function startSerpentio() {

    var SerpentioAddress = '0xBDD1117Ba4DE088A62D1e6029e41f24415958129';
    var SerpentioABI = [{"constant":false,"inputs":[],"name":"CollectReturns","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SerpenSegmentCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"investorsList","outputs":[{"name":"investorAddress","type":"address"},{"name":"amountInvested","type":"uint256"},{"name":"SegmentNumber","type":"uint256"},{"name":"time","type":"uint256"},{"name":"quote","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SerpentCountDown","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_SerpentCountDown","type":"uint256"}],"name":"NewSerpent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getParticipants","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCountdownDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_quote","type":"string"}],"name":"Play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getReturns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SerpentIsRunning","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SerpentHead","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"investorReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
    Serpentio = web3.eth.contract(SerpentioABI).at(SerpentioAddress);
    //var Serpentio = new web3.eth.Contract(SerpentioABI, SerpentioAddress); // web3 1.0 esta dando problemas
    console.log(Serpentio);
    console.log("Serpentio contract should be above this");

    userAccount = web3.eth.accounts[0];
    console.log(userAccount);
    console.log("User account (address) should be above this");


  }

  window.addEventListener('load', function () {

  	if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    startSerpentio();

    var accountInterval = setInterval(function() {
    if (web3.eth.accounts[0] !== userAccount) {
      userAccount = web3.eth.accounts[0];
      // here a function should be used to update interface  <---
       }
    }, 100);

    // Jquery
    console.log("Jquery debajo de aqui");
    console.log(_getCountdownDate());
    console.log("Jquery encima de aqui");

    $("#Balance").html(_getBalance() + " ether");
    $("#Participants").html(_getParticipants());
    $("#CountdownDate").html(_getCountdownDate());
    $("#YourReturns").html(_getReturns() + " ether");
    //$("#YourAddress").html(userAccount);

    var Balance_Interval = setInterval(function() {
    if (_getBalance() !== totalBalance) {
    	$("#Balance").html(totalBalance + " ether");
       }
    }, 100);    

    var Participants_Interval = setInterval(function() {
    if (_getParticipants() !== numParticipants) {
    	$("#Participants").html(numParticipants);
       }
    }, 100);    

    var CountdownDate_Interval = setInterval(function() {
    if (_getCountdownDate() !== currentCountdownDate) {
    	$("#CountdownDate").html(currentCountdownDate);
       }
    }, 100);

    var YourReturns_Interval = setInterval(function() {
    if (_getReturns() !== thisUserReturns) {
    	$("#YourReturns").html(thisUserReturns + " ether");
       }
    }, 100);

  })

    /* Holding errors:
    Serpentio.owner(function(error, result){
        if(!error)
            {
                $("#YourAddress").html(Serpentio.owner);
                console.log(result);

                console.log("indexado!");
            }
        else
            console.error(error);
    });
    /*

    /*
    Alternative: React

    var yeah = Serpentio.getParticipants();
    console.log("hemos pasado el yeah");
    ReactDOM.render(
        React.createElement('p', null, yeah),
        document.getElementById('Participants'));

    HTML:
    <div id="Yeah"></div>

    <script type="text/javascript">
      ReactDOM.render(
        React.createElement('p', null, 'yeah'),
        document.getElementById('Balance'));
    </script>
    */

