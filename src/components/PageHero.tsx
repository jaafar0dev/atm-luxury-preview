interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export const PageHero = ({ title, subtitle, backgroundImage }: PageHeroProps) => {
  return (
    <div className="page-hero" style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground animate-bounce-text">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
