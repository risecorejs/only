const only = require('./index')

const body = {
  name: 'Abdulsalam',
  email: 'risecorejs@gmail.com',
  birthday: 1998,
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
    1: 'a',
    2: 'b',
    3: 'c'
  }
}

const result = only(body, [
  'name',
  { email: (val) => val },
  { age: () => new Date().getFullYear() - body.birthday },
  'array',
  'address.country',
  'address.city',
  { a: [{ b: ['c'] }] }, // 'a.b.c'
  'object'
])

console.log(result)
