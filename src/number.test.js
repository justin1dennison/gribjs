import test from 'ava'
import { add } from './number'

test('add', t => {
  t.assert(add(1, 2) === 3, 'add(1, 2) should equal 3')
})
