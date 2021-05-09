const Employee = require('../models/Employee')

const index = (req, res, next) => {
      Employee.find()
      .then(response => {
      	res.json({
      		response
      	})
      })
      .catch(error => {
      	res.json({
      		message: 'An error occured!'
      	})
      })
}

const show = (req, res, next) => {
	let employeeID = req.body.employeeID
	Employee.findById(employeeID)
	.then(response => {
		res.json({
			response
		})
	})
	.catch(error => {
		res.json({
			message: 'An error occured!'
		})
	})
}

const store = (req, res, next) => {
	let employee = new Employee({
		username: req.body.username,
		comment: req.body.comment,
		password: req.body.password
	})
    if(req.files){
    	let path = ''
    	req.files.forEach(function(files,index,arr) {
    		path = path + files.path + ','
    	})
    	path = path.substring(0, path.lastIndexOf(","))
    	employee.avatar = path
    }
	employee.save()
	.then(response => {
		req.flash(
		  'success_msg',
		  'Commented Successfully'
		);
		res.redirect('/index');
	  })
	.catch(error => {
		res.json({
			message: 'An error occured!'
		})
	})
}


const update = (req, res, next) => {
	let employeeID = req.body.employeeID

	let updatedData = {
		username: req.body.username,
		comment: req.body.comment,
		password: req.body.password
	}

	Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
	.then(() => {
		res.json({
			message: 'Employee updated Successfully!'
		})
	})
	.catch(error => {
		res.json({
			message: 'An error occured!'
		})
	})
}


const destroy =(req, res, next) => {
	let employeeID = req.body.employeeID
	Employee.findByIdAndRemove(employeeID)
	.then(response => {
		req.flash(
		  'success_msg',
		  'Deleted Successfully'
		);
		res.redirect('/index');
	  })
	.catch(error => {
		res.json({
			message: 'An error occured!'
		})
	})
}

module.exports = {
	index, show, store, update, destroy
}
