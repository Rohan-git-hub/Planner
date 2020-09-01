// requiring express from dependencies in package.json
const express = require('express');
// assigning port to our localhost on which our app will run
const port = 8080;
// requiring mongoose configuration
const db = require('./config/mongoose');
// requiring database schema
const Tasks = require('./models/tasks');
// requiring path for modularisation of our views folder 
const path = require('path');
// giving all functionality and modules of express to variable app
const app = express();
// setting up view engine to ejs collected from package.json
app.set('view engine', 'ejs');
// setting up the path to our ejs(HTML) file
app.set('views', path.join(__dirname, 'views'));
// using middleware for decoding the encoded data submitted by forms
app.use(express.urlencoded());
//  using static middleware and giving name of our directory in which our css and js is stored
app.use(express.static('makeover'));
// middleware for body parsing
app.use(express.json());
// declaring list of month for formatting the date
var months = ["Jan", "Feb", "March", "April", "May", "June", "July", 
"August", "September", "October", "November", "December"];
// a global variable for getting the id of doccument to be updated
let idup;
// first controller for showing our data at home page
app.get('/', function(req, res){
    // second variable tasks for accesing all the values in database
    // {} is sign for all in query for mongodb
    Tasks.find({}, function(err, tasks){
        // handling error
        if(err){
            console.log('error in loding data from planner database');
            return;
        }
        // returning response
        return res.render('index', {
            title:'Planner',
            todo:tasks  
         });
    })

});
// second controller for adding a new task
app.post('/add-task', function(req, res){
    // formatting date
    // *******START*******
    list = req.body.date.split('-');
    month = months[list[1]-1];
    day = list[2];
    year = list[0];
    finaldate = month+' '+day+','+year;
    // *******END**********
    // creating task with mongodb query
    Tasks.create({
        task: req.body.task,
        date: finaldate,
        category: req.body.category
    }, function(err, newTask){
        // error handling
        if(err){
            console.log('error in adding task to planner db');
            return;
        }
        // returning response
        console.log('*******************', newTask);
        return res.redirect('/');
    });
});
// third controller for assigning value to idup for future use
app.get('/id-update',function(req, res){
    idup = req.query.id;
    return res;
})
// fourth controller for updating task
app.post('/update-task', function(req, res){
    let id = idup;
    // formatting date
        list = req.body.dateup.split('-');
        month = months[list[1]-1];
        day = list[2];
        year = list[0];
        finaldateup = month+' '+day+','+year;
        // mongodb query for updation
        let updates = {
            task: req.body.taskup,
            category: req.body.categoryup,
            date: finaldateup
        }
        // main mongodb command to update with the help of query
        Tasks.findByIdAndUpdate(id, updates, function(err, result){
            if(err){
                // error handling
                console.log('error in updating task');
                return;
            }
            // returning response
            console.log("****************", result, req.body);
            return res.redirect('/');
        });
})
// fifth controller for deleting the task
app.post('/delete-task', function(req, res){
    // storing object id "_id" in variable id
        let id = req.body.id;
        // delete many command in case user selected two or more tasks
        Tasks.deleteMany({_id: {$in: id}}, function(err){
            if(err){
                // error handling
                console.log('error in deleting the task');
                return;
            }
            // returning response
            return res.redirect('/');
});
});
// listening on port 8080 for any requests made by browser to localhost:8080
app.listen(port, function(err){
    if(err){
        // error handling
        console.log('Error in running the server', err);
    }
    // printing success message to console
    console.log('My Express server is up and running on port: ', port);
});