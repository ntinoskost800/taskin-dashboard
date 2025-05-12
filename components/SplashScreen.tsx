'use client'

import React from 'react'

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-white dark:bg-[#1f2937]">
      <img src="/favicon.ico" alt="App Logo" className="h-22 w-22 animate-bounce" />
    </div>
  )
}

export default SplashScreen
