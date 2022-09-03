import { DatabaseReference } from '../refs'
import { MetaType } from '../metaType'
import { ErrorInvalidSetPriorityRef } from './error'
import { IsParentRecordOrArray } from '../utils'

export type IsValidSetPriorityRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = IsParentRecordOrArray<T, U, ErrorInvalidSetPriorityRef<U>>

/**
Sets a priority for the data at this Database location.

Applications need not use priority but can order collections by ordinary properties see [Sorting and filtering data](https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data).

@param ref — The location to write to.

@param priority — The priority to be written (string, number, or null).

@returns — Resolves when write to server is complete.
 */
export type SetPriority = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
>(
	ref: string extends never
		? DatabaseReference<T, U>
		: IsValidSetPriorityRef<T, U>,
	priority: string | number | null
) => Promise<void>