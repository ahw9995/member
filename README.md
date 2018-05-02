# members
node.js에서 express와 mongodb를 가지고 api를 구현한 샘플 코드
환경설정은 MacOS/linux 기준임.

mongodb 설치
1. brew install mongodb
  1) 만약 homebrew가 없다면
  2) Ruby -e “$(curl -fsSL https://raw.github.com/mxcl/homebrew/go/install)”
2. mkdir -p /data/db
3. sudo chown $USER/data/db
4. mongodb 실행
  1) mongod


데이터베이스(database) 및 컬렉션(collection) 생성
1. use DATABASE_NAME
  1) use PICSELL (소스코드 기준)
2. db.createCollection("COLLECTION_NAME")
  1) db.createCollection("memberschemas")


소스코드 설치
1. git clone https://github.com/ahw9995/members.git
2. 다운로드 받은 폴더로 이동
3. npm install
4. mongodb 실행(mongod)
5. node app.js


테스트 툴
1. 크롬 Postman(https://www.getpostman.com/)
