import {
  AsyncStorage
} from 'react-native';

import * as firebase from 'firebase';

let moment = require('moment');

const configurationOptions = {
  debug: true
};

const firebaseConfig = {
    apiKey: "AIzaSyCAWhmE_E1EmkyLhIGFY54fve2U4o0ZiKs",
    authDomain: "dailychallenge-19a5c.firebaseapp.com",
    databaseURL: "https://dailychallenge-19a5c.firebaseio.com",
    projectId: "dailychallenge-19a5c",
    storageBucket: "dailychallenge-19a5c.appspot.com",
    messagingSenderId: "200123959118"
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

let _ = require('lodash');

const defaultQuestions = [{
    Id: 1,
    Title: "Photo Challenge",
    Image: "http://lorempixel.com/400/200/",
    Content: "Take a photo a day on your way to work. Spend time and make it beautiful.",
    Extra: "Publish it on social media"
}, {
    Id: 2,
    Title: "Compliment Challenge",
    Image: "http://lorempixel.com/400/200/",
    Content: "Give a random person a compliment about how they look today",
    Extra: "Make it personal"
}];


export default {
    firebase: function() {
        return database;
    },
    init: async function() {
        let ref = await database.ref('/questions');
        let snapshot = await ref.once('value');
        if(!snapshot.val()) {
            _.each(defaultQuestions, async (question) => {
                await ref.push(question);
            });
            return ref;
        }
        return ref;
    },
    restart: async function() {
        return await AsyncStorage.clear();
    },
    answeredQuestions: async function() {
        let answeredQuestions = await AsyncStorage.getItem('answeredQuestions');
        if(!answeredQuestions) {
            answeredQuestions = [];
        } else {
            answeredQuestions = JSON.parse(answeredQuestions);
        }
        return answeredQuestions;
    },
    saveQuestion: async function(question) {
        let answeredQuestions = await AsyncStorage.getItem('answeredQuestions');
        if(!answeredQuestions) {
            answeredQuestions = [];
        } else {
            answeredQuestions = JSON.parse(answeredQuestions)
        }
        answeredQuestions.push(question);
        await AsyncStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
        return await AsyncStorage.setItem('currentQuestion', JSON.stringify(question))
    },
    getRandomQuestion: async function() {
        let answeredQuestions = await AsyncStorage.getItem('answeredQuestions');
        let currentQuestion = await AsyncStorage.getItem('currentQuestion');
        if(!answeredQuestions) {
            answeredQuestions = [];
        } else {
            answeredQuestions = JSON.parse(answeredQuestions);
        }
        if(currentQuestion) {
            currentQuestion = JSON.parse(currentQuestion);
            let now = moment();
            let dt = moment(currentQuestion.date).endOf('day');
            if(now.diff(dt, 'seconds') > 0) {
                currentQuestion = null;
                await AsyncStorage.removeItem('currentQuestion');
            }
        }
        let snapshot = await database.ref('/questions').once('value');
        let questions = snapshot.val();

        if(currentQuestion) {
            return currentQuestion;
        } else {
            if(answeredQuestions.length === 0) {
                let currentQuestion = _.sample(questions);
                if(currentQuestion) {
                    currentQuestion.date = moment().toISOString();
                    await AsyncStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
                    return currentQuestion;
                } else {
                    return null;
                }
            } else {
                let ids = _.map(answeredQuestions, 'Id');
                let remainingQuestions = _.filter(questions, (question) => {
                    return question && ids.indexOf(question.Id) == -1;
                });
                if(remainingQuestions.length > 0) {
                    let currentQuestion = _.sample(remainingQuestions);
                    if(currentQuestion) {
                        currentQuestion.date = moment().toISOString();
                        await AsyncStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
                        return currentQuestion;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            }
        }
    },
    getQuestions: async function() {
        let answeredQuestions = await AsyncStorage.getItem('answeredQuestions');
        if(!answeredQuestions) {
            answeredQuestions = [];
        } else {
            answeredQuestions = JSON.parse(answeredQuestions);
        }
        let snapshot = await database.ref('/questions').once('value');
        let questions = snapshot.val();
        return {
            answeredQuestions: answeredQuestions,
            questions: questions
        }
    },
    cheatNextQuestion: async function() {
        await AsyncStorage.removeItem('currentQuestion');
        return true;
    }
}