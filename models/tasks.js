// requiring mongoose same instabce as of mongoose.js in config
const mongoose = require('mongoose');
// creating schema for our collection in planner_db
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    date: {
        // date type is string beacause the date to be dispalyed in month day,year format
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});
// giving name to our collection and storing it in const Tasks to export it 
const Tasks = mongoose.model('Tasks', taskSchema);
// exporting Tasks as a module to be used in index.js
module.exports = Tasks;