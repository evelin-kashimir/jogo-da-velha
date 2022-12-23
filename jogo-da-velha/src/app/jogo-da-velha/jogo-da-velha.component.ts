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
}
