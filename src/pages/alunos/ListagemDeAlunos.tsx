import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDeListagem } from "../../shared/component/ferramentas-da-listagem/FerramentaDaListagem";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo, useState } from "react";
import { AlunosService, IListagemAlunos } from "../../services/api/alunos/alunosService";
import { useDebounce } from "../../shared/hooks";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../shared/environment";


export const ListagemDeAlunos: React.FC = () => {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    const [rows, setRows] = useState<IListagemAlunos[]>([]);
    const [isLoading, setIsLoading] = useState(true);    
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            AlunosService.getAlunos()
                .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                } else {                    
                    setRows(Array.isArray(result) ? result : [result]);
                }
                });
            AlunosService.getTotalAlunos()
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                } else if (typeof result === 'number') {
                    setTotalCount(result);
                } else {
                    setTotalCount(0);
                }
            });
        });
    }, [busca, pagina, debounce]);


    const handleDelete = (id: string) => {
    if (confirm('Realmente deseja apagar?')) {
      AlunosService.deleteAlunos(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id),
            ]);
            alert('Registro apagado com sucesso!');
          }
        });
    }
  };

    return (
        <LayoutBaseDePagina
            titulo="Listagem de alunos"
            barraDeFerramentas={
                <FerramentasDeListagem
                    mostrarInputBusca
                    textoDaBusca={busca}
                    textoBotaoNovo="Novo Aluno"
                    aoClicaremNovo={() => navigate('/contas/detalhe/nova')}
                    aoMudarTextDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell width={100}>Ações</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>idade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                    <TableRow key={row.id}>
                        <TableCell>
                            <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                <Icon className="material-symbols-outlined">delete</Icon>
                            </IconButton>
                            <IconButton size="small" onClick={() => navigate(`/contas/detalhe/${row.id}`)}>
                                <Icon className="material-symbols-outlined">edit</Icon>
                            </IconButton>                        
                        </TableCell>
                        <TableCell>{row.nome}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.idade}</TableCell>                       
                    </TableRow>
                    ))}
                </TableBody>

                {totalCount === 0 && !isLoading && (
                    <caption>{Environment.LISTAGEM_VAZIA}</caption>
                )}

                <TableFooter>
                    {isLoading && (
                    <TableRow>
                        <TableCell colSpan={3}>
                        <LinearProgress variant='indeterminate' />
                        </TableCell>
                    </TableRow>
                    )}
                    {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                    <TableRow>
                        <TableCell colSpan={3}>
                        <Pagination
                            page={pagina}
                            count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                            onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                        />
                        </TableCell>
                    </TableRow>
                    )}
                </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
            
    );
}