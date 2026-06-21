import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material';
import { templates } from '../api/mockData';

export default function PreviewSection() {
  const { templateId, wording } = useSelector((state) => state.invitation);
  const selectedTemplate = templates.find((t) => t.id === templateId);

  if (!selectedTemplate) {
    return (
      <Paper elevation={0} variant="outlined" className="h-full min-h-[400px] flex items-center justify-center rounded-2xl bg-slate-50 border-dashed border-2">
        <Typography className="text-slate-400 font-medium">
          Pilih template untuk melihat pratinjau
        </Typography>
      </Paper>
    );
  }

  const { theme, category } = selectedTemplate;

  // Formatting date for Indonesian display
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Tanggal Belum Ditentukan';
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <Paper 
      elevation={4} 
      className="w-full max-w-[360px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-800 aspect-[9/16] relative flex flex-col justify-between p-6 transition-all duration-500"
      style={{ 
        background: theme.backgroundColor,
        fontFamily: theme.fontBody,
        color: theme.textColor
      }}
    >
      {/* Decorative top border */}
      <Box className="text-center mt-4">
        {theme.dividerStyle === 'floral' && <Typography className="text-2xl" style={{ color: theme.secondaryColor }}>✿ ┈┈┈┈ ✿</Typography>}
        {theme.dividerStyle === 'hearts' && <Typography className="text-2xl" style={{ color: theme.secondaryColor }}>♥ ┈┈┈┈ ♥</Typography>}
        {theme.dividerStyle === 'gold-line' && <Box className="h-0.5 w-16 mx-auto my-2" style={{ backgroundColor: theme.secondaryColor }} />}
      </Box>

      {/* Main Content Card */}
      <Box 
        className="rounded-2xl p-6 my-auto text-center shadow-sm"
        style={{ backgroundColor: theme.cardBg }}
      >
        {category === 'wedding' && (
          <Box>
            <Typography variant="overline" className="tracking-widest font-bold uppercase text-[10px] text-slate-500">
              The Wedding of
            </Typography>
            <Typography 
              variant="h4" 
              className="my-4 font-bold"
              style={{ fontFamily: theme.fontHeader, color: theme.primaryColor }}
            >
              {(wording.groomName || 'Pria') + ' & ' + (wording.brideName || 'Wanita')}
            </Typography>
          </Box>
        )}

        {category === 'birthday' && (
          <Box>
            <Typography variant="overline" className="tracking-widest font-bold uppercase text-[10px] text-slate-500">
              You are invited to the {wording.age ? `${wording.age}th` : ''} Birthday of
            </Typography>
            <Typography 
              variant="h4" 
              className="my-4 font-bold"
              style={{ fontFamily: theme.fontHeader, color: theme.primaryColor }}
            >
              {wording.celebrantName || 'Nama Ulang Tahun'}
            </Typography>
          </Box>
        )}

        {category === 'graduation' && (
          <Box>
            <Typography variant="overline" className="tracking-widest font-bold uppercase text-[10px] text-slate-500">
              Happy Graduation Celebration of
            </Typography>
            <Typography 
              variant="h4" 
              className="my-4 font-bold"
              style={{ fontFamily: theme.fontHeader, color: theme.primaryColor }}
            >
              {wording.graduateName || 'Nama Wisudawan'}
            </Typography>
            <Typography variant="subtitle2" className="italic font-medium text-slate-600 mb-2">
              {wording.degree || 'Gelar / Jurusan'}
            </Typography>
            <Typography variant="body2" className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
              {wording.school || 'Sekolah / Universitas'}
            </Typography>
          </Box>
        )}

        <Box className="my-4">
          <Typography variant="body2" className="font-semibold text-[13px]">
            {formatDate(wording.date)}
          </Typography>
          <Typography variant="caption" className="text-slate-500 block mt-1">
            {wording.time || 'Waktu Acara'}
          </Typography>
        </Box>

        <Box className="my-2 border-t border-slate-100 pt-3">
          <Typography variant="caption" className="text-slate-400 block uppercase tracking-widest text-[9px]">
            Lokasi
          </Typography>
          <Typography variant="body2" className="font-medium text-[12px] line-clamp-2">
            {wording.location || 'Detail Lokasi Acara'}
          </Typography>
        </Box>

        <Box className="mt-4 pt-3 border-t border-dashed border-slate-200">
          <Typography variant="body2" className="italic text-[11px] text-slate-500">
            "{wording.message}"
          </Typography>
        </Box>
      </Box>

      {/* Decorative bottom border */}
      <Box className="text-center mb-4">
        {theme.dividerStyle === 'floral' && <Typography className="text-2xl" style={{ color: theme.secondaryColor }}>✿ ┈┈┈┈ ✿</Typography>}
        {theme.dividerStyle === 'hearts' && <Typography className="text-2xl" style={{ color: theme.secondaryColor }}>♥ ┈┈┈┈ ♥</Typography>}
        {theme.dividerStyle === 'gold-line' && <Box className="h-0.5 w-16 mx-auto my-2" style={{ backgroundColor: theme.secondaryColor }} />}
      </Box>
    </Paper>
  );
}
