import {Localizacao} from './localizacao.model';
export class Itinerario {
  constructor(

    public codigo: string,
    public idlinha: string,
    public nome: string,
    public localizacao: Localizacao
  ) {
  }
}
