import { Link } from "@tanstack/react-router";
import qualipartoLogo from "@/assets/qualiparto-logo.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center" aria-label="QualiParto">
      <img
        src={qualipartoLogo}
        alt="QualiParto"
        className={`h-9 w-auto ${light ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}