import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const todo = await request.json()

    console.log({todo})

    const res = await fetch('https://s7geuw06y9.execute-api.us-east-1.amazonaws.com/prod/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    console.log({res})
    
    const data = await res.json()

    console.log({data})
   
    return NextResponse.json(data)
}