import { update } from './update'
import {
	readAndExpectUpdate,
	generateRandomData,
	initializeApp,
	usersCreator,
} from '../utilForTests'

initializeApp()

const users = usersCreator()

describe('test update and get', () => {
	it('test a node', async () => {
		const ref = users.ref()
		const data = generateRandomData().data
		const childPath = 'a' as const
		await update(ref, [childPath], [data['a']])
		await readAndExpectUpdate(ref, childPath, data['a'])
		;() => {
			update(ref, [childPath], [data['a']])
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})

	it('test "b/c" node', async () => {
		const ref = users.ref('b')
		const data = generateRandomData().data
		const childPath = 'c' as const
		await update(ref, [childPath], [data['b']['c']])
		await readAndExpectUpdate(ref, childPath, data['b']['c'])
		;() => {
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['a']]
			)
			update(ref, [childPath], [data['b']['c']])
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})
	it('test "b/d" node', async () => {
		const ref = users.ref()
		const data = generateRandomData().data
		const childPath = 'b/d' as const
		await update(ref, [childPath], [data['b']['d']])
		await readAndExpectUpdate(ref, childPath, data['b']['d'])
		;() => {
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['c']]
			)
			update(ref, [childPath], [data['b']['d']])
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})
	it('test "b/d/f/j" node', async () => {
		const ref = users.ref('b/d')
		const data = generateRandomData().data
		const childPath = 'f/j' as const
		await update(ref, [childPath], [data['b']['d']['f']['j']])
		await readAndExpectUpdate(ref, childPath, data['b']['d']['f']['j'])
		;() => {
			update(ref, [childPath], [data['a']]) // no error, because 'a' is also a number
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']]
			)
			update(ref, [childPath], [data['b']['d']['f']['j']])
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})
	it('test "b/h/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = randStringHKey
		const ref = users.ref(`b/h`)
		await update(ref, [childPath], [data['b']['h'][randStringHKey]!])
		await readAndExpectUpdate(
			ref,
			`${childPath}/`,
			data['b']['h'][randStringHKey]!
		)
		;() => {
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(ref, [childPath], [data['b']['h']['string']!])
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath],
				[
					// @ts-expect-error
					data['b']['h']['string']!['m']['string']!,
				]
			)
			update(
				ref,
				[childPath],
				[
					// @ts-expect-error
					data['b']['h']['string']!['m']['string']!['n'],
				]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})
	it('test "b/h/string/i" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = 'i' as const
		const ref = users.ref(`b/h/${randStringHKey}`)
		await update(ref, [childPath], [data['b']['h'][randStringHKey]!['i']])
		await readAndExpectUpdate(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['i']
		)
		;() => {
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['a']]
			)
			update(ref, [childPath], [data['b']['c']]) // no error because 'c' is true and 'b/h/string' is boolean
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(ref, [childPath], [data['b']['h']['string']!['i']])
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})

	it('test "b/h/string/m" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = 'm' as const
		const ref = users.ref(`b/h/${randStringHKey}`)
		await update(ref, [childPath], [data['b']['h'][randStringHKey]!['m']])
		await readAndExpectUpdate(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['m']
		)
		;() => {
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(ref, [childPath], [data['b']['h']['string']!['m']])
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})

	it('test "b/h/string/m/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const childPath = `m/${randStringMKey}` as const
		const ref = users.ref(`b/h/${randStringHKey}`)

		await update(
			ref,
			[childPath],
			[data['b']['h'][randStringHKey]!['m'][randStringMKey]!]
		)
		await readAndExpectUpdate(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['m'][randStringMKey]!
		)
		;() => {
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(ref, [childPath], [data['b']['h']['string']!['m']['string']!])
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})

	it('test "b/h/string/m/string/n" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const childPath = `m/${randStringMKey}/n` as const
		const ref = users.ref(`b/h/${randStringHKey}`)
		await update(
			ref,
			[childPath],
			[data['b']['h'][randStringHKey]!['m'][randStringMKey]!['n']]
		)
		await readAndExpectUpdate(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['m'][randStringMKey]!['n']
		)
		;() => {
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(ref, [childPath], [data['b']['h']['string']!['m']['string']!['n']])
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})

	it('test "b/h/string/p" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const data = rand.data
		const childPath = `p` as const
		const ref = users.ref(`b/h/${randStringHKey}`)
		await update(
			ref,
			[
				// @ts-expect-error
				childPath,
			],
			[data['b']['h'][randStringHKey]!['p']]
		)
	})

	it('test "b/h/string/p/string" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const childPath = `p/${randStringMKey}` as const
		const ref = users.ref(`b/h/${randStringHKey}`)

		await update(
			ref,
			[childPath],
			[data['b']['h'][randStringHKey]!['p'][randStringMKey]!]
		)
		await readAndExpectUpdate(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['p'][randStringMKey]!
		)
		;() => {
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!['n']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(ref, [childPath], [data['b']['h']['string']!['p']['string']!])
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!['r']]
			)
		}
	})

	it('test "b/h/string/p/string/r" node', async () => {
		const rand = generateRandomData()
		const randStringHKey = rand.randStringHKey
		const randStringMKey = rand.randStringMKey
		const data = rand.data
		const childPath = `p/${randStringMKey}/r` as const
		const ref = users.ref(`b/h/${randStringHKey}`)
		await update(
			ref,
			[childPath],
			[data['b']['h'][randStringHKey]!['p'][randStringMKey]!['r']]
		)
		await readAndExpectUpdate(
			ref,
			childPath,
			data['b']['h'][randStringHKey]!['p'][randStringMKey]!['r']
		)
		;() => {
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['a']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['c']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['d']['f']['j']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['i']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['m']['string']!]
			)
			update(
				ref,
				[childPath],
				[
					// @ts-expect-error
					data['b']['h']['string']!['m']['string']!['n'],
				]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']]
			)
			update(
				ref,
				[childPath],
				// @ts-expect-error
				[data['b']['h']['string']!['p']['string']!]
			)
			update(ref, [childPath], [data['b']['h']['string']!['p']['string']!['r']])
		}
	})

	it('test "q" node', async () => {
		const rand = generateRandomData()
		const data = rand.data
		const childPath = `q` as const
		const ref = users.ref()
		await update(
			ref,
			[
				// @ts-expect-error
				childPath,
			],
			[data['q']]
		)
	})
})
