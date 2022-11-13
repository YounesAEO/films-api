import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
			// lowercase: true,
			// trim: true,
		},

		firstName: {
			type: String,
			trim: true,
			default: '',
		},
		lastName: {
			type: String,
			trim: true,
			default: '',
		},
		password: {
			type: String,
			required: true,
		},
		profilePic: {
			type: String,
			trim: true,
			default: '',
		},
		favFilms: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
		},
	},
	{ timestamps: true }
);

userSchema.statics.findByLogin = async function (login) {
	let user = await this.findOne({
		username: login,
	});

	if (!user) {
		user = await this.findOne({ email: login });
	}

	return user;
};

// userSchema.pre('remove', function (next) {
// 	this.model('Film').deleteMany({ user: this._id }, next);
// });

const User = mongoose.model('User', userSchema);

export default User;
