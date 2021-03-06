const path = require('path');
var express = require('express');
var app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(port, function() {
	console.log("The server is up and listening.", port);
});

app.get('/', handleRootRequest);

function handleRootRequest(req, res) {
    console.log("Received a request for /");

    res.write("This is the homepage");
    res.end();

}

app.get('/postage', function(req, res) {
    var type = returnPostageType(req, res);
    var weight = returnPostageWeight(req, res);
    var zone = returnZone(req, res);
    var postage = calculatePostage(type, weight, zone);

    var params = {type: type, weight: weight, postage: postage};

    res.render("pages/postageDisplay", params);   
});

function returnPostageType (req, res) {
    var type = req.query.type;
    
    return type;
}

function returnPostageWeight (req, res) {
    var weight = req.query.weight;

    return weight;
}

function returnZone (req, res) {
    var zone = req.query.zone;

    return zone;
}

function calculatePostage (type, weight, zone) {
    
    var postage = 0;
    var numLoop = 0;
    
    var weightNum = parseFloat(weight);    
    if (weightNum == 3.5) {
	numLoop = 4;
    }
    else {
	numLoop = weightNum;
    }

    if(type == "Letters (Stamped)") {
	var num = .55;
        for(i=1; i < numLoop; i++){
	    num = num + .15;
        }
        postage = num.toFixed(2);
    }

    if(type == "Letters (Metered)") {
        var num = .5;
        for(i=1; i < numLoop; i++){
            num = num + .15;
        }
        postage = num.toFixed(2);
    }

    if(type == "Large Envelopes (Flats)") {
        var num = 1;
        for(i=1; i < numLoop; i++){
            num = num + .2;
        }
        postage = num.toFixed(2);
    }

    if(type == "First-Class Package Service--Retail") {
        var num = 0;
	if(zone == 1 || zone == 2){
	    if(weightNum == 1 || weightNum == 2 || weightNum == 3 || weightNum == 4){
		num = 3.8;
	    }
            else if(weightNum == 5 || weightNum == 6 || weightNum == 7 || weightNum == 8){
                num = 4.6;
            }
	    else if(weightNum == 9 || weightNum == 10 || weightNum == 11 || weightNum == 12){
		num = 5.3;
	    }
            else if(weightNum == 13){
                num = 5.9;
            }
        }

	else if(zone == 3){
            if(weightNum == 1 || weightNum == 2 || weightNum == 3 || weightNum == 4){
                num = 3.85;
            }
            else if(weightNum == 5 || weightNum == 6 || weightNum == 7 || weightNum == 8){
                num = 4.65;
            }
            else if(weightNum == 9 || weightNum == 10 || weightNum == 11 || weightNum == 12){
                num = 5.35;
            }
            else if(weightNum == 13){
                num = 5.95;
	    }
         }

	else if(zone == 4){
            if(weightNum == 1 || weightNum == 2 || weightNum == 3 || weightNum == 4){
                num = 3.9;
            }
            else if(weightNum == 5 || weightNum == 6 || weightNum == 7 || weightNum == 8){
                num = 4.7;
            }
            else if(weightNum == 9 || weightNum == 10 || weightNum == 11 || weightNum == 12){
                num = 5.4;
            }
            else if(weightNum == 13){
                num = 6.05;
	    }
         }

        else if(zone == 5){
            if(weightNum == 1 || weightNum == 2 || weightNum == 3 || weightNum == 4){
		num = 3.95;
            }
            else if(weightNum == 5 || weightNum == 6 || weightNum == 7 || weightNum == 8){
		num = 4.75;
            }
            else if(weightNum == 9 || weightNum == 10 || weightNum == 11 || weightNum == 12){
		num = 5.45;
            }
            else if(weightNum == 13){
                num = 6.15;
            }
	}

        else if(zone == 6){
            if(weightNum == 1 || weightNum == 2 || weightNum == 3 || weightNum == 4){
		num = 4;
            }
            else if(weightNum == 5 || weightNum == 6 || weightNum == 7 || weightNum == 8){
		num = 4.8;
            }
            else if(weightNum == 9 || weightNum == 10 || weightNum == 11 || weightNum == 12){
		num = 5.5;
            }
            else if(weightNum == 13){
                num = 6.2;
            }
	}

        else if(zone == 7){
            if(weightNum == 1 || weightNum == 2 || weightNum == 3 || weightNum == 4){
		num = 4.05;
            }
            else if(weightNum == 5 || weightNum == 6 || weightNum == 7 || weightNum == 8){
		num = 4.9;
            }
            else if(weightNum == 9 || weightNum == 10 || weightNum == 11 || weightNum == 12){
		num = 5.65;
            }
            else if(weightNum == 13){
                num = 6.4;
            }
	}

        else if(zone == 8){
            if(weightNum == 1 || weightNum == 2 || weightNum == 3 || weightNum == 4){
		num = 4.2;
            }
            else if(weightNum == 5 || weightNum == 6 || weightNum == 7 || weightNum == 8){
		num = 5;
            }
            else if(weightNum == 9 || weightNum == 10 || weightNum == 11 || weightNum == 12){
		num = 5.75;
            }
            else if(weightNum == 13){
                num = 6.5;
            }
	}

        else if(zone == 9){
            if(weightNum == 1 || weightNum == 2 || weightNum == 3 || weightNum == 4){
		num = 4.2;
            }
            else if(weightNum == 5 || weightNum == 6 || weightNum == 7 || weightNum == 8){
		num = 5;
            }
            else if(weightNum == 9 || weightNum == 10 || weightNum == 11 || weightNum == 12){
		num = 5.75;
            }
            else if(weightNum == 13){
                num = 6.5;
            }
	}

        postage = num.toFixed(2);
    }

    return postage;
}