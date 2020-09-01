// requiring mongoose from dependencies in package.json
const mongoose = require('mongoose');
// connecting to planner_db
mongoose.connect('mongodb://localhost/planner_db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// initiating connection
// handling new deprications
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const db = mongoose.connection;
// error handling and printing
db.on('err', console.error.bind(console, 'error connecting to db'));
// once connection is successfull printing success message
db.once('open', function(){
    console.log('Successfully connected to Planner database');
});