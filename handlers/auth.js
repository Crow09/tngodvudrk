const pool = require('./_DBpool');
const getDate = (d) => `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
const getTime = (d) => `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
const getDateTime = (d) => getDate(d) + ' ' + getTime(d);

const signIn = (req, res)=>{
    if(req.session.user === undefined)
        res.render('auth/signIn.html');
    else
        res.redirect('/');
}

const signInProcess = (req, res)=>{
    let sql = `SELECT id, pw, nick FROM users WHERE id='${req.body.id}' AND pw='${req.body.password}'`;
    pool.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        console.log(rows);
        if(rows.length !== 0){
            req.session.user = {id : rows[0].id, pw : rows[0].pw, nick : rows[0].nick};
            let sql = `UPDATE users SET lastSignIn='${getDateTime(new Date())}' WHERE id='${req.session.user.id}'`;
            pool.query(sql, (err) => {
                if (err) throw err;
                res.redirect('/');
            })
        }
        else
            res.render('message.html', {msg:'아이디 혹은 비밀번호가 틀렸습니다'});
    })
}

const signOut = (req, res)=>{
    req.session.destroy();
    res.redirect('/');
}

const signUp = (req, res)=>{
    if(req.session.user === undefined)
        res.render('auth/signUp.html');
    else
        res.redirect('/')
}

const signUpProcess = (req, res)=>{
    if(req.body.password === req.body.password2){
        let sql = `SELECT id FROM users WHERE id='${req.body.id}'`;
        pool.query(sql, (err, rows, fields)=>{
            if(err) throw err;
            if(rows.length === 0){
                let sql = `INSERT INTO users (id, nick, pw, signUpDate, lastSignIn) VALUES (?,?,?,?,?)`;
                let values = [req.body.id, req.body.nick, req.body.password, 
															getDateTime(new Date()), getDateTime(new Date())];
                pool.query(sql, values, (err, rows, fields)=>{
                    if(err) throw err;
                    res.render('message.html', {msg:'가입을 환영합니다'})
                })
            }
            else
                res.render('message.html', {msg:'중복된 이메일이 있습니다'});
        })
    }
    else
        res.render('message.html', {msg:'비번이 서로 일치하지 않습니다'})
}

module.exports = {
    signIn,
    signInProcess,
    signOut,
    signUp,
    signUpProcess,
}