# lastpass-to-pass

> Import LastPass .csv file to [pass](http://www.passwordstore.org/)

## Install

    $ git clone https://github.com/stigok/lastpass-to-pass
    $ npm install

## Usage

Export LastPass records to CSV

  - Open the LastPass extension menu
  - More options -> Advanced -> Export -> LastPass CSV File
  - Enter your master password
  - Save the CSV to a _secure location_ on your hard drive

Pipe the CSV to `pass` to import all records. Imports into pass dir _lastpass_ by default.

    $ cat ~/docs/passes.csv | PASSWORD_STORE_DIR="$HOME/.custom-pass-dir" node index.js

**Important:** Delete the CSV file when done

## Known errors

- Does not handle duplicate entries very well. If two records with the same resolved are imported, the last one will overwrite the previous ones.

## Why?

I want to be in control over my own passwords, and know how they are stored and used. Additionally, I don't want to use the LastPass browser extension any more as it injects JavaScript into all pages I visit and manipulates the DOM which messes with performance tests when I'm developing web applications. No hate, tho :)

I like how `pass` works and this move will hopefully make me come up with a neat way to autofill forms myself.
