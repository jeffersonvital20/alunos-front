import { Api } from '../axios-config';

export interface totalAlunos{
    totalAlunos: number;
};

export interface IListagemAlunos{
    id: string;
    nome: string;
    email: string;
    idade: number;
}

const getTotalAlunos = async (): Promise<totalAlunos | Error> => {
  try {
    const { data } = await Api.get(`api/Aluno/TotalAlunos`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const getAlunos = async (): Promise<IListagemAlunos | Error> => {
    try{
        const { data } = await Api.get('/api/Aluno');

         if (data) {
          return (
            data
            );
        }    
      return new Error('Erro ao listar os registros.');

    }catch(error){
        return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
    }
    
};

const deleteAlunos = async(id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/api/Aluno?id=${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

export const AlunosService = {
  getTotalAlunos,
  getAlunos,
  deleteAlunos,
};