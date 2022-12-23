import { Component } from '@angular/core';
import { JogoDaVelhaService } from './shared';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.css']
})
export class JogoDaVelhaComponent {

  constructor(private jogoService: JogoDaVelhaService){ }

  ngOnInit(){
    this.jogoService.inicializar();
  }

  get showInicio(): boolean {
    return this.jogoService.showInicio;
  }

  get showTabuleiro(): boolean {
    return this.jogoService.showTabuleiro;
  }

  get showFinal(): boolean {
    return this.jogoService.showFinal;
  }

  iniciarPartida(): void {
    this.jogoService.iniciarJogo();
  }

  jogar(posX: number, posY: number): void {
    this.jogoService.jogar(posX, posY);
    console.log(posX, posY);
  }

  exibirX(posX: number, posY: number): boolean {
    return this.jogoService.exibirX(posX, posY);
  }

  exibirO(posX: number, posY: number): boolean {
    return this.jogoService.exibirO(posX, posY);
  }

  exibirVitoria(posX: number, posy: number) {
    return this.jogoService.exibirVitoria(posX, posy);
  }

}
