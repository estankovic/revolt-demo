# Description
This repository has been done as a part of interview process.

# First Setup

## Runtime
In order to run this project, you will need `Node` of version 10 at least, with `npm` version 6.

## CLI
You will need to install *Ionic CLI* by running `npm i -g @ionic/cli`. This tool will be used to run your project as well as to generate some schematics.

## Install dependencies
To install dependencies run `npm i`

# Development

## Browser
To run this project use `ionic serve`.
 
## Mobile platforms

To sync angular application files to each native project (IOS, Android) you need to run `ionic capacitor sync`. This will build angular application and 
copy its files to each platform directory. It will also copy any *Capacitor* native plugins to those platforms. (Now project is not using any of those)

### Android
In order to open IOS project in Xcode run following `ionic capacitor open android`.
