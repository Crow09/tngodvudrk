"\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -uroot -p1234

create schema noticeBoard;
use noticeBoard;

create user 'noticeBoard'@'%' identified by '1234';
grant all privileges on noticeBoard.* to 'noticeBoard'@'%';

CREATE TABLE users (
      idUser       INT NOT NULL AUTO_INCREMENT,
      id            VARCHAR(16) NOT NULL,
      nick          VARCHAR(8) NOT NULL,
      pw            VARCHAR(16) NOT NULL,
      signUpDate      TIMESTAMP NOT NULL,
      lastSignIn     TIMESTAMP NOT NULL,
      PRIMARY KEY(idUser));

INSERT INTO users (id, nick, pw, signUpDate, lastSignIn) 
      VALUES ('leegangbin123', '이강빈', '1234', '2023-03-02 14:44:44', '2023-04-05 14:44:44');
INSERT INTO users (id, nick, pw, signUpDate, lastSignIn) 
      VALUES ('jowonjae123', '조원재', '1234', '2023-03-02 14:44:44', '2023-04-05 14:44:44');
INSERT INTO users (id, nick, pw, signUpDate, lastSignIn) 
      VALUES ('hwiseong18', '휘성18', '1234', '2023-03-02 14:44:44', '2023-04-05 14:44:44');

CREATE TABLE posts (
      idPost        INT NOT NULL AUTO_INCREMENT,
      id            VARCHAR(16) NOT NULL,
      nick          VARCHAR(8) NOT NULL,
      title         VARCHAR(16) NOT NULL,
      detail        LONGTEXT NOT NULL,
      postingDate   TIMESTAMP NOT NULL,
      PRIMARY KEY(idPost));

INSERT INTO posts (id, nick, title, detail, postingDate)
      VALUES ('admin', '관리자', '공지사항', '테스트용 게시글입니다.', '2023-06-12 15:08:30');

CREATE TABLE comments (
      idComment     INT NOT NULL AUTO_INCREMENT,
      idPost        INT NOT NULL,
      id            VARCHAR(20) NOT NULL,
      nick          VARCHAR(16) NOT NULL,
      comment       VARCHAR(500) NOT NULL,
      commentDate   TIMESTAMP NOT NULL,
      PRIMARY KEY(idComment));

INSERT INTO comments (idPost, id, nick, comment, commentDate)
      VALUES (1, 'admin', '관리자', '테스트용 댓글입니다.', '2023-07-12 12:12:12');