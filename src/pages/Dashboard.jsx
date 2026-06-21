import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Button, Paper, Box, Grid, Card, CardContent, 
  CardActions, IconButton, Dialog, DialogTitle, DialogContent, 
  DialogContentText, DialogActions, Chip, Tooltip, Stack 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import CakeIcon from '@mui/icons-material/Cake';
import HelpIcon from '@mui/icons-material/Help';
import { getInvitations, deleteInvitation } from '../api/storage';

export default function Dashboard() {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    setInvitations(getInvitations());
  }, []);

  const handleDeleteClick = (invitation) => {
    setDeleteTarget(invitation);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteInvitation(deleteTarget.slug);
      setInvitations(getInvitations());
      setDeleteTarget(null);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'wedding':
        return <FavoriteIcon className="text-pink-500" />;
      case 'graduation':
        return <SchoolIcon className="text-emerald-500" />;
      case 'birthday':
        return <CakeIcon className="text-amber-500" />;
      default:
        return <HelpIcon />;
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'wedding': return 'Pernikahan';
      case 'graduation': return 'Kelulusan';
      case 'birthday': return 'Ulang Tahun';
      default: return 'Lainnya';
    }
  };

  const getCelebrantName = (inv) => {
    if (!inv.w) return 'Undangan';
    if (inv.templateId.startsWith('wedding')) {
      return `${inv.w.groomName || ''} & ${inv.w.brideName || ''}`;
    }
    if (inv.templateId.startsWith('graduation')) {
      return inv.w.graduateName || 'Kelulusan';
    }
    if (inv.templateId.startsWith('birthday')) {
      return inv.w.celebrantName || 'Ulang Tahun';
    }
    return 'Undangan';
  };

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Box>
          <Typography variant="h4" component="h1" className="font-extrabold text-indigo-600 mb-1">
            Dashboard Undanganku
          </Typography>
          <Typography variant="body2" className="text-slate-500">
            Kelola dan buat undangan digital premium Anda secara mandiri di sini.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/templates')}
          className="rounded-xl px-5 py-2.5 font-bold shadow-md hover:shadow-lg transition-all"
        >
          Buat Undangan Baru
        </Button>
      </Box>

      {invitations.length === 0 ? (
        <Paper elevation={0} variant="outlined" className="py-20 px-8 text-center rounded-3xl bg-slate-50 border-dashed border-2 border-slate-200">
          <Box className="max-w-md mx-auto">
            <Typography variant="h2" className="mb-4">✉️</Typography>
            <Typography variant="h5" className="font-bold text-slate-800 mb-2">
              Belum Ada Undangan
            </Typography>
            <Typography variant="body2" className="text-slate-500 mb-6">
              Buat undangan digital pertamamu sekarang! Pilih dari template premium wedding, graduation, atau birthday kami yang indah.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => navigate('/templates')}
              className="rounded-xl px-6 py-3 font-bold"
            >
              Mulai Buat Undangan
            </Button>
          </Box>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {invitations.map((inv) => {
            const isWedding = inv.templateId.startsWith('wedding');
            const isGrad = inv.templateId.startsWith('graduation');
            const category = isWedding ? 'wedding' : isGrad ? 'graduation' : 'birthday';
            
            return (
              <Grid item xs={12} sm={6} md={4} key={inv.slug}>
                <Card className="rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white">
                  <CardContent className="flex-1 pb-2">
                    <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-4">
                      <Chip 
                        icon={getCategoryIcon(category)}
                        label={getCategoryLabel(category)} 
                        size="small" 
                        className="font-semibold bg-slate-50 text-slate-700"
                      />
                      <Typography variant="caption" className="text-slate-400">
                        {inv.createdAt ? new Date(inv.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                      </Typography>
                    </Stack>
                    
                    <Typography variant="h6" className="font-bold text-slate-800 mb-1 line-clamp-1">
                      {getCelebrantName(inv)}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      className="text-indigo-600 font-medium mb-3 truncate block cursor-pointer"
                      onClick={() => window.open(`/invitation/${inv.slug}`, '_blank')}
                    >
                      undanganku.com/{inv.slug}
                    </Typography>

                    <Typography variant="body2" className="text-slate-500 line-clamp-2 min-h-[40px]">
                      {inv.w?.location || 'Lokasi belum ditentukan'}
                    </Typography>
                  </CardContent>
                  
                  <CardActions className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex justify-between">
                    <Button 
                      size="small" 
                      color="primary" 
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/editor/${inv.slug}`)}
                      className="font-bold rounded-lg"
                    >
                      Edit Wording
                    </Button>
                    <Box>
                      <Tooltip title="Lihat Halaman Tamu">
                        <IconButton 
                          size="small" 
                          color="info" 
                          onClick={() => window.open(`/invitation/${inv.slug}`, '_blank')}
                          className="mr-1"
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Hapus Undangan">
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleDeleteClick(inv)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Dialog Konfirmasi Hapus */}
      <Dialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        PaperProps={{ className: 'rounded-2xl p-2' }}
      >
        <DialogTitle className="font-bold text-slate-800 pb-2">Hapus Undangan?</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-slate-600">
            Apakah Anda yakin ingin menghapus undangan untuk <strong>{deleteTarget ? getCelebrantName(deleteTarget) : ''}</strong>? Tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="px-6 pb-4">
          <Button onClick={() => setDeleteTarget(null)} color="inherit" className="rounded-lg">
            Batal
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" className="rounded-lg bg-red-600 hover:bg-red-700">
            Hapus Permanen
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
