import React from 'react';
import { useEmotionalResonance } from '../hooks/useEmotionalResonance';
import { EmotionalState, ResonanceResult } from '../types/emotional';
import { CircularProgress, Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const ResonanceValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

interface EmotionalResonanceDisplayProps {
  emotionalState: EmotionalState;
  context?: string;
  onResonanceChange?: (result: ResonanceResult) => void;
}

export const EmotionalResonanceDisplay: React.FC<EmotionalResonanceDisplayProps> = ({
  emotionalState,
  context = '',
  onResonanceChange,
}) => {
  const {
    resonanceResult,
    isProcessing,
    error,
    processEmotionalState,
  } = useEmotionalResonance({ onResonanceChange });

  React.useEffect(() => {
    const processState = async () => {
      if (emotionalState) {
        await processEmotionalState(emotionalState, context);
      }
    };
    processState();
  }, [emotionalState, context, processEmotionalState]);

  React.useEffect(() => {
    if (resonanceResult && onResonanceChange) {
      onResonanceChange(resonanceResult);
    }
  }, [resonanceResult, onResonanceChange]);

  if (isProcessing) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <StyledPaper>
        <Typography color="error">Error: {error.message}</Typography>
      </StyledPaper>
    );
  }

  if (!resonanceResult) {
    return null;
  }

  return (
    <StyledPaper elevation={3}>
      <Grid container spacing={2}>
        <Grid>
          <Typography variant="h6" gutterBottom>
            Emotional Resonance Analysis
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle2" color="textSecondary">
            Resonance
          </Typography>
          <ResonanceValue>
            {(resonanceResult.resonance * 100).toFixed(1)}%
          </ResonanceValue>
        </Grid>
        <Grid>
          <Typography variant="subtitle2" color="textSecondary">
            Coherence
          </Typography>
          <ResonanceValue>
            {(resonanceResult.coherence * 100).toFixed(1)}%
          </ResonanceValue>
        </Grid>
        <Grid>
          <Typography variant="subtitle2" color="textSecondary">
            Adaptation
          </Typography>
          <ResonanceValue>
            {(resonanceResult.adaptation * 100).toFixed(1)}%
          </ResonanceValue>
        </Grid>
        <Grid>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Response
          </Typography>
          <Typography variant="body1">
            {resonanceResult.response.text}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Intensity: {(resonanceResult.response.intensity * 100).toFixed(1)}%
          </Typography>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}; 