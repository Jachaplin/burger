var connection = require('../config/connection.js');

//OBJECT RELATIONAL MAPPER (O.R.M)
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}

function objToSql(ob) {
    //COLUMN=VALUE, COLUMN2=VALUE2,....
    var arr = [];

    for (var key in ob) {
        if (ob.hasOwnProperty(key)) {
            arr.push(key + '=' +  ob[key]);
        }
    }

    return arr.toString();
}
// Object for all our SQL statement functions.
var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  // },
  
  // delete: function(table, condition, cb) {
  //       var queryString = 'DELETE FROM ' + table;

  //       queryString = queryString + ' WHERE ';
  //       queryString = queryString + condition;

  //       console.log('\nQuery:', queryString);
  //       connection.query(queryString, function(err, result) {
  //           if (err) throw err;
  //           cb(result);
  //       });
    }   
};

module.exports = orm;