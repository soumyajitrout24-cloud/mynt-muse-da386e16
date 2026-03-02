const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-gradient-to-br from-emerald-900 via-emerald-800 to-black overflow-hidden">

      {/* Luxury Glow Background Effect */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-400 opacity-10 rounded-full blur-3xl animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative flex flex-col items-center backdrop-blur-xl bg-white/5 border border-yellow-400/20 rounded-3xl px-12 py-14 shadow-2xl">

        {/* Logo with Glow Ring */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping opacity-40"></div>
          <img
            src="/logoo.png"
            alt="Mynt Girlfriend"
            className="w-40 md:w-56 drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]"
          />
        </div>

        {/* Welcome Text */}
        <h1 className="text-2xl md:text-3xl font-semibold text-yellow-400 tracking-wide mb-2">
          Welcome to
        </h1>

        <h2 className="text-xl md:text-2xl text-white font-light mb-10">
          Mynt Girlfriend
        </h2>

        {/* Premium Loader Dots */}
        <div className="flex gap-4">
          <span className="w-3 h-3 rounded-full bg-yellow-400 animate-bounce shadow-[0_0_15px_rgba(255,215,0,0.9)]"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400 animate-bounce delay-150 shadow-[0_0_15px_rgba(255,215,0,0.9)]"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400 animate-bounce delay-300 shadow-[0_0_15px_rgba(255,215,0,0.9)]"></span>
        </div>

        {/* Subtle Tagline */}
        <p className="text-xs text-gray-300 mt-8 tracking-widest uppercase">
          Crafting Luxury Experiences
        </p>
      </div>
    </div>
  );
};

export default Loader;