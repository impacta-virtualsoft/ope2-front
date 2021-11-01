import { useEffect, useState } from 'react'

const Test = () => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    async function fetcher(): Promise<UserType> {
      const req = await fetch('/api/ext')
      const newData = await req.json()
      return newData
    }
    setData(fetcher())
  }, [])

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export default Test
