import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

//import { FerramentasDeListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeListagem } from '../../shared/component/ferramentas-da-listagem/FerramentaDaListagem';
import { AlunosService } from '../../services/api/alunos/alunosService';


export const Dashboard = () => {
  const [isLoadingContas, setIsLoadingContas] = useState(true);
  const [totalAlunos, settotalAlunos] = useState(0);

  useEffect(() => {
    setIsLoadingContas(true);

    AlunosService.getTotalAlunos()
      .then((result) => {
        setIsLoadingContas(false);

        if (result instanceof Error) {
          alert(result.message);
        } else if (typeof result === 'number') {
          settotalAlunos(result);
        } else {
          settotalAlunos(0);
        }
      });
  }, []);


  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      barraDeFerramentas={<FerramentasDeListagem mostrarBotaoNovo={false} />}
    >
      <Box width='100%' display='flex'>
        <Grid container margin={2}>
          <Grid container spacing={2}>
            <Card>
                <CardContent>
                  <Typography variant='h5' align='center'>
                    Total de Alunos
                  </Typography>

                  <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                    {!isLoadingContas && (
                      <Typography variant='h1'>
                        {totalAlunos}
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
            
            {/* <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>

              

            </Grid>             */}

          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
