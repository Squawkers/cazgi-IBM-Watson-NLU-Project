const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-08-01',
        authenticator: new IamAuthenticator({
        apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities': {
            'emotion': true,
            'limit': 1
            }
        }
    };
    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(emotionResults => {
            console.log(emotionResults);
            console.log(JSON.stringify(emotionResults.result.entities.document.emotion,null,2));
            return res.send(emotionResults.result.entities.document.emotion,null,2);
        })
    .catch(err => {
        return res.send("Error: Could not Analyze Emotion!" + err);
    });
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'entities' : {
            'sentiment': true,
                'limit': 1
            }
        }
    };
    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(sentimentResults => {
            console.log(sentimentResults);
            console.log(JSON.stringify(sentimentResults.result.entities.document.sentiment,null,2));
            return res.send(sentimentResults.result.entities.document.sentiment,null,2);
        })
    .catch(err => {
        return res.send("Error: Could not Analyze Sentiment!" + err);
    });
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.text,
        'features': {
            'entities': {
            'emotion': true,
            'limit': 1
            }
        }
    };
    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(emotionResults => {
            console.log(emotionResults);
            console.log(JSON.stringify(emotionResults.result.entities.document.emotion,null,2));
            return res.send(emotionResults.result.entities.document.emotion,null,2);
        })
    .catch(err => {
        return res.send("Error: Could not Analyze Emotion!" + err);
    });    
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.text,
        'features': {
            'entities' : {
            'sentiment': true,
                'limit': 1
            }
        }
    };
    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(sentimentResults => {
            console.log(sentimentResults);
            console.log(JSON.stringify(sentimentResults.result.entities.document.sentiment,null,2));
            return res.send(sentimentResults.result.entities.document.sentiment,null,2);
        })
    .catch(err => {
        return res.send("Error: Could not Analyze Sentiment!" + err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

