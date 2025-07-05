import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-32 h-8">
        <Image
          src="http://grupoalternative.com/wp-content/uploads/2025/07/LOGO-HORIZONTAL-ALTERNATIVE-original.svg"
          alt="Grupo Alternative Logo"
          width={158}
          height={32}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
} 