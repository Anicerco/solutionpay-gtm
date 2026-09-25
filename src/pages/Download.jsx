import { Box, Container, Stack, Typography } from '@mui/material';
import StoreButtons from '../components/StoreButtons';
import { useI18n } from '../i18n';

export default function Download() {
  const { t } = useI18n();
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: { xs: 38, md: 56 } }}>
        {t('download.titleA')}<Box component="span" sx={{ color: 'primary.main' }}>Solution Pay</Box>
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 2 }}>{t('download.text')}</Typography>
      <Stack alignItems="center" sx={{ mt: 5 }}>
        <StoreButtons placement="download_page" />
      </Stack>
    </Container>
  );
}
