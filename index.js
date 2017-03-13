const parse = require('csv-parse')
const es = require('event-stream')
const execSync = require('child_process').execSync

let keys

process.stdin
  .pipe(parse())
  .pipe(es.map((raw, next) => {
    // Interpret first row as column keys
    if (!keys) {
      keys = raw
      return next(null)
    }

    // Convert array to object with proper key names
    const record = {}
    for (let k of keys) {
      record[k] = raw[keys.indexOf(k)]
    }

    // Use the domainname as record name if one doesn't already exist
    if (!record.name.length) {
      record.url.replace(/https?:\/\/([^/]+)/, function () {
        record.name = arguments[1]
      })
    }

    execSync(`pass insert --multiline "lastpass/${record.name}"`, {
      input: `${record.username}\n${record.password}\n${record.extra}\n\n${keys}\n${raw}`,
      encoding: 'utf-8'
    })

    next(null, `Imported ${record.name}\n`)
  }))
  .pipe(process.stdout)
