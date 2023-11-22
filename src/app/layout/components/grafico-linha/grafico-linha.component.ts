import { Component, Input, OnInit } from '@angular/core';
import { DataUtils } from '../../utils';
import { ChaveValor, GraficoItem } from '../../models';

@Component({
  selector: 'app-grafico-linha',
  templateUrl: './grafico-linha.component.html',
  styleUrls: ['./grafico-linha.component.scss']
})
export class GraficoLinhaComponent implements OnInit {
  @Input() dados: GraficoItem[];
  @Input() mostrarTabelaGravidade: boolean = false;
  @Input() stepSize: number = 1;
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
            stepSize: this.stepSize
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
      datasets: []
    };

    this.dados.forEach(item => {
      this.data.datasets.push({
        label: item.nome,
        fill: true,
        borderColor: this.documentStyle.getPropertyValue(`--${item.cor}-500`),
        pointBackgroundColor: this.documentStyle.getPropertyValue(`--${item.cor}-500`),
        yAxisID: 'y',
        tension: 0,
        data: item.valor
      });
    });
  }

  configurarTabelas(): void {
    this.informacoes = [
      new ChaveValor("1", "Sem gravidade aparente (clima limpo)"),
      new ChaveValor("2", "Gravidade baixa (chuvas fracas para medianas)"),
      new ChaveValor("3", "Gravidade mediana/alerta (chuvas medianas para fortes)"),
      new ChaveValor("4", "Gravidade alta/perigo (chuvas pesadas, tempestade, tornados...)")
    ];
  }
}
