# lastpass-to-pass

> Import LastPass .csv file to [pass](http://www.passwordstore.org/)

## Install

    $ git clone https://github.com/stigok/lastpass-to-pass
    $ npm install

## Usage

    $ cat ~/lastpass.csv | node index.js

This program imports all the records as into `pass insert lastpass/${record.name}`.

Expected to work with the `.csv` file you get to see when exporting from the LastPass Chrome extension.

## Export LastPass records to CSV

  1. Open the LastPass extension menu
  2. More options -> Advanced -> Export -> LastPass CSV File
  3. Enter your master password
  4. Save the contents to a file in a _secure location_ on your hard drive

**Important:** Delete the CSV file when done

## Known errors

- Does not handle duplicate entries very well. If two records with the same resolved are imported, the last one processed will overwrite the previous ones.

## Why import to pass?

I want to be in full control over my own passwords and know exactly how they are stored and used. Additionally, I don't want to use the LastPass browser extension any more as it injects JavaScript into all pages I visit and manipulates the DOM. This messes with debugging and performance tests when I'm developing web applications.

I really like the simplicity of `pass` and I hope move will push me into creating my own autofiller.
