'use client';

import React from 'react';

interface PasswordStrengthBarProps {
  senha: string;
}

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({ senha }) => {
  const getSenhaScore = (senha: string): number => {
    if (!senha) return 0;
    let score = 0;
    if (senha.length >= 8) score++;
    if (/[a-z]/.test(senha)) score++;
    if (/[A-Z]/.test(senha)) score++;
    if (/\d/.test(senha)) score++;
    if (/[\W_]/.test(senha)) score++;
    return score;
  };

  const score = getSenhaScore(senha);
  const nivel =
    score <= 2 ? 'Fraca' : score === 3 ? 'Média' : 'Forte';

  const cor =
    score <= 2 ? 'bg-red-500 w-2/5' :
    score === 3 ? 'bg-yellow-400 w-3/5' :
    'bg-green-500 w-full';

  const textoCor =
    score <= 2 ? 'text-red-500' :
    score === 3 ? 'text-yellow-500' :
    'text-green-600';

  return senha ? (
    <div className="w-full mt-1 mb-2">
      <div className="h-2 w-full rounded bg-gray-300 overflow-hidden">
        <div className={`h-full rounded transition-all duration-300 ${cor}`} />
      </div>
      <p className={`text-xs mt-1 ${textoCor}`}>
        Nível da senha: {nivel}
      </p>
    </div>
  ) : null;
};

export default PasswordStrengthBar;
