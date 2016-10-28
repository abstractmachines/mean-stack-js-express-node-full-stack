
The Vertical MEAN Slice
=======
# Deploying an Express Node app to AWS :

## An app created for my simple educational purposes for full MEAN stack development.

### requirements:
Make a vertical slice of a full stack application without using too many "magical abstractions". Do not use pm2 or capistrano or Node's ForeverJS or Heroku; instead, spin up a service by hand on the AWS EC2 Ubuntu instance using upstart daemon; deploy everything by hand, and remove the "magic" abstraction from full stack development.

1. Make a single-file express app.
2. Return a hardcoded bit of text in response to a curl.
3. Explain how request/response works.
4. Create custom HTTP headers as needed with proper MIME types for the plaintext request you're making.
5. Clustering, "load balancing" emulation, server instances, and using ports. Connecting to an app's endpoint. (Parameterize the application.)
6. Post to service via curl. Change/alter HTTP headers as necessary using proper MIME types. (Use express' body-arser middleware.)
7. Recreate that process with a bash script to fire up Node; compare program exit codes with conditionals, and capture the output of the command in a variable. re: verifyscript.sh
8. Deploy on AWS Linux Ubuntu EC2 VM instance. Use nginx. Install all related software by hand using Debian distribution's package manager tools apt-get.
9. Set and manage users and permissions on EC2 instance. Your deploy user cannot be a sudo-er. You want to restrict permissions and be conservative. All users should be logging in with public/private keys, not with passwords. To do this, you will need to work with nginx's conf files to temporarily enable password logins to set the proper public/private keys.
