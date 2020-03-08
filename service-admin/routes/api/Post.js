exports.getPosts = async () => {
	const keystone = require('keystone');
	const Post = keystone.list('Post').model;

	return await Post
		.find({
			state: 'published',
		})
		.populate('categories')
		.populate('author');
};
