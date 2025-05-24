import React, { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useTimeOfDay } from "../../hooks/Login/useTimeOfDay"
import { useBackgroundElements } from "../../hooks/Login/useBackgroundElements"
import { useLoginForm } from "../../hooks/Login/useLoginForm"

// Holiday theme can be manually set to: "christmas", "halloween", or null for no holiday theme
const HOLIDAY_THEME = null // Change this manually to "christmas" or "halloween"

function Login() {
  const [mounted, setMounted] = useState(false)
  
  // Custom hooks
  const timeOfDay = useTimeOfDay()
  const backgroundElements = useBackgroundElements(timeOfDay, HOLIDAY_THEME)
  const {
    username,
    password,
    loading,
    showPassword,
    rememberMe,
    error,
    setUsername,
    setPassword,
    setShowPassword,
    setRememberMe,
    handleSubmit
  } = useLoginForm()

  useEffect(() => {
    // Set mounted for animations
    setTimeout(() => setMounted(true), 100)
  }, [])

  const getGreetingMessage = () => {
    if (HOLIDAY_THEME === "christmas") return "¡Feliz Navidad! Bienvenido a SECOVI."
    if (HOLIDAY_THEME === "halloween") return "¡Feliz Halloween! Bienvenido a SECOVI."
    
    switch (timeOfDay) {
      case "morning": return "¡Buenos días! Bienvenido de nuevo."
      case "day": return "¡Buen día! Gracias por usar SECOVI."
      case "evening": return "¡Buenas tardes! Esperamos que tenga un excelente día."
      case "night": return "¡Buenas noches! Gracias por su dedicación."
      default: return "Bienvenido a SECOVI."
    }
  }

  const getBackgroundClasses = () => {
    if (HOLIDAY_THEME === "halloween") {
      return "bg-gradient-to-t from-orange-900 to-purple-900"
    }
    
    switch (timeOfDay) {
      case "morning": return "bg-gradient-to-t from-orange-300 to-blue-300"
      case "day": return "bg-gradient-to-t from-blue-300 to-blue-500"
      case "evening": return "bg-gradient-to-t from-orange-400 to-purple-600"
      case "night": return "bg-gradient-to-t from-blue-900 to-black"
      default: return "bg-gradient-to-t from-blue-300 to-blue-500"
    }
  }

  const getCardClasses = () => {
    if (HOLIDAY_THEME === "christmas") return "animate-pulse shadow-red-500/25"
    if (HOLIDAY_THEME === "halloween") return "animate-pulse shadow-orange-500/25"
    return "hover:scale-[1.02] transition-transform"
  }

  const getLogoClasses = () => {
    if (HOLIDAY_THEME === "christmas") return "animate-bounce text-red-600"
    if (HOLIDAY_THEME === "halloween") return "animate-bounce text-orange-600"
    return "animate-pulse text-white"
  }

  const getButtonClasses = () => {
    if (loading) return "bg-white/30 text-white/70 cursor-not-allowed"
    
    if (HOLIDAY_THEME === "christmas") {
      return "bg-red-600 text-white hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-red-500/25"
    }
    
    if (HOLIDAY_THEME === "halloween") {
      return "bg-orange-600 text-white hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-orange-500/25"
    }
    
    return "bg-white text-blue-900 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-white/25"
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-1000 overflow-hidden relative ${getBackgroundClasses()}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundElements.stars}
        {backgroundElements.clouds}
        {backgroundElements.celestialBody}
        {backgroundElements.buildings}
        {backgroundElements.holidayElements}

        {/* Additional time-specific effects */}
        {timeOfDay === "evening" && !HOLIDAY_THEME && (
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-500/30 to-transparent"></div>
        )}

        {timeOfDay === "night" && !HOLIDAY_THEME && (
          <div className="absolute inset-0 bg-blue-900/10"></div>
        )}

        {/* Snow overlay for Christmas */}
        {HOLIDAY_THEME === "christmas" && (
          <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
        )}
      </div>

      {/* Login Form */}
      <div className={`w-full max-w-md transition-all duration-1000 relative z-10 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className={`backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl border border-white/20 ${getCardClasses()}`}>
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className={`h-16 w-16 rounded-full bg-white/20 flex items-center justify-center ${getLogoClasses()}`}>
                  <span className="text-2xl font-bold">S</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Examen 2 FundaWeb</h1>
              <p className="text-white/80 text-sm">{getGreetingMessage()}</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-100 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-white/90 text-sm font-medium mb-2">
                  Usuario
                </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all duration-200"
                    placeholder="Ingrese su usuario"
                    disabled={loading}
                  />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-white/90 text-sm font-medium mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                    className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all duration-200"
                    placeholder="Ingrese su contraseña"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/20 rounded bg-white/10"
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white/80">
                  Recordarme
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${getButtonClasses()}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-white/60 text-xs">
                © 2024 EXAMEN 2 FUNDAWEB. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="text-white font-medium">Verificando credenciales...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login