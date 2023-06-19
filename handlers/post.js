const pool = require('./_DBpool');
const getDate = (d) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const getTime = (d) => `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
const getDateTime = (d) => getDate(d) + ' ' + getTime(d);


const post = (req, res) => {
	let sql = `SELECT idPost, nick, title, postingDate FROM posts`;
	pool.query(sql, (err, rows, fields) => {
		if (err) throw err;
		console.log(rows);	
		res.render('post/postIndex.html', {user : req.session.user, posts : rows, href : "post"});
	})
}

const posting = (req, res) => {
	if (req.session.user !== undefined)
		res.render('post/posting.html', {user : req.session.user});
	else
		res.render('auth/signIn.html');
}

const postingProcess = (req, res) => {
	console.log("맛있는 아이디", req.session.user.id)
	let sql = `INSERT INTO posts (id, nick, title, detail, postingDate) VALUES ('${req.session.user.id}', '${req.session.user.nick}', '${req.body.title}', '${req.body.detail}', '${getDateTime(new Date())}')`;
	pool.query(sql, (err) => {
		if (err) throw err;
	})
	res.redirect('/post');
}

const postDetail = (req, res) => {
	let sql = `SELECT * FROM posts WHERE idPost = ${req.params.postId}`;
	pool.query(sql, (err, rows, fields) => {
		if (err) throw err;
		console.log("postDetail", rows[0]);
		if (rows[0] === undefined)
			res.redirect('/errors/notFound');
		else {
			let post = rows[0];
			sql = `SELECT * FROM comments WHERE idPost = ${req.params.postId}`
			pool.query(sql, (err, rows, fields) => {
				if (err) throw err;
				res.render('post/details.html', {user : req.session.user, post : post, comments : rows, href : "post"});
			})
		}
	})
}

const commentProcess = (req, res) => {
	console.log(req.body.commentDetail);
	console.log("글 번호는 ? ", req.body.postId);
	if (req.body.commentDetail === undefined)
		res.redirect(`/post/${req.body.postId}`);
	else {
		if (req.session.user !== undefined) {
			let sql = `INSERT INTO comments (idPost, id, nick, comment, commentDate) VALUES ('${req.body.postId}', '${req.session.user.id}', '${req.session.user.nick}', '${req.body.commentDetail}', '${getDateTime(new Date())}')`
			pool.query(sql, (err) => {
				if (err) throw err;
					res.redirect(`/post/${req.body.postId}`);
			})
		}
		else
			res.redirect('/auth/signIn');
	}
}

const postDelete = (req, res) => {
	console.log("글 번호는?", req.params.postId);
	if (req.session.user !== undefined) {
		let sql = `DELETE p, c FROM posts AS p INNER JOIN comments AS c ON p.idPost=c.idPost WHERE p.idPost=${req.params.postId}`;
		console.log(sql);
		pool.query(sql, (err) => { 
			if (err) throw err;
			console.log("deleted");
			res.redirect('/post');
		})
	}
	else
		res.redirect('/auth/signIn');
}

const commentDelete = (req, res) => {
	if (req.session.user !== undefined) {
		let sql = `SELECT idPost FROM comments WHERE idComment='${req.params.commentId}'`;
			pool.query(sql, (err, rows, fields) => {
				if (err) throw err;
				console.log(rows);
				sql = `DELETE FROM comments WHERE idComment='${req.params.commentId}'`;
				pool.query(sql, (err) => {
					if (err) throw err;
					console.log(rows[0]);
					res.redirect(`/post/${rows[0].idPost}`);
				})
			})
	}
	else
		res.redirect('/auth/signIn');
}

const postEdit = (req, res) => {
	if (req.session.user !== undefined) {
		let sql = `SELECT idPost, id, nick, title, detail, postingDate FROM posts WHERE idPost='${req.params.postId}'`;
		console.log("postEdit", sql);
		pool.query(sql, (err, rows, fields) => {
			if (err) throw err;
			if (rows[0] === undefined)
				res.redirect('/errors/notFound');
			else if (rows[0].id !== req.session.user.id) {
				res.redirect(`/post/${req.params.postId}`);
				console.log(req.params.postId);
			}
			else {
				res.render(`post/posting.html`, {user : req.session.user, edit : true, post : rows[0]});
			}
		})
	}
	else
		res.redirect('/auth/signIn');
}

const postEditProcess = (req, res) => {
	console.log(req.params.postId);
	if (req.session.user !== undefined) {
		let sql = `SELECT id FROM posts WHERE idPost=${req.params.postId}`;
		pool.query(sql, (err, rows, field) => {
			if (err) throw err;
			console.log(rows[0]);
			if (rows[0].id !== req.session.user.id)
				res.redirect(`/post/${req.params.postId}`);
			else {
				sql = `UPDATE posts SET title='${req.body.title}', detail='${req.body.detail}', postingDate='${getDateTime(new Date())}' WHERE idPost=?`;
				let value = `${req.params.postId}`;
				pool.query(sql, value, (err) => {
					if (err) throw err;
					res.redirect(`/post/${req.params.postId}`)
				})
			}
		})
	}
	else
		res.redirect(`/post/${req.params.postId}`);
}

const commentEditProcess = (req, res) => {
	if (req.session.user !== undefined) {
		console.log("commentinput:", req.body.commentInput);
		let sql = `UPDATE comments SET comment='${req.body.commentInput}', commentDate='${getDateTime(new Date())}' WHERE idComment='${req.body.commentId}'`;
		pool.query(sql, (err) => {
			if (err) throw err;
			res.redirect(`/post/${req.body.postId}`);
		})
	}
	else
		res.redirect(`/post/${req.body.postId}`);
}


module.exports = {
	post,
	posting,
	postingProcess,
	postDetail,
	commentProcess,
	postDelete,
	commentDelete,
	postEdit,
	postEditProcess,
	commentEditProcess,
}