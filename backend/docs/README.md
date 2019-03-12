#### INSTALLATION

**Prerequisite:**

- Python 3.*
- MySql
- pip

**In order to install the project:**
   1.  
   If you have both python2 and python3 installed, you can execute  
   > $ alias python=python3 
   
   in order to use python3 in every commands, you can unalias by executing  
   > $ unalias python  
   
   or you can use python3 instead of python to execute the program  

   2.   
   cd to backend folder
   > $ cd project/backend  
   
   (optional) create and activate virtual environment  
   > $ pip3 install -r requirements.txt  

   3.
   In case pip failed to find mysql library, you can execute  
   > $ export DYLD_LIBRARY_PATH=”$DYLD_LIBRARY_PATH:<PATH_TO_MYSQL_LIB>  
   
   default is:
   > $ export DYLD_LIBRARY_PATH=”$DYLD_LIBRARY_PATH:/usr/local/mysql/lib/  
   
   in order to tell dynamic linkers where to look for mysql libraries  


#### CONFIGURATIONS  

1.      
Inside the directory backend/configurations is where all the configuration files are  
(there are local, dev, test, staging, and prod)  
Edit the config file according to your working environment  

**NOTE:**
- the program will delete existed data in the database DB_NAME, so please be careful     
- the program will not work if your database doesn't exist, please create it beforehand   

2.      
DEFAULT_CATEGORY is the name of your default category that hold all items that don't belong to any category, please change it if you wish, but it can't be None    

3.
Inside the folder backend/ is a file secret_key.py.   
This file hold the secret key used to decode your data.   
Please change it accordingly, but do NOT post it anywhere or give it to anyone.   

4.
In order to run the app, cd to backend/ folder and execute:
> $ ENV=YOUR_ENVIROMENT python app.py   

where YOUR_ENVIROMENT is in ['local', 'dev', 'test', 'staging', 'prod']

For example, if your working environment is development, execute:
> $ ENV='dev' python app.py

If you don't set ENV variable, or ENV is not recognized, the default ENV is 'local'


#### TESTING

Inside the folder backend/ is the folder tests/, in which there are unit tests for each unit of the project   

In order to test, cd inside folder backend and execute:   
> $ python -m pytest tests
