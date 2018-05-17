/*
 * Build.js - Retrieve data from smart contract from Serpentio <serpentio.com>
 * @author Alber Erre <arblugo@gmail.com> <albererre.com>
*/
  var Serpentio;
  var userAccount;

  function getBalance() {
    var totalBalance; //web3 1.0 not working
    //Serpentio.methods.getBalance().call().then(function (promise) { totalBalance = promise; });
    totalBalance = Serpentio.getBalance().c[0];
    return totalBalance;
  }

  function getParticipants() {
    var numParticipants; //web3 1.0 not working
    //Serpentio.methods.getParticipants().call().then(function (promise) { numParticipants = promise; }); 
    numParticipants = Serpentio.getParticipants().c[0];
    return numParticipants;
  }

  function getCountdownDate() {
    var currentCountdownDate; //web3 1.0 not working
    //Serpentio.methods.getCountdownDate().call().then(function (promise) { currentCountdownDate = new Date(promise); }); 
    unix_date = Serpentio.getCountdownDate().c[0];
    regular_date = Date(unix_date);
    currentCountdownDate = moment(regular_date).format("Do MMM YYYY, h:mm:ss");
    return currentCountdownDate;
  }

  function getReturns() {
    var thisUserReturns; //web3 1.0 not working
    //Serpentio.methods.getReturns(userAccount).call().then(function (promise) { thisUserReturns = promise; }); 
    thisUserReturns = Serpentio.getReturns(web3.eth.accounts[0]).c[0];
    return thisUserReturns;
  }

  function PlaySerpentio() {
    //return Serpentio.methods.Play("I've played via web :D").send()
    return Serpentio.Play("I've played via web :D").send();

  }

  function startSerpentio() {

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    var SerpentioAddress = '0xBDD1117Ba4DE088A62D1e6029e41f24415958129';
    var SerpentioABI = [{"constant":false,"inputs":[],"name":"CollectReturns","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SerpenSegmentCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"investorsList","outputs":[{"name":"investorAddress","type":"address"},{"name":"amountInvested","type":"uint256"},{"name":"SegmentNumber","type":"uint256"},{"name":"time","type":"uint256"},{"name":"quote","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SerpentCountDown","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_SerpentCountDown","type":"uint256"}],"name":"NewSerpent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getParticipants","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCountdownDate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_quote","type":"string"}],"name":"Play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getReturns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SerpentIsRunning","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"SerpentHead","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"investorReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
    Serpentio = web3.eth.contract(SerpentioABI).at(SerpentioAddress);
    //var Serpentio = new web3.eth.Contract(SerpentioABI, SerpentioAddress); // web3 1.0 esta dando problemas
    console.log(Serpentio);
    console.log("Serpentio contract should be above this");

    userAccount = web3.eth.accounts[0];
  }

  window.addEventListener('load', function () {

    startSerpentio();

    var accountInterval = setInterval(function() {
    if (web3.eth.accounts[0] !== userAccount) {
      userAccount = web3.eth.accounts[0];
    }
  }, 100);

    // Jquery
    console.log("Jquery debajo de aqui");
    console.log(Serpentio.getCountdownDate().c[0]);
    console.log("Jquery encima de aqui");

    $("#Balance").html(getBalance() + " ether");
    $("#Participants").html(getParticipants());
    $("#CountdownDate").html(getCountdownDate());
    $("#YourReturns").html(getReturns() + " ether");
    $("#YourAddress").html(userAccount);

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
  })

