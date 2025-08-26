import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CalendarMonth as CalendarIcon,
  Add as AddIcon
} from '@mui/icons-material';

interface NavbarProps {
  currentView: 'board' | 'calendar';
  onViewChange: (view: 'board' | 'calendar') => void;
  onAddTask: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  onAddTask
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          TaskFlow
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={!isMobile ? <DashboardIcon /> : undefined}
            onClick={() => onViewChange('board')}
            variant={currentView === 'board' ? 'outlined' : 'text'}
            sx={{
              backgroundColor: currentView === 'board' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            {isMobile ? <DashboardIcon /> : 'Tablero'}
          </Button>
          
          <Button
            color="inherit"
            startIcon={!isMobile ? <CalendarIcon /> : undefined}
            onClick={() => onViewChange('calendar')}
            variant={currentView === 'calendar' ? 'outlined' : 'text'}
            sx={{
              backgroundColor: currentView === 'calendar' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            {isMobile ? <CalendarIcon /> : 'Calendario'}
          </Button>

          <Button
            color="inherit"
            startIcon={!isMobile ? <AddIcon /> : undefined}
            onClick={onAddTask}
            variant="outlined"
            sx={{
              ml: 1,
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              }
            }}
          >
            {isMobile ? <AddIcon /> : 'Nueva Tarea'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};