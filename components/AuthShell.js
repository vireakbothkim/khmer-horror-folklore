// Split layout for the login and signup pages.
// Left: the dark archive photo with a short quote over it (hidden below lg).
// Right: the form. The quote uses the Khmer font when lang is "km".
export default function AuthShell({ quote, lang, children }) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1280px] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border lg:sticky lg:top-0 lg:block lg:h-[calc(100vh-6rem)] lg:self-start">
        <img
          src="/images/haunted-house.avif"
          alt="An old brick house at night, surrounded by bare trees"
          className="absolute inset-0 size-full object-cover opacity-60 grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
        <p
          lang={lang}
          className="absolute right-12 bottom-12 left-12 m-0 text-2xl leading-snug italic text-text-primary"
        >
          “{quote}”
        </p>
      </div>

      <div className="flex items-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
