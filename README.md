# Intro
This file aims to help you set up a working environment for further development of this wordpress plugin.
The plugin is made as part of a project for a client and is thus aimed primarily to help them develop it further if necessary.

# Setup
To get up and running the recommended way is to download and set up a local wordpress with localwp, then clone this repository into the folder at 'app/public/wp-content/plugins/'. 

## Required tools
* editor - VSCode (recommended)
* npm - Node Package Manager
* git - (not necessary but highly recommended)

## npm packages
These packages are required to have and can be installed with: 'npm install "package name"'
* @wordpress/scripts
* tsx
* mui (unsure if this is package name)

# Development
To compile the code and test it on localwp one simply builds the program with: 'npm run build'

## Files and what they do
The plugin is developed in these files: 
* plugin.php
* build/OneHotButtons.tsx
* build/main.tsx

the .php file handles working with wordpress directly while anything in the .tsx files must go through the .php file if need be to access wordpress directly. The .tsx files are mostly for how the buttons look and function within the editor.

## Getting the program to the server
To get the plugin working on the actual website one should build the program and then take the files created in the 'build' directory aswell as the plugin.php file in the standard directory and place them in the 'wp-minimizer' folder on the corresponding server (hostinger). 


