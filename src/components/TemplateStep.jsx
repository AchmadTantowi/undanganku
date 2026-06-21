import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Grid, Tabs, Tab } from '@mui/material';
import { templates } from '../api/mockData';
import { setTemplate } from '../store/invitationSlice';

export default function TemplateStep() {
  const dispatch = useDispatch();
  const selectedTemplateId = useSelector((state) => state.invitation.templateId);
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredTemplates = activeTab === 'all'
    ? templates
    : templates.filter(t => t.category === activeTab);

  return (
    <Box>
      <Typography variant="h5" component="h2" className="font-bold text-slate-800 mb-2">
        Pilih Template Undangan
      </Typography>
      <Typography variant="body2" className="text-slate-500 mb-6">
        Pilih desain dasar yang paling sesuai dengan tema acara Anda.
      </Typography>

      <Box className="border-b border-divider mb-6">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="Kategori Undangan" textColor="primary" indicatorColor="primary">
          <Tab value="all" label="Semua Tema" />
          <Tab value="wedding" label="Pernikahan" />
          <Tab value="birthday" label="Ulang Tahun" />
          <Tab value="graduation" label="Kelulusan" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredTemplates.map((tpl) => {
          const isSelected = selectedTemplateId === tpl.id;
          return (
            <Grid item xs={12} sm={6} key={tpl.id}>
              <Card 
                className={`transition-all duration-300 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border-2 ${
                  isSelected ? 'border-indigo-600 scale-[1.02]' : 'border-transparent'
                }`}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={tpl.thumbnail}
                  alt={tpl.name}
                  className="h-48 object-cover"
                />
                <CardContent className="bg-white">
                  <Typography variant="h6" component="h3" className="font-bold text-slate-800">
                    {tpl.name}
                  </Typography>
                  <Typography variant="caption" className="text-indigo-600 uppercase font-bold tracking-wider">
                    {tpl.category === 'wedding' ? 'Pernikahan' : tpl.category === 'birthday' ? 'Ulang Tahun' : 'Kelulusan'}
                  </Typography>
                </CardContent>
                <CardActions className="bg-slate-50 px-4 py-3 flex justify-between">
                  <Button 
                    variant={isSelected ? "contained" : "outlined"}
                    color={isSelected ? "primary" : "inherit"}
                    onClick={() => dispatch(setTemplate(tpl.id))}
                    className="rounded-xl px-4"
                    fullWidth
                  >
                    {isSelected ? 'Terpilih' : 'Pilih Desain'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
