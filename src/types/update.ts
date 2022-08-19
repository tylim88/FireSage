import { MetaType } from './metaType'
import {
	FindNestedWriteTypeFromFullPath,
	ReplaceNumericRecordIfInputIsRecordString,
	GetFullPath,
	GetAllPushAbleOnlyPaths,
	GetNumberOfSlash,
	IsSameOrSubString,
} from './utils'
import {
	ErrorIsPushOnlyAbleType,
	ErrorNeedTupleNotArray,
	ErrorElementNeedConstAssertion,
	ErrorPathHasAncestor,
} from './error'
import { ValidateChildPath } from './child'

type ReplaceIfAncestorExist<
	T extends readonly string[],
	U extends string,
	Ancestors extends string[] = []
> = Ancestors['length'] extends 0
	? T extends readonly [infer H extends string, ...infer R extends string[]]
		? ReplaceIfAncestorExist<
				R,
				U,
				[
					...Ancestors,
					...(GetNumberOfSlash<H> extends GetNumberOfSlash<U>
						? []
						: IsSameOrSubString<H, U> extends true
						? [H]
						: [])
				]
		  >
		: U
	: ErrorPathHasAncestor<U, Ancestors[0]>

type ValidateChildPathAndCheckIsNotPushAbleOnly<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	P extends string
> = ValidateChildPath<T, U, P> extends P
	? GetFullPath<T, U, P> extends GetAllPushAbleOnlyPaths<T>
		? ErrorIsPushOnlyAbleType<`child ${P}`>
		: P
	: ValidateChildPath<T, U, P>

export type ValidateNodeNames<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends readonly string[],
	ACC extends readonly string[] = []
> = number extends V[number]
	? [ErrorNeedTupleNotArray]
	: V extends []
	? Readonly<ACC>
	: string[] extends V
	? [ErrorElementNeedConstAssertion]
	: V extends readonly [infer P extends string, ...infer S extends string[]]
	? ValidateNodeNames<
			T,
			U,
			S,
			[
				...ACC,
				string extends P
					? GetFullPath<T, U, P> extends never
						? ErrorElementNeedConstAssertion
						: ReplaceIfAncestorExist<
								V,
								ValidateChildPathAndCheckIsNotPushAbleOnly<T, U, P>
						  >
					: ReplaceIfAncestorExist<
							V,
							ValidateChildPathAndCheckIsNotPushAbleOnly<T, U, P>
					  >
			]
	  >
	: never

export type GetNodeTypes<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	N extends readonly string[],
	V extends readonly unknown[],
	ACC extends unknown[] = []
> = N extends []
	? ACC
	: N extends readonly [infer P extends string, ...infer S extends string[]]
	? V extends readonly [infer X, ...infer Y extends unknown[]]
		? GetNodeTypes<
				T,
				U,
				S,
				Y,
				[
					...ACC,
					ReplaceNumericRecordIfInputIsRecordString<
						X,
						FindNestedWriteTypeFromFullPath<T, GetFullPath<T, U, P>>
					>
				]
		  >
		: GetNodeTypes<
				T,
				U,
				S,
				[],
				[...ACC, FindNestedWriteTypeFromFullPath<T, GetFullPath<T, U, P>>]
		  >
	: never
