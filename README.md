# <h1>CS 4400 Phase 4 Project!</h1>

<h3>Instructions on how to run</h3>
**Ensure you have some version of node js installed on your machine** <br>
<br>
1. Download the files and load into IDE. <br>
2. run 'npm i' in terminal in the root directory of the app to install all necessary dependencies. <br>
3. cd into server directory using 'cd server' and run 'npm i' to install all necessary dependencies. <br>
4. While in server directory, run 'node mysql' to start up the express server that connects to the mysql localhost. <br>
5. Return to root directory with 'cd ..' and then run 'npm run dev' <br>
6. You can now run local host and do all flight tracking procedures from the browser!

<br> <br>
<h3>How to view tables</h3>
<br>
go to http://localhost:5000/?table={TABLENAME} 
<br> **omit curly braces when putting in the name**
<br> NOTE: the table name must match what has been provided in the SQL table
<br>
<br>
<h3>How to use website</h3>
Simply select the procedure you want to use and fill in the necessary (valid) data into the input boxes. When you click the submit button, you will be prompted of the status of the update. If the update is successful, you will see the results reflected in the tables when you view them at http://localhost:5000/?table={TABLENAME} 

<br><br>
<h3>Technologies used</h3>
We used ReactJS, nodeJS, express, and mysql workbench. ReactJS was for the front end and this was done in typescript for type safety. Express was used in the backend to handle routing when the user made an api call to call a procedure. Node just connects it all together with javascript. 
<br><br>
<h3>Distribution of work</h3>
Julian was responsible for the UI portion in react as he has experience in that. Sami and Vania were in charge of cleaning up the phase III SQL file and making sure all of the queries were properly tested within the app and had appropriate error handling. 
