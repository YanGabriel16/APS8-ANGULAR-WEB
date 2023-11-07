import { Component, OnDestroy, OnInit } from '@angular/core';
import { Local } from '../../models/local';
import { Subscription } from 'rxjs';
import { LocalService } from '../../service/local.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenWeatherResponse } from '../../models';
import { AirQualityResponse } from '../../models/airquality-response';

@Component({
  selector: 'app-dashboard-local',
  templateUrl: './dashboard-local.component.html'
})
export class DashboardLocalComponent implements OnInit, OnDestroy {
  localId: number;
  local: Local;
  clima: OpenWeatherResponse;
  qualidadeAr: AirQualityResponse;
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
          this.qualidadeAr = res.dados[0].qualidadeAr;  
          this.configurarTabelas();    
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
      new ChaveValor("Humidade:", `${this.clima.list[0].main.humidity.toFixed(2)}%`),
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

  pageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
  }

  getClima(status: number) {
    switch (status) {
      case 800:
      case 801:
      case 802:
      case 803:
      case 804:
        return 'success';

      case 200:
      case 230:
      case 231:
      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
      case 500:
      case 501:
      case 511:
        return 'info';
      case 201:
      case 211:
      case 232:
      case 502:
      case 511:
      case 520:
      case 521:
      case 522:
      case 600:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
      case 701:
      case 711:
      case 721:
      case 731:
      case 741:
      case 751:
      case 761:
      case 762:
      case 771:
        return 'warning';

      case 202:
      case 212:
      case 221:
      case 232:
      case 503:
      case 504:
      case 531:
      case 781:
        return 'danger';

      default:
        return 'info';
    }
  }

  getClimaIcon(status: number) {
    var tipo = this.getClima(status);
    switch(tipo){
      case 'success':
        return "pi pi-check";

      case 'info':
        return "pi pi-info-circle";

      case 'warning':
        return "pi pi-exclamation-triangle";

      case 'danger':
        return "pi pi-times";

      default:
        return "pi pi-info-circle";
    }
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

class ChaveValor {
  chave: string;
  valor: string;
  constructor(chave: string, valor: string) {
    this.chave = chave;
    this.valor = valor;
  }
}
