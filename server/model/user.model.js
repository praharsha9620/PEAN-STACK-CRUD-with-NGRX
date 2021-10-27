module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('usertable', {
	  name: {
		type: Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  password: {
		  type: Sequelize.STRING
	  }
	});

	return User;
}
