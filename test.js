const only = require('./only')

const requestData = {
  name: 'Abdulsalam',
  email: 'risecorejs@gmail.com',
  age: 1998,
  address: {
    country: 'Kazakhstan',
    city: 'Almaty'
  },
  a: {
    b: {
      c: 'd'
    }
  }
}

const result = only(requestData, [
  'name',
  'email',
  { age: (val) => new Date().getFullYear() - val },
  'address.country',
  { address: ['city'] },
  'a.b.c' // or { a: [{ b: ['c'] }] }
])

console.log(result)
