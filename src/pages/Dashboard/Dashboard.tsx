import { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

//import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeListagem } from '../../shared/component/ferramentas-da-listagem/FerramentaDaListagem';


export const Dashboard = () => {
  const [isLoadingContas, setIsLoadingContas] = useState(true);
  const [totalCountContas, setTotalCountContas] = useState(0);



  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      barraDeFerramentas={<FerramentasDeListagem mostrarBotaoNovo={false} />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid item container spacing={2}>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Contas
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingContas && (
                      <Typography variant='h1'>
                        {totalCountContas}
                      </Typography>
                    )}
                    {isLoadingContas && (
                      <Typography variant='h6'>
                        Carregando...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

            </Grid>            

          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
