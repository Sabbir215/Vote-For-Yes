'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('about.title')}</h3>
            <p className="text-sm">{t('about.description')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('links.title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-green-500 transition-colors">
                  {t('links.home')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-500 transition-colors">
                  {t('links.blog')}
                </Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-green-500 transition-colors">
                  {t('links.media')}
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-green-500 transition-colors">
                  {t('links.volunteer')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('contact.title')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@voteyesbd.org" className="hover:text-green-500 transition-colors">
                  info@voteyesbd.org
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t('social.title')}</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/VoteYesBD"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/VoteYesBD"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/VoteYesBD"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p className="flex items-center justify-center gap-1">
            {t('copyright')} • {t('madeWith')} <Heart className="w-4 h-4 text-red-500 fill-current" /> {t('forBangladesh')}
          </p>
        </div>
      </div>
    </footer>
  );
}
