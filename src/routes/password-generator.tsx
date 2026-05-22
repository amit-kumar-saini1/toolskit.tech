import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import SeoToolShell from "@/components/seo/SeoToolShell";
import { buildPageHead } from "@/lib/toolHead";

const PasswordGeneratorWidget = lazy(
  () => import("@/components/tools/widgets/PasswordGeneratorWidget"),
);

export const Route = createFileRoute("/password-generator")({
  head: () => {
    const base = buildPageHead({
      title: "Password Generator — Free Strong Random Password Maker",
      description:
        "Free online password generator. Create strong, random, secure passwords with uppercase, lowercase, numbers and symbols. Length up to 64. 100% private.",
      keywords: "password generator, strong password generator, random password generator, secure password maker, online password creator",
      path: "/password-generator",
    });
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What makes a password strong?", acceptedAnswer: { "@type": "Answer", text: "Length matters most. A 16+ character password mixing uppercase, lowercase, numbers and symbols is essentially unbreakable by brute force." } },
        { "@type": "Question", name: "Is this password generator safe?", acceptedAnswer: { "@type": "Answer", text: "Yes. Passwords are generated locally in your browser using the cryptographically secure crypto.getRandomValues() API. Nothing is sent to any server." } },
        { "@type": "Question", name: "How long should a password be?", acceptedAnswer: { "@type": "Answer", text: "12 characters minimum for personal accounts, 16+ for important accounts (email, banking, work), 20+ for admin or recovery passwords." } },
        { "@type": "Question", name: "Should I use the same password everywhere?", acceptedAnswer: { "@type": "Answer", text: "Never. If one site is breached, attackers try the same password on your email, bank and other accounts. Use a password manager and a unique password per site." } },
        { "@type": "Question", name: "Can a strong password be cracked?", acceptedAnswer: { "@type": "Answer", text: "A truly random 16-character password with all character types would take billions of years to crack by brute force at current hardware speeds." } },
      ],
    };
    return { ...base, scripts: [...base.scripts, { type: "application/ld+json", children: JSON.stringify(faqLd) }] };
  },
  component: Page,
});

function Page() {
  return (
    <SeoToolShell
      currentPath="/password-generator"
      h1="Strong Password Generator"
      subtitle="Generate strong, random, secure passwords using cryptographically secure randomness — 100% in your browser, nothing is ever sent to a server."
      tool={
        <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-xl" />}>
          <PasswordGeneratorWidget />
        </Suspense>
      }
      content={
        <>
          <h2>Why You Need a Strong Password</h2>
          <p>
            Over 80% of confirmed data breaches in the last decade involved a weak, reused, or stolen password (Verizon Data Breach Investigations Report). Once an attacker has your password from one breach — and there have been billions of leaked credentials since the LinkedIn, Yahoo, Adobe and Facebook leaks — they will try it on every other site you have an account on. This is called <b>credential stuffing</b> and it is the single most common way personal accounts are taken over today. A strong, unique password per site is your single biggest defence.
          </p>

          <h2>What Makes a Password Strong?</h2>
          <ul>
            <li><b>Length:</b> the single most important factor. Each extra character multiplies the number of brute-force guesses an attacker must try.</li>
            <li><b>Character variety:</b> mix uppercase, lowercase, numbers and special symbols to expand the search space.</li>
            <li><b>True randomness:</b> avoid names, dates, dictionary words, common substitutions (P@ssw0rd), or keyboard patterns (qwerty, 12345).</li>
            <li><b>Uniqueness:</b> a strong password reused on five sites becomes a weak password the moment any one of them leaks.</li>
          </ul>

          <h2>How Long Does It Take to Crack?</h2>
          <p>
            With modern GPUs running about 100 billion guesses per second, here is roughly how long a brute-force attack takes against a fully random password:
          </p>
          <ul>
            <li>8 characters, letters only: a few seconds</li>
            <li>8 characters, all types: ~8 hours</li>
            <li>12 characters, all types: ~34,000 years</li>
            <li>16 characters, all types: ~5 quadrillion years</li>
            <li>20+ characters, all types: longer than the age of the universe</li>
          </ul>
          <p>
            The recommendation is simple: aim for at least 16 characters whenever the site allows it.
          </p>

          <h2>How This Generator Works</h2>
          <p>
            This tool uses the browser's <code>crypto.getRandomValues()</code> API — the same cryptographically secure random number generator used by HTTPS, online banking, and end-to-end encrypted messaging apps. Each character is picked from your chosen pool (lowercase + uppercase + numbers + symbols) with uniform probability. The password is generated entirely on your device — no network request is ever made, so nothing can be intercepted, logged, or leaked.
          </p>

          <h2>How to Use the Password Generator</h2>
          <ol>
            <li>Pick a length (we recommend 16 for most accounts, 20+ for email and banking).</li>
            <li>Enable lowercase, uppercase, numbers and symbols.</li>
            <li>Click <b>Generate Password</b>.</li>
            <li>Click <b>Copy</b> and paste it into the site's password field, then save it in your password manager.</li>
            <li>Regenerate as many times as you like until you get one you are happy with.</li>
          </ol>

          <h2>Use a Password Manager — Always</h2>
          <p>
            Strong, unique passwords are impossible to remember by yourself. That is the entire reason password managers exist. Free, audited options include <b>Bitwarden</b>, the password manager built into <b>Apple iCloud Keychain</b>, <b>Google Password Manager</b>, and the new <b>Firefox Lockwise</b>. Paid options like 1Password, Dashlane and NordPass add team sharing and breach monitoring. Pick one, set a long master password (use 4–5 random words — a <i>passphrase</i>), and let the manager generate and store every other password for you.
          </p>

          <h2>Turn On Two-Factor Authentication (2FA)</h2>
          <p>
            Even the strongest password can be phished. 2FA adds a second proof of identity — usually a 6-digit code from an app like Google Authenticator, Authy, or a hardware key like YubiKey. According to Google, enabling 2FA blocks 99% of automated account-takeover attempts. Always turn it on for: email, banking, social media, work accounts, your password manager itself, and any account that stores money or personal data.
          </p>

          <h2>Passwords to Never Use</h2>
          <ul>
            <li>123456, password, qwerty, abc123, 111111, iloveyou — these top every leaked-password list every year.</li>
            <li>Your name, your partner's name, your child's name, your pet's name.</li>
            <li>Your date of birth, anniversary, or phone number.</li>
            <li>The website name itself (facebook123, gmail2024).</li>
            <li>Anything you have already used on another site.</li>
          </ul>

          <h2>Privacy: Nothing Leaves Your Browser</h2>
          <p>
            We don't log, store, or transmit your generated passwords. The code runs entirely in your browser using JavaScript and the Web Crypto API. You can verify this by opening your browser's Network tab while clicking Generate — you will see zero outgoing requests. For sensitive use cases, you can even disconnect from the internet before generating.
          </p>

          <p className="mt-6">
            More privacy-friendly tools on ToolsKit:
            <Link to="/qr-generator" className="text-primary underline mx-1">QR Code Generator</Link>,
            <Link to="/word-counter" className="text-primary underline mx-1">Word Counter</Link>,
            <Link to="/image-compressor" className="text-primary underline mx-1">Image Compressor</Link>.
          </p>
        </>
      }
    />
  );
}