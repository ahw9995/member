# node.js, express, mongodb를 가지고 api를 구현한 샘플 코드

- 환경설정은 MacOS/linux 기준임.


- mongodb 설치
  - brew install mongodb
    - 만약 homebrew가 없다면
    - Ruby -e “$(curl -fsSL https://raw.github.com/mxcl/homebrew/go/install)”
- mkdir -p /data/db
- sudo chown $USER/data/db
- mongodb 실행
  - mongod


- 데이터베이스(database) 및 컬렉션(collection) 생성
  - use DATABASE_NAME
    - use PICSELL (소스코드 기준)
- db.createCollection("COLLECTION_NAME")
  - db.createCollection("members")


- 소스코드 설치
  - git clone https://github.com/ahw9995/members.git
  - 다운로드 받은 폴더로 이동
  - npm install
  - mongodb 실행(mongod)
  - node app.js


- 테스트 툴
  - 크롬 Postman(https://www.getpostman.com/)
