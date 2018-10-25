#  Ethereum Vote Project
SB Admin 2(bootstrap template(free)) + Node.js + mongoDB



## Getting Started  ( for developers )

#### 1. Install node.js

Install and start node.js. (https://nodejs.org/download)

	$ node --version

#### 2. Install Git & Tortoisegit Client

Install Git. (https://git-scm.com)

       Windows
         Install Git
	 
Install Tortoisegit Client. (https://tortoisegit.org/)

       Windows
         Install Tortoisegit

#### 3. Clone Ethereum Vote Project

    Unix
	$ git clone https://github.com/CODEOFPENGUIN/ether-vote.git
	
    Windos
        폴더 우클릭 Git Clone
![tortoisegit](https://user-images.githubusercontent.com/16829499/47509301-ceca2c80-d8b0-11e8-8a58-4d7e9463ca7c.png)
	
	Git Clone
![tortoisegit2](https://user-images.githubusercontent.com/16829499/47509304-d093f000-d8b0-11e8-83fb-4daf5f80a329.png)
	
	$ cd ether-vote
	$ mkdir -p data
	$ mkdir -p log
	$ npm install

#### 4. Install mongoDB

Install and start mongoDB. (http://www.mongodb.org) 

    Unix
	$ cd mongodb
	$ bin/mongod --dbpath ether-vote/data &

    Windows
	경로 ether-vote 안에 data/log 폴더 선택 (EX: c:\ether-vote\data)
   ![mongo1](https://user-images.githubusercontent.com/16829499/47505707-9ecb5b00-d8a9-11e8-8ea8-d8005bf8ec10.PNG)
        
	설치 uncheck
   ![mongo2](https://user-images.githubusercontent.com/16829499/47506222-9b849f00-d8aa-11e8-838c-250452804917.PNG)	
	
	설치 완료 후에는 Service 자동 시작

#### 5. Install Truffle & Ganache

Install Truffle Framework. (https://truffleframework.com)

    $ npm install truffle -g

Install Ganache. (https://truffleframework.com/ganache)
    
	windows
	  ![ganache](https://user-images.githubusercontent.com/16829499/47507957-25823700-d8ae-11e8-920f-73f37db92caa.PNG)
	  
	Ganache 실행

#### 6. Install Visual Studio Code

Install Visual Studio Code. (https://code.visualstudio.com/)

#### 7. Truffle Compile

Compile Smart Contract.
  
    $ cd ether-vote
	$ cd truffle
	$ truffle.cmd compile
	$ truffle.cmd migrate --reset

#### 8. Start Ethereum Vote Project

	$ cd ether-vote
	$ npm run start

#### 9. Start development

	http://localhost:3000

## License
MIT


