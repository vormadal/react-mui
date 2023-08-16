import { useCallback, useEffect, useRef, useState } from 'react'

type DataFunc<Data, Args extends any[] = []> = (...arg: Args) => Promise<Data>
type ReloadFunc<Args extends any[] = []> = (...arg: Args) => Promise<void>
type UpdateFunc<Data> = (data?: Data) => void

interface DataContent<Data> {
  error?: string
  loading: boolean
  data?: Data
}

type UseDataReturn<Data, Args extends any[] = []> = [DataContent<Data>, ReloadFunc<Args>, UpdateFunc<Data>]

function rand() {
  return Math.random().toString(36).substring(2) // remove `0.`
}

function token() {
  return rand() + rand() // to make it longer
}

/**
 * The useData hook can be used to make it easier to handle loading and error state when fetching data from an API.
 * The hook takes a function and an optional argument array as a parameter which will be forwarded to the data function.
 * The hook returns an array with three values:
 * 1. an object containing `loading` and `error` state and `data` which is loaded by the provided function.
 * 2. a function which allows you to trigger reloads, with or without updated arguments
 * 3. a function which allows you to set the data value directly. 
 * @param dataFunc the function that loads and returns data
 */
export function useData<Data, Args extends any[] = []>(dataFunc: DataFunc<Data, Args>): UseDataReturn<Data, Args>
/**
 * The useData hook can be used to make it easier to handle loading and error state when fetching data from an API.
 * The hook takes a function and an optional argument array as a parameter which will be forwarded to the data function.
 * The hook returns an array with three values:
 * 1. an object containing `loading` and `error` state and `data` which is loaded by the provided function.
 * 2. a function which allows you to trigger reloads, with or without updated arguments
 * 3. a function which allows you to set the data value directly.
 * @param dataFunc the function that loads and returns data
 * @param initialArgs array of arguments which will be passed on to the dateFunc
 */
export function useData<Data, Args extends any[] = []>(dataFunc: DataFunc<Data, Args>, initialArgs?: Args): UseDataReturn<Data, Args>
export function useData<Data, Args extends any[] = []>(
  dataFunc: DataFunc<Data, Args>,
  initialArgs?: Args
): UseDataReturn<Data, Args> {
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Data>()
  const t = useRef('')
  const _loader = useRef(dataFunc)

  const load = useCallback(async (arg?: Args) => {
    const myToken = token()
    t.current = myToken

    setLoading(true)
    setError(undefined)
    try {
      const result = await _loader.current(...(arg || ([] as any)))
      if (t.current === myToken) setData(result)
    } catch (e: any) {
      setError(e?.response?.Title ?? e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(initialArgs)
  }, [initialArgs, load])

  const reload = useCallback(
    async (...args: Args) => {
      if (args && (args as Args)) {
        load(args)
      } else if (initialArgs) {
        load(initialArgs)
      } else {
        load()
      }
    },
    [load, initialArgs]
  )

  return [{ error, loading, data }, reload, setData]
}
