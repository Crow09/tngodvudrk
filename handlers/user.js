const pool = require('./_DBpool');

const list = (req, res)=>{
    let sql = `SELECT * FROM users`
    pool.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        res.render('user/list.html', {list:rows, user:req.session.user, href : "post"});
    })
}

const myPage = (req, res)=>{
    console.log(req.session.user);
    if(req.session.user !== undefined)
        res.render('user/myPage.html', {user:req.session.user, href : 'post'});
    else
    res.render('message.html', {msg:'로그인하세요.', user : req.session.user})
}

const update = (req, res)=>{
    if(req.body.password === req.session.user.pw){
        if(req.body.password === req.body.password2){
            let sql = `UPDATE users SET nick='${req.body.nick}' WHERE id='${req.session.user.id}'`;
            pool.query(sql, (err, rows, fields)=>{
                if(err) throw err;
                req.session.user.name = req.body.nick;
                res.redirect('/user/myPage');
            })
        }
        else
            res.render('message.html', {msg:'비밀번호와 재입력 비밀번호가 일치하지 않습니다.', user:req.session.user});
    }
    else
        res.render('message.html', {msg:'비밀번호가 일치하지 않습니다.', user:req.session.user});
}

const withdrawal = (req, res)=>{
    if(req.body.password === req.session.user.pw){
        if(req.body.password === req.body.password2){
            let sql = `DELETE FROM users WHERE id='${req.session.user.id}'`;
            pool.query(sql, (err, rows, fields)=>{
                if(err) throw err;
                req.session.destroy();
                res.render('message.html', {msg:'탈퇴되었습니다.', user : req.session.user});
            })
        }
        else
            res.render('message.html', {msg:'비밀번호와 재입력 비밀번호가 일치하지 않습니다.', user : req.session.user});
    }
    else
        res.render('message.html', {msg:'비밀번호가 일치하지 않습니다.', user : req.session.user});
}

module.exports = {
    list,
    myPage,
    update,
    withdrawal,
}