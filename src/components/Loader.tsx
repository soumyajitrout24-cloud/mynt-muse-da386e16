const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] overflow-hidden bg-gradient-to-br from-[#022c22] via-[#064e3b] to-black px-4">

      {/* Metallic Ambient Glow */}
      <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gold/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Logo */}
      <img
        src="/logoo.png"
        alt="Mynt Girlfriend"
        className="w-28 sm:w-36 md:w-60 mb-6 md:mb-10 drop-shadow-[0_0_25px_hsl(var(--gold)/0.7)]"
      />

      {/* Welcome Text */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wide gold-metallic mb-1 md:mb-2">
        Welcome to
      </h1>

      <h2 className="text-base sm:text-lg md:text-2xl gold-metallic tracking-[0.3em] uppercase mb-8 md:mb-12">
        Mynt Girlfriend
      </h2>

      {/* Loading Dots */}
      <div className="flex gap-3 md:gap-4">
        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gold animate-bounce shadow-[0_0_20px_hsl(var(--gold)/0.8)]"></span>
        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gold animate-bounce delay-150 shadow-[0_0_20px_hsl(var(--gold)/0.8)]"></span>
        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gold animate-bounce delay-300 shadow-[0_0_20px_hsl(var(--gold)/0.8)]"></span>
      </div>

      {/* Tagline */}
      <p className="absolute bottom-6 md:bottom-10 text-gold/70 tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs uppercase">
        Luxury • Elegance • Desire
      </p>

    </div>
  );
};

export default Loader;
