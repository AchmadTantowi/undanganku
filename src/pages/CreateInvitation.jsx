import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Paper, Box, Stepper, Step, StepLabel, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import TemplateStep from '../components/TemplateStep';
import WordingStep from '../components/WordingStep';
import MusicStep from '../components/MusicStep';
import PreviewSection from '../components/PreviewSection';
import { nextStep, prevStep, resetWizard } from '../store/invitationSlice';

const steps = ['Pilih Template', 'Custom Wording', 'Pilih Musik'];

export default function CreateInvitation() {
  const dispatch = useDispatch();
  const { step, templateId, wording, musicId } = useSelector((state) => state.invitation);
  const [openLinkDialog, setOpenLinkDialog] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  const handleSave = () => {
    // Pack all details into one object
    const invitationData = {
      t: templateId,
      w: wording,
      m: musicId
    };

    // Base64 encode the stringified data
    const jsonStr = JSON.stringify(invitationData);
    const base64Data = btoa(unescape(encodeURIComponent(jsonStr)));
    
    // Build full URL
    const baseUrl = window.location.origin;
    const shareableUrl = `${baseUrl}/invitation?data=${base64Data}`;
    
    setGeneratedLink(shareableUrl);
    setOpenLinkDialog(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    // Simple alert or feedback
  };

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <TemplateStep />;
      case 1:
        return <WordingStep />;
      case 2:
        return <MusicStep />;
      default:
        return <Typography>Langkah tidak dikenal</Typography>;
    }
  };

  return (
    <Container maxWidth="xl" className="py-10">
      <Box className="mb-8 text-center">
        <Typography variant="h4" component="h1" className="font-extrabold text-indigo-600 mb-2">
          Buat Undangan Digital Anda
        </Typography>
        <Typography variant="body1" className="text-slate-500">
          Selesaikan 3 langkah mudah berikut untuk menghasilkan link undangan premium yang siap dibagikan.
        </Typography>
      </Box>

      <Paper elevation={0} variant="outlined" className="p-6 rounded-3xl bg-white mb-8">
        <Stepper activeStep={step} alternativeLabel className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4} className="mt-2">
          {/* Form Step Content */}
          <Grid item xs={12} md={7}>
            <Box className="min-h-[450px] flex flex-col justify-between">
              <Box>{renderStepContent(step)}</Box>

              <Box className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                <Button
                  disabled={step === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                  variant="text"
                  className="rounded-xl px-4"
                >
                  Kembali
                </Button>
                
                {step < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={step === 0 && !templateId}
                    endIcon={<ArrowForwardIcon />}
                    className="rounded-xl px-6"
                  >
                    Lanjut
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    disabled={!templateId || !musicId}
                    startIcon={<SaveIcon />}
                    className="rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700"
                  >
                    Simpan & Dapatkan Link
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Live Preview Content */}
          <Grid item xs={12} md={5} className="flex justify-center items-start">
            <Box className="w-full">
              <Typography variant="h6" className="text-center font-bold text-slate-700 mb-4">
                Pratinjau Langsung
              </Typography>
              <PreviewSection />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Share Link Dialog */}
      <Dialog open={openLinkDialog} onClose={() => setOpenLinkDialog(false)} maxWidth="sm" fullWidth className="rounded-3xl">
        <DialogTitle className="font-bold text-slate-800">Undangan Berhasil Dibuat!</DialogTitle>
        <DialogContent>
          <Typography variant="body2" className="text-slate-500 mb-4">
            Salin tautan di bawah ini untuk dibagikan kepada kerabat dan keluarga Anda. Tautan ini dinamis dan sudah berisi seluruh informasi serta lagu latar pilihan Anda.
          </Typography>
          <Box className="flex gap-2 items-center">
            <TextField
              value={generatedLink}
              fullWidth
              variant="outlined"
              size="small"
              InputProps={{ readOnly: true }}
              className="bg-slate-50"
            />
            <Button
              variant="contained"
              onClick={handleCopyLink}
              startIcon={<ContentCopyIcon />}
              className="rounded-xl px-4 py-2"
            >
              Salin
            </Button>
          </Box>
        </DialogContent>
        <DialogActions className="px-6 pb-6">
          <Button onClick={() => {
            setOpenLinkDialog(false);
            dispatch(resetWizard());
          }} color="primary" variant="outlined" className="rounded-xl">
            Buat Baru
          </Button>
          <Button onClick={() => setOpenLinkDialog(false)} color="inherit" className="rounded-xl">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
