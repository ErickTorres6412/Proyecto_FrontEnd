"use client"

const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(79, 130, 177, 0.2);
          border-radius: 50%;
          border-top-color: var(--color-primary);
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner
