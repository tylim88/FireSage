import { ObjectFlatten, DeepKey, DeepValue } from './objectFlatten'
import { IsTrue, IsSame } from '../tsUtils'

type ABC = {
	a: 1
	b: {
		c: 2
		d: {
			e: 5
			f: Record<string, boolean>
			g: Record<string, Record<number, { i: 1 }>>
			h: Record<number, Record<string, { j: 1 }>>
			123: boolean
		}
	}
}

describe('test object flatten type', () => {
	it('test DeepKey', () => {
		type A = DeepKey<ABC, 'write'>

		IsTrue<
			IsSame<
				A,
				| 'a/'
				| 'b/'
				| 'b/c/'
				| 'b/d/'
				| 'b/d/e/'
				| 'b/d/f/'
				| `b/d/h/`
				| `b/d/123/`
				| `b/d/h/${number}/`
				| `b/d/h/${number}/${string}/`
				| `b/d/h/${number}/${string}/j/`
				| `b/d/f/${string}/`
				| 'b/d/g/'
				| `b/d/g/${string}/`
				| `b/d/g/${string}/${number}/`
				| `b/d/g/${string}/${number}/i/`
			>
		>
	})

	it('test DeepValue', () => {
		// TODO add more tests
		type A = DeepValue<ABC, `b/d/123`, 'write'>

		IsTrue<IsSame<boolean, A>>
	})

	it('test primitive type', () => {
		type A = boolean | null | string | number
		type B = ObjectFlatten<A>

		IsTrue<IsSame<B, A>>
	})
	it('test unknown type', () => {
		type A = unknown
		type B = ObjectFlatten<A>

		IsTrue<IsSame<B, A>>
	})
	it('test never type', () => {
		type A = never
		type B = ObjectFlatten<A>

		IsTrue<IsSame<B, A>>
	})
})
