
The Vertical MEAN Slice
=======
# Deploying an Express Node app to AWS :

## An app created for my simple educational purposes for full MEAN stack development.

## There is no magic. There's only software.

### Requirements + Overview:
Make a vertical slice of a full stack application without using too many "magical abstractions". In this way, gain a better understanding of the details of full stack application, sans reliance on "magic."

#### Tools you can use:
- Node, npm
- AWS Ubuntu instance
- nginx
- bash
- ssh
- scp
- process (whatever runs a service of your choice, usually Ubuntu's upstart)


#### Tools you can not use:
- pm2
- capistrano
- Node's ForeverJS
- Heroku

Hand out a public IP which can be hit with a curl request.

1. Make a single-file express app.

2. Return a hardcoded bit of text in response to a curl. *re: app.js code and comments*

3. Explain how request/response works. *re: app.js code and comments*

4. Create custom HTTP headers as needed with proper MIME types for the plaintext request you're making.

5. Clustering, "load balancing" emulation, server instances, and using ports. Connecting to an app's endpoint. (Parameterize the application.) *re: app.js code and comments*

6. Post to service via curl. Change/alter HTTP headers as necessary using proper MIME types. (Use express' body-arser middleware.) *re: app.js code and comments*

7. Recreate that process with a bash script to fire up Node; compare program exit codes with conditionals, and capture the output of the command in a variable. *re: verifyscript.sh*

8. Deploy on AWS Linux Ubuntu EC2 VM instance.
<br><br> This will involve setting up the virtual Ubuntu machine (14.04) using the AWS Console as well as selecting appropriate security groups. This will also involve setting up a new or existing key pair for secure SSH. Server user administration should not involve logging in with a password; instead, allow users access via their keys, and remove their access by removing their keys. Once an AWS EC2 Ubuntu instance is up and running, you can install desired software using appropriate package management tools, as follows.

Getting started on AWS EC2 Ubuntu will involve downloading your private key keyname.pem, putting it in:
```
~/.ssh/keyname.pem
```
Changing the permissions using chmod so that your private key isn't publicly available:
```
$ chmod 400 /path/to/keyname.pem
```
Shelling in using optarg -i for identity. Note that for Amazon EC2 Ubuntu instances, the  username will not be *user* like the AMI AWS instances; rather, it will be *ubuntu*.
```
$ ssh -i /path/to/keyname.pem user@AWSpublicDNS
```
Scp a file to user's home ~/. Note that we aren't using rsync at this time.
```
$ scp -i /path/to/keyname.pem /path/file.txt user@AWSpublicDNS:~
```
User management follows in "step 3" of AWS process documented here. You don't want users to have to have your private key to login, of course. You'll also note that we have a "deploy user" for purposes of this simple Vertical Slice full stack app, but generally <strong>Jenkins</strong> or a similar continuous integration solution would deploy, not a user.

 <strong>Once you're set up and have AWS Access:

 <strong>First you have to install Node: </strong> <br>
I chose to install Node on AWS using nvm instead of using Debian's apt-get package manager to install Node. That's because nvm helps you manage specific versions of Node on a per-project basis. As with all npm-related projects, the point of a per-project package manager includes project-directory installations of software packages/versions *instead of global installs.*

		 $ nvm script
		// To verify installed version:
		$ command -v nvm
		// Install the version you want:
		$ nvm install 4.2.3
		// To specify version in nvmrc file for THIS project directory (remember that one of the points of using npm is to manage packages PER project, and that's why global installs are something to watch out for and often avoid:) From project root dir:
		$ echo "4.2.3" > .nvmrc
		// Now, to USE that Node version:
		$ nvm use

 <strong>Second, you'll need to install a web server. I chose nginx instead of Apache or other options, and I installed it using Debian (Ubuntu) Linux's distribution's package manager tools apt-get. </strong> The point here is that we are managing our own installations rather than always using installers providers give us. It's always best to spin things up by hand so you learn the underlying logic/tech. MAGIC BAD.

		$ apt-get install nginx // or similar
		// you can start and stop nginx signals as such:
		$ sudo service yourappdirectory start
		$ sudo nginx -s reload

 Note that with the above, yourappdirectory will read nodeapp for us in the future.

  <strong>Third, you have to set up the proper users, groups, and permissions. </strong>
	 Set and manage shell users and permissions on EC2 instance. Your deploy user cannot be a sudo-er. You want to restrict permissions and be conservative.

	 Recall permissions are in binary/hex as such. Here is an example of our users group being able to read, write and execute, and everyone else can just read:
```
User 'u'    Group 'g'    Others 'o'
r w x        r - -      r - -
1 1 1        1 0 0      1 0 0
  7            4          4
```


<strong>All users should be logging in with public/private keys, not with passwords.</strong>

To do this, you will need to work with nginx's <strong>sshd_config</strong> file to:
 1. temporarily enable password logins (change "no" to "yes") to set the proper public/private keys by
 2. copying the keys from local to AWS via  <strong>ssh-copy-id.</strong>
 3. Once you're done setting up keys and access on the server, ensure that you disable password authentication (change it to no in aforementioned server settings).
 4. Try it out, you should be able to shell in without passwords.
 5. Note that the <strong>USER GROUP for your deploy user,</strong> and it should be in the <strong> same user group as www-data.</strong>

	Set permissions as required, and remember, permissions are conservative, and restricted.

	 Here are some details on the user management I did:

	To see what users are on Debian:


		 $ cat /etc/passwd


<strong>To add a user,</strong> You can use the commands <strong>useradd</strong> or <strong>adduser.</strong> *"On Debian, administrators should usually <strong>use adduser(8)</strong> instead"* (http://askubuntu.com/questions/345974/what-is-the-difference-between-adduser-and-useradd). We will make a new user for GOB Bluth.


		$ sudo adduser gobbluth


Check the user group.


```
		$  id gobbluth
```

  Add user to appropriate group. It involves something like this: ' sudo -a -G groupname username'... the options -a -G ADDS a user to a Group. http://www.howtogeek.com/50787/add-a-user-to-a-group-or-second-group-on-linux/.
```
$ sudo groupadd newGroupName

$ sudo -aG newGroupName gobbluth
```
For example, to make a user a sudoer:
```
$ sudo groupadd newGroupName

$ sudo -a -G newGroupName gobbluth

// check your work:
$ id gobbluth
// should say gobbluth is a sudoer.
```

Another example, to make a user belong to the same group that www-data belongs to in order to create appropriate deployment permissions for our deploy user:
```
$ id www-data
uid=33(www-data) gid=33(www-data) groups=33(www-data)

$ sudo -a -G www-data gobbluth
// check your work:
$ id gobbluth
// should say gobbluth is a member of www-data group!
```

After you add a user and group, set a password for that user, and add the user to the appropriate group, you'll need to copy the public key for that user to the authorized keys directory for that user. *Check back with the numbered list items for user management above to ensure you went through all the steps. If you want another user to assume deploy, you'll have to copy that user's public key into the authorized_keys file for that user. Note that we normally wouldn't have a user deploying code, we'd use Jenkins or similar CI.*

<strong>Fourth, you have to spin up a service by hand on the AWS EC2 Ubuntu instance using upstart daemon, make it executable, and set the proper Linux run levels. Of course, a sudoer must complete all of these tasks, not your deploy user. You're replacing the start-at-boot init.d daemon with one of your own!</strong>

Create the conf file: Where nodeapp is the name of your app's directory:

 		/etc/init/nodeapp.conf


Make it executable for the user group containing the www-data and your deploy users:

```
$ chmod u+x conf-file // similar to this
```


 Set the proper Linux runlevels. Odd levels are for shutdown-related stuff, and even levels are for startup-related stuff. You'll also need to  setuid to your deploy user and set the proper directory :

 		///etc/init/nodeapp.conf FILE:

		description "my rad daemon"
		author "Amanda Falke"

		start on runlevel[2345]
		stop on runlevel[016]
		respawn

		setuid deploy
		chdir /home/sudousername/yourappdirectory
		exec node app.js


Reboot the web server:  

```
 $ sudo nginx -s reload
```

Spawn the daemon:   

```
$ sudo service nodeapp start
```


The npm script

```
$ npm run deploy
```

will deploy changes. Make sure that you don't follow the standard "npm" instructions of placing your binary, also known as deployscript.sh or scpscript.sh, in project_root/node_modules/.bin/scpscript.sh, along with "scripts": { "deploy": "scpscript.sh" } because *node_modules is git-ignored.* So place that script in project root, "scripts": { "deploy": "./scpscript.sh" }

And test this by cloning into a new directory, pulling down changes, and running npm run deploy. Should be successful.


# Final result: public IP and curl results for AWS:

```
$  curl -X POST -d
name=GobBluthBeesHowHardCanItBe
http://54.148.122.112:5001/foo
-H "Content-Type: text/plain"
```

Response received:

```
name=GobBluthBeesHowHardCanItBe
```

Success!

Next step: MONGO.

### Clarifications/to investigate later:
#### nginx
Sudoer creates nginx conf file with env PORT = 5100, this may remove paramaterization of ports which conflicts with existing program.
