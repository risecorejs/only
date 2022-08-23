const { differenceInYears } = require('date-fns')

const only = require('./index')

// VARIANT-0
printVariant(0, [], true)

// VARIANT-1
printVariant(0, ['name', 'tel', 'email', 'address', 'birthday'], true)

// VARIANT-2
printVariant(
  2,
  [
    'name',
    'tel',
    'email',
    'address.country',
    'address.city',
    {
      age(_, fields) {
        if (fields.birthday) {
          return differenceInYears(new Date(), new Date(fields.birthday))
        }
      }
    }
  ],
  true
)

// VARIANT-3
printVariant(3, [
  'name',
  'email',
  {
    tel: (val) => val.replace('+7', ''),
    address: ['country', 'city']
  },
  {
    customField: () => 123
  }
])

/**
 * PRINT-VARIANT
 * @param num {number}
 * @param keys {any[]}
 * @param println {boolean?}
 */
function printVariant(num, keys, println = false) {
  const fields = {
    unwantedField1: '!@545#@!!222',
    name: 'Abdulsalam',
    tel: '+77776665544',
    unwantedField2: '!@545#@!!222',
    email: 'amenov.abdulsalam@gmail.com',
    address: {
      country: 'Kazakhstan',
      unwantedField3: '!@545#@!!222',
      city: 'Almaty'
    },
    birthday: new Date(1998, 11, 15)
  }

  const result = only(fields, keys)

  console.log(`VARIANT-${num}:`, result)

  if (println) {
    console.log(
      '---------------------------------------------------------------------------------------------------------'
    )
  }
}
