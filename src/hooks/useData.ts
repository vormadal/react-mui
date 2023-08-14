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

export function useData<Data, Args extends any[] = []>(dataFunc: DataFunc<Data, Args>): UseDataReturn<Data, Args>
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
