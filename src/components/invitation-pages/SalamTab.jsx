import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function SalamTab({ wording, template }) {
  const { theme, category } = template;

  const getIllustration = () => {
    switch (category) {
      case 'wedding':
        return 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80';
      case 'birthday':
        return 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80';
      case 'graduation':
        return 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80';
      default:
        return 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80';
    }
  };

  const getGreeting = () => {
    switch (category) {
      case 'wedding':
        return 'Assalamu’alaikum Warahmatullahi Wabarakatuh.\n\nDengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.';
      case 'birthday':
        return 'Hai Teman-teman!\n\nTidak terasa usiaku bertambah satu tahun lagi! Aku sangat bersyukur atas segala kebaikan dan kebahagiaan yang telah aku terima. Mari rayakan hari bahagia ini bersamaku!';
      case 'graduation':
        return 'Assalamu’alaikum Warahmatullahi Wabarakatuh / Salam Sejahtera.\n\nDengan rasa syukur yang mendalam atas kelulusan dan keberhasilan akademis yang dicapai, kami mengundang Anda sekalian untuk berbagi kebahagiaan dalam acara syukuran wisuda ini.';
      default:
        return 'Salam hangat dari kami,\n\nKami mengundang Anda sekalian untuk hadir di acara spesial kami.';
    }
  };

  return (
    <Box 
      className="flex flex-col items-center py-6 px-4 w-full text-center"
      style={{ fontFamily: theme.fontBody, color: theme.textColor }}
    >
      <Typography 
        variant="h4" 
        className="mb-6 font-bold"
        style={{ fontFamily: theme.fontHeader, color: theme.primaryColor }}
      >
        Salam & Doa
      </Typography>

      {/* Decorative Image Card */}
      <Paper
        elevation={3}
        className="overflow-hidden mb-8 w-full max-w-sm transition-all duration-300 hover:shadow-lg border border-white/20"
        style={{ 
          borderRadius: category === 'birthday' ? '2.5rem' : '1.25rem',
        }}
      >
        <img 
          src={getIllustration()} 
          alt="Illustration" 
          className="w-full h-48 object-cover transition-transform duration-700 hover:scale-105"
        />
      </Paper>

      {/* Text Greeting */}
      <Paper 
        elevation={2}
        className="p-6 w-full max-w-sm border border-white/20"
        style={{ 
          backgroundColor: theme.cardBg,
          borderRadius: category === 'birthday' ? '2rem' : '1rem',
          color: theme.textColor
        }}
      >
        <Typography 
          variant="body1" 
          className="whitespace-pre-line text-[14px] leading-relaxed text-slate-700"
          style={{ fontFamily: theme.fontBody, color: category === 'graduation' && theme.textColor === '#f8fafc' ? '#e2e8f0' : undefined }}
        >
          {getGreeting()}
        </Typography>

        {wording.message && (
          <Box className="mt-6 pt-6 border-t border-dashed border-slate-200">
            <Typography 
              variant="body2" 
              className="italic text-[13px] text-slate-500 font-medium"
              style={{ color: category === 'graduation' && theme.textColor === '#f8fafc' ? '#94a3b8' : undefined }}
            >
              "{wording.message}"
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
