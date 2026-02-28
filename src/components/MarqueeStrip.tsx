const MarqueeStrip = () => {
  const text = "Discretion ✦ Excellence ✦ Exclusivity ✦ Premium ✦ Professional ✦ ";
  const repeatedText = text.repeat(6);

  return (
    <div className="overflow-hidden py-4 bg-emerald-gradient border-y border-primary/20">
      <div className="marquee-strip whitespace-nowrap">
        <span className="font-elegant text-sm md:text-base tracking-[0.3em] uppercase text-primary">
          {repeatedText}
        </span>
      </div>
    </div>
  );
};

export default MarqueeStrip;
