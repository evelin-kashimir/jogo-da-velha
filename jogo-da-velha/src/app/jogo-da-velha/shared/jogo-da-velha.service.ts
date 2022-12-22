import { Injectable } from '@angular/core';

/** Serviço responsável pela parte lógica do jogo da velha
 * 
 * @author Evelin Ferraz
 * @since 22/12/2022
 */
@Injectable({
  providedIn: 'root'
})
export class JogoDaVelhaService {

  private readonly TAM_TAB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly VAZIO: number = 0;

  private tabuleiro: any;
  private numMovimentos: number;
  private vitoria: any;

  private _jogador: number;
  private _showInicio: boolean;
  private _showTabuleiro: boolean;
  private _showFinal: boolean;

  constructor() { }

  /** Inicializa o jogo */
  inicializar(): void {
    this._showInicio = true;
    this._showTabuleiro = false;
    this._showFinal = false;
    this._jogador= this.X;
    this.numMovimentos = 0;
    this.vitoria = false;
    this.inicializarTabuleiro();
  }

  /** Inicializa o tabuleiro do jogo com os campos vazios */
  inicializarTabuleiro(): void {
    this.tabuleiro = [this.TAM_TAB];
    for(let campo of this.tabuleiro){
      campo = [this.VAZIO, this.VAZIO, this.VAZIO];
    }
  }

  /** Método acessor para retornar se o jogo foi iniciado ou não */
  get showInicio(): boolean {
    return this.showInicio;
  }

  /** Método acessor para retornar se o jogo foi finalizado */
  get showFinal(): boolean {
    return this._showFinal;
  }

  /** Retorna se o tabuleiro deve ser exibido ou não */
  get showTabuleiro(): boolean {
    return this._showTabuleiro;
  }

  /** Retorna o jogador que inicia o jogo */
  get getJogador(): number {
    return this._jogador;
  }

  /** Exibe o tabuleiro para iniciar o jogo */
  iniciarJogo(): void {
    this._showInicio = false;
    this._showTabuleiro = true;
  }
}
