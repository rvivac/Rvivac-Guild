import logoAsset from "@/assets/rvivac-guild-logo-transparent.png.asset.json";

type AnimatedLogoProps = {
  className?: string;
};

export function AnimatedLogo({ className = "" }: AnimatedLogoProps) {
  return (
    <div
      className={`animated-logo ${className}`.trim()}
      role="img"
      aria-label="Logotipo animado RVIVAC GUILD"
    >
      <div className="brand-slice brand-symbol" aria-hidden="true">
        <img src={logoAsset.url} alt="" draggable={false} />
      </div>
      <div className="brand-slice brand-name" aria-hidden="true">
        <img src={logoAsset.url} alt="" draggable={false} />
      </div>
      <div className="brand-slice brand-guild" aria-hidden="true">
        <img src={logoAsset.url} alt="" draggable={false} />
      </div>
    </div>
  );
}