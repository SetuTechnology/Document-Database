const { getPosts } = require('./Post');
const { getTeam } = require('./TeamMember');

module.exports = async (req, res) => {
	const response = {
		teamMembers: [],
		posts: [],
	};
	try {
		response.teamMembers = await getTeam();
		response.posts = await getPosts();
	} catch (e) {
		console.log(e);
	}

	res.send(response);
};
