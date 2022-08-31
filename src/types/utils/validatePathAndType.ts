import { MetaType } from '../metaType'
import {
	ErrorNeedStringKey,
	ErrorInvalidOrNeedNumericKey,
	ErrorNeedNumericKey,
	ErrorHasNoChild,
} from '../error'
import { FindMetaPathType } from './findTypeAndKey'
import { IsNumericRecordType } from '../tsUtils'
import { FindAllLevelChildKeys, GetFullPath } from '.'

export type ValidateChildPath<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	ChildPath extends string,
	ErrorInvalidOrNeedNumeric = ErrorInvalidOrNeedNumericKey,
	ErrorNeedString = ErrorNeedStringKey
> = FindAllLevelChildKeys<T, U> extends never
	? ErrorHasNoChild<U>
	: ValidateFullPath<
			T,
			GetFullPath<T, U, ChildPath>,
			GetFullPath<T, U, ChildPath>,
			ErrorInvalidOrNeedNumeric,
			ErrorNeedString
	  > extends ErrorNeedString
	? ErrorNeedString
	: ValidateFullPath<
			T,
			GetFullPath<T, U, ChildPath>,
			GetFullPath<T, U, ChildPath>,
			ErrorInvalidOrNeedNumeric,
			ErrorNeedString
	  > extends ErrorInvalidOrNeedNumeric
	? ErrorInvalidOrNeedNumeric
	: ChildPath

// string does not extends `${number}`
// `${number}` extends string
// if the path segment type is string and the input segment type is number, fail it
// if the path segment type is number and the input segment type is string, fail it (with less specific message because of some technical difficulty)
export type ValidateFullPath<
	T extends MetaType,
	V extends keyof T['flatten_write'] & string,
	Pass = V,
	ErrorInvalidOrNeedNumeric = ErrorInvalidOrNeedNumericKey,
	ErrorNeedString = ErrorNeedStringKey,
	L extends string = FindMetaPathType<T, V> & string,
	H extends string = V
> = L[] extends never[]
	? ErrorInvalidOrNeedNumeric // return less specific error for string does not extends `${number}` case
	: L extends `${infer M}/${infer N}` // ! distribution in this line
	? H extends `${infer I}/${infer J}`
		? I extends `${number}`
			? string extends M
				? ErrorNeedString
				: ValidateFullPath<
						T,
						V,
						Pass,
						ErrorInvalidOrNeedNumeric,
						ErrorNeedString,
						N,
						J
				  >
			: ValidateFullPath<
					T,
					V,
					Pass,
					ErrorInvalidOrNeedNumeric,
					ErrorNeedString,
					N,
					J
			  >
		: never // impossible route
	: H extends `${number}`
	? string extends L
		? ErrorNeedString
		: Pass
	: Pass

// Record<string, any> and Record<number, any> extends each other
// Record<string, any> does not extends Record<number, any> & Record<string, never>
// Record<number, any> does not extends Record<number, any> & Record<string, never>
// case 1: if the node type is not Record<number, any> OR input type is other than Record<string, any>, don't change the node type
// case 2: if the node type is Record<number, any> AND the input type is Record<string, any>, return error message
export type ValidateRecordString<Input, Node> =
	IsNumericRecordType<Input> extends infer G
		? G extends true // case 1
			? Node
			: Node extends Record<number, unknown> // case 2
			? IsNumericRecordType<Node> extends true
				? ErrorNeedNumericKey
				: Node
			: Node
		: never