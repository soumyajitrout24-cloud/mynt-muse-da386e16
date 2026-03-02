const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] overflow-hidden bg-gradient-to-br from-[#022c22] via-[#064e3b] to-black">

      {/* Royal Gold Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Logo */}
      <img
        src="/logoo.png"
        alt="Mynt Girlfriend"
        className="w-44 md:w-60 mb-10 drop-shadow-[0_0_35px_rgba(255,215,0,0.6)]"
      />

      {/* Welcome Text */}
      <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-yellow-400 mb-2">
        Welcome to
      </h1>

      <h2 className="text-xl md:text-2xl text-emerald-100 tracking-[0.3em] uppercase mb-12">
        Mynt Girlfriend
      </h2>

      {/* Royal Loading Indicator */}
      <div className="flex gap-4">
        <span className="w-3 h-3 rounded-full bg-yellow-400 animate-bounce shadow-[0_0_20px_rgba(255,215,0,0.9)]"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400 animate-bounce delay-150 shadow-[0_0_20px_rgba(255,215,0,0.9)]"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400 animate-bounce delay-300 shadow-[0_0_20px_rgba(255,215,0,0.9)]"></span>
      </div>

      {/* Royal Tagline */}
      <p className="absolute bottom-10 text-emerald-200/70 tracking-[0.4em] text-xs uppercase">
        Luxury • Elegance • Desire
      </p>

    </div>
  );
};

export default Loader;