import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { cookies } from 'next/headers';

dotenv.config();



export async function POST(req) {
  const body = await req.json(); // Parse the JSON body in case it's not auto-parsed
  console.log(body); // Log the request body to check if it's correct

  const { username, password } = body;

  console.log(process.env.AUTHORIZED_USERNAME);
    if(username === process.env.AUTHORIZED_USERNAME && password === process.env.AUTHORIZED_PASSWORD){
      const token = sign(
        { username },
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
      )

      cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
        path: '/',
      });
      console.log(token);

      return new Response(
        JSON.stringify({ message: 'Login Successful' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
  } else {
    return new Response(JSON.stringify({message: "Not Authorized"}), {
    headers: { 'Content-Type': 'application/json' },
    status: 401,
   })
  }
}