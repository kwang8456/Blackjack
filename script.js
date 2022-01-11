const altRank = ["ACE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "JACK", "QUEEN", "KING"]; 
const altSuit = ["CLOVERS", "DIAMONDS", "HEARTS", "SPADES"];

function initialize ()
{
    deck = [];
    player = [];
    dealer = [];
    next = false;
    call = false;
    total = 50000;
    bettingAmount = 0;
    // generateDeck ();
    // shuffle ();
    // distributeCard ();
    // displayAmount ();
    // console.log (deck [0].rank);
    // console.log (value ()); 
}

function instruction() {
    var rules = document.getElementById ("rules");
    var span = document.getElementsByClassName("close")[0];
    rules.style.display = "block";
    span.onclick = function() 
    {
        rules.style.display = "none";
    }
    window.onclick = function (event) 
    {
        if (event.target == rules) 
        {
            rules.style.display = "none";
        }
    }
}

function start ()
{
    generateDeck ();
    shuffle ();
    distributeCard ();
    displayAmount ();
}

function generateDeck ()
{
    for (var i = 1; i <= 13; i++)
    {
        for (var s = 0; s < 4; s++)
        {
            var card = {};
            card.rank = i;
            card.alt = altRank [i - 1] + " of " + altSuit [s];
            card.suit = s;
            card.img = i + "-" + s + ".png";
            deck.push (card);
        }
    }
}

function shuffle ()
{
    var num = parseInt (Math.random () * deck.length);
    for (var i = 0; i < deck.length; i++)
    {
        var temp = deck [i];
        deck [i] = deck [num];
        deck [num] = temp;
        num = parseInt (Math.random () * deck.length);
    }
}

function distributeCard ()
{
    for (var i = 0; i < 2; i++)
    {
        dealer.push (deck.pop ());
        player.push (deck.pop ());
    }
    if (value (dealer) == 21 && value (player) != 21)
    {
        popUp ();
        document.getElementById ("status").innerHTML = "The Dealer Blackjacked. You Lose.";
        displayAmount ("lose");
        // console.log ("The Dealer Blackjacked. You lose.");
        call = true;
    }
    else if (value (dealer) != 21 && value (player) == 21)
    {
        popUp ();
        document.getElementById ("status").innerHTML = "You Blackjacked. You Win.";
        displayAmount ("win");
        // console.log ("You Blackjacked. You win.");
        call = true;
    }
    else if (value (dealer) == 21 && value (player) == 21)
    {
        popUp ();
        document.getElementById ("status").innerHTML = "\You Tied.";
        displayAmount ("tie");
        // console.log ("You Tied.");
        call = true;
    }
    display (player, "PlayerHand");
    display (dealer, "DealerHand");
}

function hit ()
{
    if (!call)
    {
        player.push (deck.pop ());
        display (player, "PlayerHand");
        checkBusted (value (player));
    }
}

function value (user)
{
    let sum = 0;
    let ace = [];
    for (var i = 0; i < user.length; i++)
    {
        if (user [i].rank == "1")
        {
            ace.push (11);
            // ace = 11;
            // console.log ("check");
        }
        else if (user [i].rank >= "10")
        {
            sum += 10;
            // console.log ("check2");
        }
        else
        {
            sum += parseInt (user [i].rank);
            // console.log ("check3");
        }
    }
    for (var i = 0; i < ace.length; i++)
    {
        // (ace [i] == 11) && 
        if (sum + ace [i] > "21")
        {
            sum += 1;
        }
        else
        {
            sum += ace [i];
        }
    }
    return sum;
}

function dealerTurn ()
{
    display (dealer, "DealerHand");
    while (value (dealer) < 17)
    {
        dealer.push (deck.pop ());
        display (dealer, "DealerHand");
    }
    console.log ("Dealer: " + value (dealer));
    if (value (dealer) > 21)
    {
        popUp ();
        document.getElementById ("status").innerHTML = "The Dealer Busted. You Win";
        displayAmount ("win");
        // console.log ("The Dealer Busted. You Win");
    }
    else if (value (player) > value (dealer))
    {
        popUp ();
        document.getElementById ("status").innerHTML = "You Win";
        displayAmount ("win");
        // console.log ("You Win");
    }
    else if (value (player) == value (dealer))
    {
        popUp ();
        document.getElementById ("status").innerHTML = "You Tie";
        displayAmount ("tie");
        // console.log ("You Tie");
    }
    else if ((player.length >= 5) && (value (dealer) != 21))
    {
        popUp ();
        document.getElementById ("status").innerHTML = "You Have Obtained 5 cards. You Win";
        displayAmount ("win");
    }
    else if ((player.length >= 5) && (value (dealer) == 21))
    {
        popUp ();
        document.getElementById ("status").innerHTML = "You Tie";
        displayAmount ("tie");
    }
    else 
    {
        popUp ();
        document.getElementById ("status").innerHTML = "You Lose";
        displayAmount ("lose");
        // console.log ("You Lose");
    }
    display (player, "PlayerHand");
}

function stand ()
{
    if (!call)
    {
        call = true;
        console.log ("Player: " + value (player));
        dealerTurn ();
    }
}

function checkBusted (value)
{
    console.log ("Player: " + value);
    if (value > 21)
    {
        call = true;
        popUp ();
        display (player, "PlayerHand");
        display (dealer, "DealerHand");
        document.getElementById ("status").innerHTML = "You Busted!";
        displayAmount ("lose");
        // console.log ("You Busted!");
    }
    else
    {
        return;
    }
    
}

function bet (amount)
{
    if ((total + amount) >= 0 && (bettingAmount - amount) <= 5000)
    {
        total += amount;
        bettingAmount -= amount; 
    }
    // display (player, "PlayerHand");
    // console.log (bettingAmount);
    displayAmount ();
}

function confirmBet ()
{
    if (!next)
    {
        document.getElementById ("bettingScreen").style.display = "none";
        document.getElementById ("bet").innerHTML = bettingAmount;
        start ();
    }
    else
    {
        document.getElementById ("bettingScreen").style.display = "none";
        document.getElementById ("bet").innerHTML = bettingAmount;
        player = [];
        dealer = [];
        distributeCard ();
    }
}

function popUp ()
{
    var modal = document.getElementById ("continueScreen");
    var span = document.getElementsByClassName ("close")[0];
    modal.style.display = "block";
    span.onclick = function() 
    {
        modal.style.display = "none";
    }
    // window.onclick = function (event) 
    // {
    //     if (event.target == modal) 
    //     {
    //         modal.style.display = "none";
    //     }
    // }
}

function continueGame ()
{
    document.getElementById ("continueScreen").style.display = "none";
    document.getElementById ("bettingScreen").style.display = "block";
    document.getElementById ("bet").innerHTML = bettingAmount;
    call = false;
    next = true;
}

function display (user, hand)
{
    id = hand; 
    if (!call)
    {
        //document.getElementById (hand).innerHTML = "<img alt=\"" + user[0].alt + "\" src=\"cardimages/" + user [0].img + "\">";
        document.getElementById (hand).innerHTML = "<img id = \"" + id + "\" alt=\"Facedown card\" src=\"cardimages/back-blue-75-2.png\">";
        var flipCard = document.getElementById(id);
        flipCard.onmouseover = function() 
        {
            document.getElementById(hand).innerHTML = "<img alt=\"" + user[0].alt + "\" src=\"cardimages/" + user [0].img + "\">";
            for (var i = 1; i < user.length; i++)
            {
                document.getElementById (hand).innerHTML += "<img alt=\"" + user[i].alt + "\" src=\"cardimages/" + user [i].img + "\">";
            }
        }
        flipCard.onmouseout = function() 
        {
            document.getElementById (hand).innerHTML = "<img id = \"" + id + "\" alt=\"Facedown card\" src=\"cardimages/back-blue-75-2.png\">";
            for (var i = 1; i < user.length; i++)
            {
                document.getElementById (hand).innerHTML += "<img alt=\"" + user[i].alt + "\" src=\"cardimages/" + user [i].img + "\">";
            }
        }
    }
    else
    {
        document.getElementById (hand).innerHTML = "<img alt=\"" + user[0].alt + "\" src=\"cardimages/" + user [0].img + "\">";
    }
    for (var i = 1; i < user.length; i++)
    {
        document.getElementById (hand).innerHTML += "<img alt=\"" + user[i].alt + "\" src=\"cardimages/" + user [i].img + "\">";
    }
    // document.getElementById ("initialValue").innerHTML = total;
}

function displayAmount (str)
{
    if (!call) 
    {
        document.getElementById ("initialValue").innerHTML = total;
        document.getElementById ("amountBet").innerHTML = bettingAmount;
    }
    else if (str == "win")
    {
        document.getElementById ("initialValue").innerHTML = (total + (2 * bettingAmount));
        bettingAmount = 0;
        document.getElementById ("amountBet").innerHTML = bettingAmount;
    }
    else if (str == "tie")
    {
        document.getElementById ("initialValue").innerHTML = (total + bettingAmount);
        bettingAmount = 0;
        document.getElementById ("amountBet").innerHTML = bettingAmount;
    }
    else 
    {
        document.getElementById ("initialValue").innerHTML = (total);
        bettingAmount = 0;
        document.getElementById ("amountBet").innerHTML = bettingAmount;
    }
}