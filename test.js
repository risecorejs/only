const only = require('./only')

const requestData = {
  name: 'Abdulsalam',
  email: 'risecorejs@gmail.com',
  age: 1998,
  array: [1, 2, 3],
  address: {
    country: 'Kazakhstan',
    city: 'Almaty'
  },
  a: {
    b: {
      c: 'd'
    }
  },
  object: {
    '1': 'a',
    '2': 'b',
    '3': 'c',
  }
}

const result = only(requestData, [
  'name',
  'email',
  { age: (val) => new Date().getFullYear() - val },
  'array',
  'address.country',
  { address: ['city'] },
  'a.b.c', // or { a: [{ b: ['c'] }] },
  'object'
])

console.log(result)
