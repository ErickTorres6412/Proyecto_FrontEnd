"use client"

export const Header = ({ title, subtitle }) => (
  <div
    className="px-6 py-4 rounded-t-lg border-b-2 shadow-md transition-all duration-300"
    style={{
      background: "var(--gradient-navbar)",
      borderColor: "var(--color-primary-dark)",
    }}
  >
    <h2 className="text-2xl font-bold tracking-wide animate-fadeIn" style={{ color: "var(--color-text-light)" }}>
      {title}
    </h2>
    {subtitle && (
      <p
        className="mt-1 text-sm font-medium animate-slideUp"
        style={{ color: "var(--color-text-light)", opacity: 0.9 }}
      >
        {subtitle}
      </p>
    )}
    <style jsx>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 0.9; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease forwards;
      }
      .animate-slideUp {
        animation: slideUp 0.5s ease forwards;
        animation-delay: 0.2s;
        opacity: 0;
      }
    `}</style>
  </div>
)
