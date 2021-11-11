import { useState, useEffect } from 'react'

export const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  const postData = (postData) => {
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
  }

  useEffect(() => {
    const controller = new AbortController() // use to abort async process
    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        })
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        const json = await res.json()
        setIsPending(false)
        setData(json)
        setError(null)
      } catch (e) {
        if (e.name === 'AbortError') {
          console.log('Fetch was aborted')
        } else {
          setIsPending(false)
          setError('Could not fetch data: ')
          console.log(e.message)
        }
      }
    }

    if (method === 'GET') fetchData()

    if (method === 'POST') fetchData(options)

    // clean up function to use to not update the state when someone aborted the mount
    return () => {
      controller.abort()
    }
  }, [url, method, options]) // note: Reference type cannot be use as dependency in useeffect because it triggers an infinite loop. Ex. array, function object. To work around use a state or useref hook

  return { data, isPending, error, postData }
}
