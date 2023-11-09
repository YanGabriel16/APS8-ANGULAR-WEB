import { Component, Input, OnInit } from '@angular/core';
import { DataUtils } from '../../utils';
import { ChaveValor } from '../../models';

@Component({
  selector: 'app-grafico-linha',
  templateUrl: './grafico-linha.component.html',
  styleUrls: ['./grafico-linha.component.scss']
})
export class GraficoLinhaComponent implements OnInit {
  @Input() dados: number[];
  data: any;
  options: any;
  documentStyle: CSSStyleDeclaration;

  informacoes: ChaveValor[];

  ngOnInit() {
    this.configurarTabelas();
    this.documentStyle = getComputedStyle(document.documentElement);
    this.configurarGraficoData();
    this.configurarGraficoOptions();

  }

  configurarGraficoOptions(): void {
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');

    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary,
            suggestedMin: 0,
            suggestedMax: 4,
            stepSize: 1
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  configurarGraficoData(): void {
    this.data = {
      labels: DataUtils.obterUltimos15DiasString(),
      datasets: [
        {
          label: 'Clima',
          fill: true,
          borderColor: this.documentStyle.getPropertyValue('--blue-500'),
          pointBackgroundColor: this.documentStyle.getPropertyValue('--blue-500'),
          yAxisID: 'y',
          tension: 0,
          data: this.dados
        }
      ]
    };
  }

  configurarTabelas(): void {
    this.informacoes = [
      new ChaveValor("1", "Sem gravidade aparente (clima limpo/nublado)"),
      new ChaveValor("2", "Gravidade baixa (chuvas fracas para medianas)"),
      new ChaveValor("3", "Gravidade mediana/alerta (chuvas medianas para fortes)"),
      new ChaveValor("4", "Gravidade alta/perigo (chuvas pesadas, tempestade, tornados...)")
    ];
  }
}
