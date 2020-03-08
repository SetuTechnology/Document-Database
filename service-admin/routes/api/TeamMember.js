exports.getTeam = async () => {
	const keystone = require('keystone');
	const TeamMember = keystone.list('TeamMember').model;

	return await TeamMember.find({});
};
