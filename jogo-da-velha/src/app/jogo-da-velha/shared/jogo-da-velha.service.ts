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
    return this._showInicio;
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

  /** Realiza uma jogada dado as coordenadas do tabuleiro */
  jogar(posX: number, posY: number){
    //jogada inválida
    if(this.tabuleiro[posX][posY] !== this.VAZIO || this.vitoria){
      return;
    }

    this.tabuleiro[posX][posY] = this._jogador;
    this.numMovimentos++;
    this.vitoria = this.fimJogo(posX, posY, this.tabuleiro, this._jogador);
    this._jogador = (this._jogador === this.X) ? this.O : this.X;

    if(!this.vitoria && this.numMovimentos < 9){
      this.cpuJogar();
    }

    //houve vitória
    if (this.vitoria !== false){
      this._showFinal = true;
    }

    //empate
    if (!this.vitoria && this.numMovimentos === 9) {
      this._jogador = 0;
      this._showFinal = true;
    }
  }

  /** Verifica e retorna se o jogo terminou */
  fimJogo(linha: number, coluna: number, tabuleiro: any, jogador: number) {
    let fim: any = false;

    //valida a linha
    if (tabuleiro[linha][0] === jogador &&
       tabuleiro[linha][1] === jogador &&
        tabuleiro[linha][2] === jogador) {
          fim = [[linha, 0], [linha, 1], [linha, 2]];
    }

    //valida a coluna
    if (tabuleiro[0][coluna] === jogador &&
      tabuleiro[1][coluna] === jogador &&
      tabuleiro[2][coluna] === jogador) {
        fim = [[0, coluna], [1, coluna], [2, coluna]];
    }

    //valida as diagonais
    if (tabuleiro[0][0] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro[2][2] === jogador) {
        fim = [[0, 0], [1, 1], [2, 2]];
    }

    if (tabuleiro[0][2] === jogador &&
      tabuleiro[1][1] === jogador &&
      tabuleiro[2][0] === jogador) {
        fim = [[0, 2], [1, 1], [2, 0]];
    }

    return fim;
  }

  /** Exibe a jogada da CPU */
  cpuJogar(): void {
    //verifica jogada de vitória
    let jogada: number[] = this.obterJogada(this.O);

    if (jogada.length <= 0) {
      //tenta jogar para evitar derrota
      jogada = this.obterJogada(this.X);
    }

    if (jogada.length <= 0) {
      //jogada aleatória
      let jogadas: any = [];
      for(let linha = 0; linha < this.TAM_TAB; linha++) {
        for(let col = 0; col < this.TAM_TAB; col++) {
          if (this.tabuleiro[linha][col] === this.VAZIO) {
            jogadas.push([linha, col]);
          }
        }
      }
      let rand = Math.floor((Math.random() * (jogadas.length - 1)));
      jogada = [jogadas[rand][0], jogadas[rand][1]];
    }

    this.tabuleiro[jogada[0]][jogada[1]] = this._jogador;
    this.numMovimentos++;
    this.vitoria = this.fimJogo(jogada[0], jogada[1], this.tabuleiro, this._jogador);
    this._jogador = (this._jogador === this.X) ? this.O : this.X;
  }

  /** Obtem a jogada do jogador da vez */
  obterJogada(jogador: number): number[] {
    let tabela = this.tabuleiro;
    for (let lin = 0; lin < this.TAM_TAB; lin++) {
      for (let col = 0; col < this.TAM_TAB; col++) {
        if (tabela[lin][col] !== this.VAZIO) {
          continue;
        }
        tabela[lin][col] = jogador;
        if (this.fimJogo(lin, col, tabela, jogador)) {
          return [lin, col];
        }
        tabela[lin][col] = this.VAZIO;
      }
    }
    return [];
  }

  /** Retorna se a peça X deve ser exibida para a coordenada informada */
  exibirX(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.X;
  }

  /** Retorna se a O deve ser exibida para a coordenada informada */
  exibirO(posX: number, posY: number): boolean {
    return this.tabuleiro[posX][posY] === this.O;
  }

  /** Retorna se a marcação de vitória deve ser exibida para a coordenada informada */
  exibirVitoria(posX: number, posY: number): boolean {
    let exibirVitoria: boolean = false;

    if (!this.vitoria) {
      return exibirVitoria;
    }

    for (let pos of this.vitoria) {
      if (pos[0] === posX && pos[1] === posY) {
        exibirVitoria = true;
        break;
      }
    }
    return exibirVitoria;
  }

  /** Inicializa um novo jogo, assim como exibe o tabuleiro. */
  novoJogo(): void {
    this.inicializar();
    this._showFinal = false;
    this._showInicio = false;
    this._showTabuleiro = true;
  }
}

