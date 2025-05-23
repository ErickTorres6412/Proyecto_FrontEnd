"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

// Holiday theme can be manually set to: "christmas", "halloween", or null for no holiday theme
const HOLIDAY_THEME = null // Change this manually to "christmas" or "halloween"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [timeOfDay, setTimeOfDay] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navigate = useNavigate()

  // Use refs to store generated elements so they don't change on re-renders
  const starsRef = useRef(null)
  const cloudsRef = useRef(null)
  const buildingsRef = useRef(null)
  const celestialBodyRef = useRef(null)
  const holidayElementsRef = useRef(null)

  useEffect(() => {
    // Determine time of day for background animation
    const determineTimeOfDay = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 11) {
        setTimeOfDay("morning")
      } else if (hour >= 11 && hour < 17) {
        setTimeOfDay("day")
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDay("evening")
      } else {
        setTimeOfDay("night")
      }
    }

    determineTimeOfDay()
    // Update time of day every minute
    const interval = setInterval(determineTimeOfDay, 60000)

    // Set mounted for animations
    setTimeout(() => setMounted(true), 100)

    return () => clearInterval(interval)
  }, [])

  // Generate stars for night mode - only once when timeOfDay changes to "night"
  useEffect(() => {
    if (timeOfDay === "night" && !starsRef.current) {
      const stars = []
      for (let i = 0; i < 100; i++) {
        const size = Math.random() * 3 + 1
        const animationDelay = Math.random() * 5
        const left = Math.random() * 100
        const top = Math.random() * 100
        const animationDuration = 3 + Math.random() * 4

        stars.push(
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${animationDelay}s`,
              animationDuration: `${animationDuration}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />,
        )
      }

      // Add shooting stars
      for (let i = 0; i < 5; i++) {
        const top = Math.random() * 50
        const left = Math.random() * 100
        const animationDelay = Math.random() * 15

        stars.push(
          <div
            key={`shooting-${i}`}
            className="absolute h-0.5 w-0.5 bg-white animate-shooting-star"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${animationDelay}s`,
            }}
          />,
        )
      }

      starsRef.current = stars
    } else if (timeOfDay !== "night") {
      starsRef.current = null
    }
  }, [timeOfDay])

  // Generate clouds - only once when timeOfDay changes
  useEffect(() => {
    if (timeOfDay !== "night" && !cloudsRef.current) {
      const clouds = []
      const count = timeOfDay === "day" ? 8 : timeOfDay === "morning" ? 6 : 4

      for (let i = 0; i < count; i++) {
        const width = Math.random() * 150 + 100
        // Position clouds across the entire screen initially
        const initialLeft = Math.random() * 100
        const animationDuration = Math.random() * 200 + 100
        const top = Math.random() * 60

        // Calculate animation delay based on position to create continuous movement
        // Clouds on the right will start moving earlier in their animation cycle
        const animationDelay = -(initialLeft / 100) * animationDuration

        clouds.push(
          <div
            key={i}
            className={`absolute rounded-full animate-float-cloud ${
              timeOfDay === "morning" ? "bg-orange-200/40" : timeOfDay === "day" ? "bg-white/60" : "bg-pink-200/50"
            }`}
            style={{
              width: `${width}px`,
              height: `${width / 2}px`,
              top: `${top}%`,
              left: `${initialLeft}%`,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${animationDelay}s`,
            }}
          />,
        )
      }

      cloudsRef.current = clouds
    } else if (timeOfDay === "night") {
      cloudsRef.current = null
    }
  }, [timeOfDay])

  // Generate celestial body - only once when timeOfDay changes
  useEffect(() => {
    if (timeOfDay === "morning") {
      celestialBodyRef.current = (
        <div className="absolute left-1/4 top-1/4 w-24 h-24 rounded-full bg-yellow-300 animate-gentle-float blur-md"></div>
      )
    } else if (timeOfDay === "day") {
      celestialBodyRef.current = (
        <div className="absolute right-1/4 top-1/6 w-32 h-32 rounded-full bg-yellow-300 animate-gentle-float blur-sm"></div>
      )
    } else if (timeOfDay === "evening") {
      celestialBodyRef.current = (
        <div className="absolute right-1/4 bottom-1/4 w-28 h-28 rounded-full bg-orange-500 animate-gentle-float blur-md"></div>
      )
    } else if (timeOfDay === "night") {
      celestialBodyRef.current = (
        <div className="absolute right-1/4 top-1/6 w-16 h-16 rounded-full bg-gray-100 animate-gentle-float blur-[1px]"></div>
      )
    }
  }, [timeOfDay])

  // Generate buildings - only once when timeOfDay changes
  useEffect(() => {
    if (!buildingsRef.current) {
      const buildings = []
      const count = 8

      for (let i = 0; i < count; i++) {
        const width = 40 + Math.random() * 60
        const height = 100 + Math.random() * 150
        const left = (i / count) * 100

        // Different building colors based on time of day
        const buildingColor =
          timeOfDay === "night"
            ? "bg-gray-900"
            : timeOfDay === "evening"
              ? "bg-gray-700"
              : timeOfDay === "morning"
                ? "bg-gray-500"
                : "bg-gray-600"

        // Different window colors based on time of day
        const windowColor =
          timeOfDay === "night"
            ? "bg-yellow-100 opacity-80"
            : timeOfDay === "evening"
              ? "bg-orange-100 opacity-60"
              : timeOfDay === "morning"
                ? "bg-blue-100 opacity-40"
                : "bg-white opacity-70"

        // Generate windows once and store them
        const windows = []
        const floors = Math.floor(height / 20)
        const windowsPerFloor = Math.floor(width / 20)

        for (let floorIndex = 0; floorIndex < floors; floorIndex++) {
          const floorWindows = []
          for (let windowIndex = 0; windowIndex < windowsPerFloor; windowIndex++) {
            if (Math.random() > (timeOfDay === "night" ? 0.3 : 0.5)) {
              floorWindows.push(<div key={windowIndex} className={`w-3 h-4 ${windowColor}`} />)
            } else {
              floorWindows.push(<div key={windowIndex} className="w-3 h-4 opacity-0" />)
            }
          }
          windows.push(
            <div key={floorIndex} className="flex justify-around mt-4">
              {floorWindows}
            </div>,
          )
        }

        buildings.push(
          <div
            key={i}
            className={`absolute bottom-0 ${buildingColor}`}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              left: `${left}%`,
            }}
          >
            {/* Windows */}
            {windows}

            {/* Building roof */}
            <div
              className={`absolute -top-5 left-0 right-0 h-5 ${
                timeOfDay === "night" ? "bg-gray-800" : timeOfDay === "evening" ? "bg-gray-600" : "bg-gray-400"
              }`}
              style={{
                clipPath: "polygon(0% 100%, 50% 0%, 100% 100%)",
              }}
            ></div>
          </div>,
        )
      }

      buildingsRef.current = buildings
    }
  }, [timeOfDay])

  // Generate holiday elements
  useEffect(() => {
    if (HOLIDAY_THEME === "christmas") {
      const christmasElements = []

      // Add snow
      for (let i = 0; i < 50; i++) {
        christmasElements.push(
          <div
            key={`snow-${i}`}
            className="absolute rounded-full bg-white animate-snow"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              top: `-20px`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />,
        )
      }

      // Add Christmas tree
      christmasElements.push(
        <div key="christmas-tree" className="absolute bottom-0 left-1/4 z-10" style={{ transform: "translateX(-50%)" }}>
          {/* Tree trunk */}
          <div className="w-6 h-10 bg-yellow-800 mx-auto"></div>
          {/* Tree layers */}
          <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[40px] border-l-transparent border-r-transparent border-b-green-800 relative -mt-5">
            {/* Ornaments */}
            <div className="absolute w-3 h-3 rounded-full bg-red-500 top-10 left-0"></div>
            <div className="absolute w-3 h-3 rounded-full bg-yellow-300 top-20 right-2"></div>
            <div className="absolute w-3 h-3 rounded-full bg-blue-400 top-15 left-5"></div>
          </div>
          <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[50px] border-l-transparent border-r-transparent border-b-green-700 relative -mt-10">
            {/* Ornaments */}
            <div className="absolute w-3 h-3 rounded-full bg-purple-500 top-20 right-0"></div>
            <div className="absolute w-3 h-3 rounded-full bg-blue-300 top-30 left-2"></div>
          </div>
          <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[60px] border-l-transparent border-r-transparent border-b-green-600 relative -mt-15">
            {/* Ornaments */}
            <div className="absolute w-3 h-3 rounded-full bg-red-400 top-20 left-0"></div>
            <div className="absolute w-3 h-3 rounded-full bg-yellow-400 top-40 right-5"></div>
          </div>
          {/* Star */}
          <div
            className="w-8 h-8 bg-yellow-300 absolute -top-4 left-1/2 transform -translate-x-1/2 animate-pulse-slow"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          ></div>
        </div>,
      )

      // Add Christmas lights to buildings
      if (buildingsRef.current) {
        const buildingsWithLights = buildingsRef.current.map((building, index) => {
          return React.cloneElement(building, {}, [
            ...React.Children.toArray(building.props.children),
            <div key={`lights-${index}`} className="absolute top-0 left-0 right-0 h-2 overflow-hidden">
              {Array.from({ length: Math.floor(building.props.style.width / 10) }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute top-0 w-3 h-3 rounded-full animate-christmas-lights`}
                  style={{
                    left: `${i * 10}px`,
                    backgroundColor: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"][i % 4],
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>,
          ])
        })
        buildingsRef.current = buildingsWithLights
      }

      holidayElementsRef.current = christmasElements
    } else if (HOLIDAY_THEME === "halloween") {
      const halloweenElements = []

      // Add bats
      for (let i = 0; i < 10; i++) {
        const size = Math.random() * 10 + 10
        halloweenElements.push(
          <div
            key={`bat-${i}`}
            className="absolute animate-bat"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div
              className="bg-black"
              style={{
                width: `${size}px`,
                height: `${size / 2}px`,
                borderRadius: "50% 50% 0 0",
                position: "relative",
              }}
            >
              {/* Wings */}
              <div
                className="absolute bg-black animate-bat-wing"
                style={{
                  width: `${size * 1.5}px`,
                  height: `${size}px`,
                  borderRadius: "50% 50% 0 50%",
                  transform: "rotate(-20deg)",
                  transformOrigin: "bottom right",
                  left: `-${size}px`,
                  top: `-${size / 2}px`,
                }}
              ></div>
              <div
                className="absolute bg-black animate-bat-wing-reverse"
                style={{
                  width: `${size * 1.5}px`,
                  height: `${size}px`,
                  borderRadius: "50% 50% 50% 0",
                  transform: "rotate(20deg)",
                  transformOrigin: "bottom left",
                  right: `-${size}px`,
                  top: `-${size / 2}px`,
                }}
              ></div>
            </div>
          </div>,
        )
      }

      // Add pumpkins near buildings
      halloweenElements.push(
        <div key="pumpkins" className="absolute bottom-0 left-0 right-0 z-10">
          {Array.from({ length: 5 }).map((_, i) => {
            const left = 10 + i * 20
            const size = 20 + Math.random() * 15
            return (
              <div
                key={i}
                className="absolute bottom-0 animate-pulse-slow"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size * 0.8}px`,
                }}
              >
                {/* Pumpkin */}
                <div
                  className="w-full h-full rounded-full bg-orange-500"
                  style={{
                    boxShadow: "0 0 10px 2px rgba(255, 165, 0, 0.3)",
                  }}
                >
                  {/* Stem */}
                  <div className="absolute w-3 h-5 bg-green-800 top-0 left-1/2 transform -translate-x-1/2 -translate-y-3"></div>

                  {/* Face */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
                    {/* Eyes */}
                    <div
                      className="absolute top-0 left-0 w-3 h-3 bg-black"
                      style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                    ></div>
                    <div
                      className="absolute top-0 right-0 w-3 h-3 bg-black"
                      style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                    ></div>

                    {/* Mouth */}
                    <div
                      className="absolute bottom-0 left-1/4 w-1/2 h-3 bg-black"
                      style={{ clipPath: "polygon(0% 0%, 20% 100%, 40% 0%, 60% 100%, 80% 0%, 100% 100%)" }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>,
      )

      // Add orange/purple overlay
      halloweenElements.push(
        <div
          key="halloween-overlay"
          className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-orange-700/10 pointer-events-none"
        ></div>,
      )

      // Add moon with orange tint
      halloweenElements.push(
        <div
          key="halloween-moon"
          className="absolute right-1/4 top-1/6 w-16 h-16 rounded-full bg-yellow-100 animate-gentle-float blur-[1px]"
          style={{ boxShadow: "0 0 20px 10px rgba(255, 165, 0, 0.2)" }}
        ></div>,
      )

      holidayElementsRef.current = halloweenElements
    } else {
      holidayElementsRef.current = null
    }
  }, [timeOfDay])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login - for now, allow any credentials
    setTimeout(() => {
      setLoading(false)
      navigate("/dashboard") // Navigate to dashboard after login
    }, 1500)
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-1000 overflow-hidden relative ${
        HOLIDAY_THEME === "halloween"
          ? "bg-gradient-to-t from-orange-900 to-purple-900"
          : timeOfDay === "morning"
            ? "bg-gradient-to-t from-orange-300 to-blue-300"
            : timeOfDay === "day"
              ? "bg-gradient-to-t from-blue-300 to-blue-500"
              : timeOfDay === "evening"
                ? "bg-gradient-to-t from-orange-400 to-purple-600"
                : "bg-gradient-to-t from-blue-900 to-black"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starsRef.current}
        {cloudsRef.current}
        {celestialBodyRef.current}
        {buildingsRef.current}
        {holidayElementsRef.current}

        {/* Additional time-specific effects */}
        {timeOfDay === "evening" && !HOLIDAY_THEME && (
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-500/30 to-transparent"></div>
        )}

        {timeOfDay === "night" && !HOLIDAY_THEME && <div className="absolute inset-0 bg-blue-900/10"></div>}

        {/* Snow overlay for Christmas */}
        {HOLIDAY_THEME === "christmas" && <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>}
      </div>

      {/* Login Form */}
      <div
        className={`w-full max-w-md transition-all duration-1000 relative z-10 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div
          className={`backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl border border-white/20 ${
            HOLIDAY_THEME === "christmas"
              ? "animate-christmas-card-glow"
              : HOLIDAY_THEME === "halloween"
                ? "animate-halloween-card-glow"
                : "animate-card-glow"
          }`}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div
                  className={`h-16 w-16 rounded-full bg-white/20 flex items-center justify-center ${
                    HOLIDAY_THEME === "christmas"
                      ? "animate-christmas-logo-pulse"
                      : HOLIDAY_THEME === "halloween"
                        ? "animate-halloween-logo-pulse"
                        : "animate-logo-pulse"
                  }`}
                >
                  <span className="text-2xl font-bold text-white animate-text-shimmer">SC</span>
                </div>
              </div>
              <h1
                className={`text-3xl font-bold text-white mb-2 transition-all duration-700 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                SECOVI
              </h1>
              <p
                className={`text-white/80 transition-all duration-700 delay-100 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Sistema de Gestión de Condominios
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`transition-all duration-700 delay-200 ${
                  mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
              >
                <label htmlFor="username" className="block text-sm font-medium text-white mb-1">
                  Usuario
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all hover:bg-white/30"
                  placeholder="Ingrese su usuario"
                />
              </div>

              <div
                className={`relative transition-all duration-700 delay-300 ${
                  mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
              >
                <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all hover:bg-white/30"
                    placeholder="Ingrese su contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors hover:scale-110 active:scale-95"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div
                className={`flex items-center justify-between mt-4 transition-all duration-700 delay-400 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-white/30 bg-white/20 text-blue-600 focus:ring-blue-500 transition-all hover:scale-110"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-white/80 hover:text-white transition-colors"
                  >
                    Recordarme
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-white/80 hover:text-white transition-colors hover:underline">
                    ¿Olvidó su contraseña?
                  </a>
                </div>
              </div>

              <div
                className={`transition-all duration-700 delay-500 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    loading
                      ? "bg-white/30 text-white/70 cursor-not-allowed"
                      : HOLIDAY_THEME === "christmas"
                        ? "bg-red-600 text-white hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-red-500/25"
                        : HOLIDAY_THEME === "halloween"
                          ? "bg-orange-600 text-white hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-orange-500/25"
                          : "bg-white text-blue-900 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-white/25"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Ingresando...
                    </span>
                  ) : (
                    "Ingresar"
                  )}
                </button>
              </div>
            </form>

            <div
              className={`mt-6 text-center transition-all duration-700 delay-600 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-sm text-white/70 animate-pulse-text">
                {HOLIDAY_THEME === "christmas" && "¡Feliz Navidad! Bienvenido a SECOVI."}
                {HOLIDAY_THEME === "halloween" && "¡Feliz Navidad! Bienvenido a SECOVI."}
                {HOLIDAY_THEME === "halloween" && "¡Feliz Halloween! Bienvenido a SECOVI."}
                {!HOLIDAY_THEME && timeOfDay === "morning" && "¡Buenos días! Bienvenido de nuevo."}
                {!HOLIDAY_THEME && timeOfDay === "day" && "¡Buen día! Gracias por usar SECOVI."}
                {!HOLIDAY_THEME && timeOfDay === "evening" && "¡Buenas tardes! Esperamos que tenga un excelente día."}
                {!HOLIDAY_THEME && timeOfDay === "night" && "¡Buenas noches! Gracias por su dedicación."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
