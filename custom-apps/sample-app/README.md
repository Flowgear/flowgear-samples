## Available Scripts

In the project directory, you can run:

### `npm install`

This downloads the missing packages to a node_modules folder within the project.

### `npm start`

Runs the app in the development mode.\
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Configure ssl for localhost

1. Create an openssl.conf file:

	[req]\
	default_bits = 2048\
	default_keyfile = privkey.key\
	encrypt_key = no\
	utf8 = yes\
	distinguished_name = req_distinguished_name\
	x509_extensions = v3_req\
	prompt = no\

	[req_distinguished_name]\
	C = ZA\
	ST = Gauteng\
	L = Johannesburg\
	O  = Company\
	CN = localhost

	[v3_req]\
	keyUsage = critical, digitalSignature, keyAgreement\
	extendedKeyUsage = serverAuth\
	subjectAltName = @alt_names

	[alt_names]\
	DNS.1 = localhost

2. Install openssl:\
	Windows	- If you have chocolatey installed you can install openssl via a command: choco install openssl\
		- In case you have Git installed, you can open the Git Bash (shift pressed + right click in the folder -> Git Bash Here) and use openssl command right in the Bash\
	macOS - If you have brew installed you can install openssl via a command: brew install openssl

3. Run this comand via openssl:\
	openssl req -x509 -sha256 -nodes -days 3650 -newkey rsa:2048 -keyout app.key -out app.crt -config openssl.conf

4. Create .env in project directory with following structure:\
	HTTPS=true\
	SSL_CRT_FILE=/path/to/app.crt\
	SSL_KEY_FILE=/path/to/app.key

5. Trust the self signed certificate on localhost:

	Windows - Press the Windows key + R\
			- Type "MMC" and click "OK"\
			- Go to "File > Add/Remove Snap-in"\
			- Click "Certificates" and "Add"\
			- Select "Computer Account" and click "Next"\
			- Select "Local Computer" then click "Finish"\
			- Click "OK" to go back to the MMC window\
			- Double-click "Certificates (local computer)" to expand the view\
			- Select "Trusted Root Certification Authorities", right-click "Certificates" and select "All Tasks" then "Import"\
			- Click "Next" then Browse and locate the "app.crt" file we created\
			- Select "Place all certificates in the following store" and select the "Trusted Root Certification Authorities store". Click "Next" then click "Finish" to complete the wizard.

	macOS	- Click the "Not Secure" box near the address bar, and a little panel should show up\
			- Click the Certificate item in the box, and you should see another panel show up, with the certificate details\
			- Now drag the certificate icon from there to the desktop, or any other folder you want. Literally drag and drop using the mouse.\
			- Find the file in the Finder, and double-click it.\
			- You should see a prompt to install it\
			- Where you see the Keychain: option, instead of login, choose System\
			- Press Add, now you should see the certificate in the System keychain, listed as localhost\
			- Now double-click that, and a window should show up\
			- Click the arrow near Trust, make sure you change "When using this certificate" to "Always Trust"
