import React from 'react';
import { FOOTER_CONTENT } from '../../utils/constants';
import { FaGithub, FaInstagram } from 'react-icons/fa';

type SocialIconName = (typeof FOOTER_CONTENT.socials)[number]['icon'];

const SOCIAL_ICONS: Record<SocialIconName, React.ComponentType<{ size?: number }>> = {
  instagram: FaInstagram,
  github: FaGithub,
};

interface ProfileCardProps {
  name: string;
  nim: string;
  imageUrl?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, nim, imageUrl }) => {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="bg-[#0b0b0b] border border-gray-800 rounded-sm p-4 text-center transition-transform duration-300 hover:-translate-y-1 hover:border-[#f7931e]/60">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={`Profile of ${name}`} 
          className="mx-auto mb-3 h-14 w-14 rounded-full border-2 border-[#f7931e]/60 object-cover bg-[#131313]"
        />
      ) : (
        <div className="mx-auto mb-3 h-14 w-14 rounded-full border-2 border-[#f7931e]/60 bg-[#131313] flex items-center justify-center font-bold tracking-widest text-[#f7931e]">
          {initials}
        </div>
      )}
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-100">{name}</h3>
      <p className="text-xs text-gray-500 tracking-wider mt-1">{nim}</p>
    </article>
  );
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-800/60 mt-10 bg-[#080808]/90 backdrop-blur-sm z-10 relative">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {FOOTER_CONTENT.profiles.map((profile) => (
            <ProfileCard 
              key={profile.nim} 
              name={profile.name} 
              nim={profile.nim} 
              imageUrl={profile.imageUrl}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-5 mb-5">
          {FOOTER_CONTENT.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];

            return (
              <a
                key={social.icon}
                href={social.url}
                aria-label={social.icon}
                className="text-gray-400 hover:text-[#f7931e] transition-colors duration-300"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

        <p className="text-center text-gray-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase">
          &copy; {currentYear} {FOOTER_CONTENT.copyright}
        </p>
        <p className="text-center mt-2 text-[10px] sm:text-xs font-bold tracking-widest text-[#f7931e] uppercase">
          POWERED BY {FOOTER_CONTENT.brand.primary} 
          <span className="text-gray-500 px-2 font-light">{FOOTER_CONTENT.brand.separator}</span> 
          <span className="text-[#ff003c]">{FOOTER_CONTENT.brand.secondary}</span>
        </p>
      </div>
    </footer>
  );
};