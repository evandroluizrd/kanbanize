'use client';
import Image from 'next/image';

export default function SocialLoginButtons() {
  return (
    <div className="space-y-3 mb-4">
      <button
        onClick={() => alert('Login com Google (em breve)')}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white rounded-xl py-2 hover:bg-gray-50 transition"
      >
        <Image
          src="/icons/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        <span className="font-medium text-black">Sign in with Google</span>
      </button>

      <button
        onClick={() => alert('Login com GitHub (em breve)')}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white rounded-xl py-2 hover:bg-gray-50 transition"
      >
        <Image
          src="/icons/github.svg"
          alt="GitHub"
          width={20}
          height={20}
        />
        <span className="font-medium text-black">Sign in with GitHub</span>
      </button>
    </div>
  );
}
