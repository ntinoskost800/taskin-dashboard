'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { buttonVariants, Checkbox, Input, InputIcon, Label } from 'keep-react'
import { cn } from 'keep-react/utils'
import Link from 'next/link'
import { IEnvelope, ILock } from '../Icons/Icons'
import React from 'react'

const LoginForm = () => {
  const [email, setEmail] = useState('keep-design@gmail.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // hardcoded 'API call'
    try {
      if (email === 'keep-design@gmail.com' && password === '123456') {
        const fakeJWT = 'yourFakeToken'
        localStorage.setItem('accessToken', fakeJWT)
        router.push('/')
      } else {
        setError('Invalid email or password.')
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div>
      <form className="space-y-5" onSubmit={handleLogin}>
        <fieldset className="space-y-1">
          <Label htmlFor="email">Email </Label>
          <div className="relative">
            <Input
              id="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ps-11"
            />
            <InputIcon>
              <IEnvelope size={19} color="#AFBACA" />
            </InputIcon>
          </div>
        </fieldset>
        <fieldset className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ps-11"
            />
            <InputIcon>
              <ILock size={19} color="#AFBACA" />
            </InputIcon>
          </div>
        </fieldset>

        <div className="flex items-center justify-between">
          <fieldset className="flex items-start gap-2.5">
            <Checkbox defaultChecked={false} id="remember" className="border-metal-200 dark:border-metal-500" />
            <Label htmlFor="remember" className="text-body-4 font-normal leading-5 text-metal-900">
              Remember me
            </Label>
          </fieldset>
          <Link
            className="text-body-4 font-medium text-metal-600 underline underline-offset-2 dark:text-metal-300"
            href={'/forgot'}>
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className={cn(buttonVariants({ color: 'primary' }), 'w-full')}>
          Login
        </button>

        {error && <p className="pt-2 text-sm text-red-500">{error}</p>}
      </form>

      <div className="pt-8">
        <p className="text-center text-body-4 font-normal text-black dark:text-white">
          Don’t have an account?{' '}
          <Link className="text-primary-500" href="/sign-up">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
