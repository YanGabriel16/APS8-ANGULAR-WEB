import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Local } from '../../models/local';
import { Subscription } from 'rxjs';
import { LocalService } from '../../service/local.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChaveValor, GraficoItem, OpenWeatherResponse } from '../../models';
import { ClimaUtils, DataUtils } from '../../utils';

@Component({
  selector: 'app-dashboard-local',
  templateUrl: './dashboard-local.component.html'
})
export class DashboardLocalComponent implements OnInit, OnDestroy {
  graficoGravidade: GraficoItem[] = [];
  graficoNuvensUmidade: GraficoItem[] = [];
  graficoVento: GraficoItem[] = [];

  localId: number;
  local: Local;
  clima: OpenWeatherResponse;
  first = 0;
  rows = 5;
  loading: boolean = false;
  climaTabela: ChaveValor[] = [];
  ventoNuvensTabela: ChaveValor[] = [];

  inscricao: Subscription;

  get localDataDados(): Date {
    return new Date(this.local.dados[0].data);
  }

  constructor(public service: LocalService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.localId = params['id'];
      this.obterLocal();
    });
  }

  onClickVoltar(): void {
    this.router.navigate(['../']);
  }

  onClickAtualizar(): void {
    this.obterLocal();
  }

  obterLocal(): void {
    this.loading = true;
    setTimeout(() => {
      this.inscricao = this.service.obter(this.localId.toString()).subscribe(res => {
        if (res != null) {
          this.local = res;
          this.clima = res.dados[0].clima;
          this.configurarTabelas();
          
          this.graficoGravidade = [new GraficoItem("Gravidade do Clima", "red")];
          this.graficoNuvensUmidade = [
            new GraficoItem("Nuvens", "blue"),
            new GraficoItem("Umidade", "green"),
          ];
          this.graficoVento = [
            new GraficoItem("Velocidade em m/s", "purple"),
            new GraficoItem("Velocidade Max. em m/s", "pink"),
          ];
          this.configurarValorGraficoGravidade();
        }
      });
      this.loading = false;
    }, 1000);
  }

  configurarTabelas(): void {
    this.climaTabela = [
      new ChaveValor("Temperatura:", `${(this.clima.list[0].main.temp - 273.15).toFixed(2)}°C`),
      new ChaveValor("Temp. min:", `${(this.clima.list[0].main.temp_min - 273.15).toFixed(2)}°C`),
      new ChaveValor("Temp. max:", `${(this.clima.list[0].main.temp_max - 273.15).toFixed(2)}°C`),
      new ChaveValor("Umidade:", `${this.clima.list[0].main.humidity.toFixed(2)}%`),
      new ChaveValor("Pressão atmosférica:", `${this.clima.list[0].main.pressure.toFixed(2)} hPa`),
      new ChaveValor("Nivel do mar:", `${this.clima.list[0].main.sea_level.toFixed(2)}`),
    ];

    this.ventoNuvensTabela = [
      new ChaveValor("Nuvens:", `${this.clima.list[0].clouds.all.toFixed(2)}%`),
      new ChaveValor("Velocidade vento:", `${this.clima.list[0].wind.speed.toFixed(2)} m/s`),
      new ChaveValor("Direção do vento:", `${(this.clima.list[0].wind.deg).toFixed(2)}°`),
      new ChaveValor("Velocidade max rajadas de vento:", `${this.clima.list[0].wind.gust.toFixed(2)} m/s`),
    ];
  }

  configurarValorGraficoGravidade(): void {
    let ultimos15dias = DataUtils.obterUltimos15Dias();
    
    ultimos15dias.forEach(data => {
      let climaDia = this.local.dados.filter(x => DataUtils.formatarData(x.data) == DataUtils.formatarData(data));
      if (climaDia.length > 0) {
        let valorGravidadeDia = 0;
        let valorNuvensDia = 0;
        let valorUmidadeDia = 0;
        let valorVentoVelocidadeDia = 0;
        let valorVentoVelocidadeMaxDia = 0;

        climaDia.forEach(item => {
          valorGravidadeDia += ClimaUtils.getClimaGravidade(item.clima.list[0].weather[0].id);
          valorNuvensDia += item.clima.list[0].clouds.all;
          valorUmidadeDia += item.clima.list[0].main.humidity;
          valorVentoVelocidadeDia += item.clima.list[0].wind.speed;
          valorVentoVelocidadeMaxDia += item.clima.list[0].wind.gust;
        });

        let valorMediaGravidade = Math.ceil(valorGravidadeDia / climaDia.length);
        this.graficoGravidade[0].valor.push(valorMediaGravidade);

        let valorMediaNuvens = Math.ceil(valorNuvensDia / climaDia.length);
        this.graficoNuvensUmidade[0].valor.push(valorMediaNuvens);

        let valorMediaUmidade = Math.ceil(valorUmidadeDia / climaDia.length);
        this.graficoNuvensUmidade[1].valor.push(valorMediaUmidade);

        let valorMediaVelocidadeVento = Math.ceil(valorVentoVelocidadeDia / climaDia.length);
        this.graficoVento[0].valor.push(valorMediaVelocidadeVento);

        let valorMediaVelocidadeMaxVento = Math.ceil(valorVentoVelocidadeMaxDia / climaDia.length);
        this.graficoVento[1].valor.push(valorMediaVelocidadeMaxVento);
      } else {
        this.graficoGravidade[0].valor.push(null);
        this.graficoNuvensUmidade[0].valor.push(null);
        this.graficoNuvensUmidade[1].valor.push(null);
        this.graficoVento[0].valor.push(null);
        this.graficoVento[1].valor.push(null);
      }
    });
  }

  pageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
  }

  getClima(status: number) {
    return ClimaUtils.getClima(status);
  }

  getClimaIcon(status: number) {
    return ClimaUtils.getClimaIcon(status);
  }

  getDataPorDt(timestamp: number): Date {
    let data: Date = new Date(timestamp * 1000);
    return data;
  }

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }
}