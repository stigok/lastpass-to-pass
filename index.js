const csv = require('csv')
const es = require('event-stream')
const exec = require('child_process').exec

// Returns match of first capture group, or false if it wasn't found
function get (pattern, str) {
  let match
  str.replace(pattern, function () {
    match = arguments[1]
  })
  return match || false
}

let keys

process.stdin
  .pipe(csv.parse())
  .pipe(csv.transform(record => {
    if (!keys) {
      keys = record
    } else {
      let obj = {}
      for (let k of keys) {
        obj[k] = record[keys.indexOf(k)]
      }
      return obj
    }
  }))
  .pipe(es.map(function (a, cb) {
    // Use domain as name if a record doesn't have one
    if (!a.username.length) {
      a.name = get(/https?:\/\/([^/]+)/, a.url)
    }

    const child = exec(`pass insert --multiline "lastpass/${a.name}"`, (err) => {
      if (err) {
        console.error('Failed to add ' + a.name, err.message)
        cb()
      } else {
        console.log(`Imported ${a.name}`)
        cb(null)
      }
    })

    // Pipe sensitive data
    child.stdin.end(`${a.username}\n${a.password}\n${a.extra}\n${JSON.stringify(a)}`, 'utf-8')
  }))
