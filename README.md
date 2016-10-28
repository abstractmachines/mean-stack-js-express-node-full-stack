
The Vertical MEAN Slice
=======
# Deploying an Express Node app to AWS :

## An app created for my simple educational purposes for full MEAN stack development.

## There is no magic. There's only software.

### Requirements + Overview:
Make a vertical slice of a full stack application without using too many "magical abstractions". In this way, gain a better understanding of the details of full stack application, sans reliance on "magic."

#### Tools you can use:
- Node, npm
- bash
- ssh
- scp
- process (whatever runs a service of your choice, usually Ubuntu's upstart)
- AWS Ubuntu instance

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

8. Deploy on AWS Linux Ubuntu EC2 VM instance. Use nginx. Install all related software by hand using Debian distribution's package manager tools apt-get. Spin up a service by hand on the AWS EC2 Ubuntu instance using upstart daemon.

9. Set and manage users and permissions on EC2 instance. Your deploy user cannot be a sudo-er. You want to restrict permissions and be conservative. All users should be logging in with public/private keys, not with passwords. To do this, you will need to work with nginx's conf files to temporarily enable password logins to set the proper public/private keys.

10. the npm script
    	$ npm run deploy
will deploy changes.



Final note: public IP and curl results for AWS:

      $  curl -X POST -d
			name=GobBluthBeesHowHardCanItBe
			 http://54.148.122.112:5001/foo
			 -H "Content-Type: text/plain"

Response received:

			name=GobBluthBeesHowHardCanItBe

<strong>
Success!</strong>

Next step: MONGO.
