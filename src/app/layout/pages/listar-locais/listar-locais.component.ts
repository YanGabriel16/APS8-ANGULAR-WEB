import { Component, OnDestroy, OnInit } from '@angular/core';
import { Local } from '../../models/local';
import { Subscription } from 'rxjs';
import { LocalService } from '../../service/local.service';
import { ModalAdicionarLocalComponent, ModalAtualizarLocalComponent } from '../../components';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-listar-locais',
  templateUrl: './listar-locais.component.html',
  styleUrls: ['./listar-locais.component.scss']
})
export class ListarLocaisComponent implements OnInit, OnDestroy {
  locais: Local[] = [];
  first = 0;
  rows = 5;
  loading: boolean = false;

  inscricao: Subscription;

  constructor(public service: LocalService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.obterLocais();
  }

  obterLocais(): void {
    this.loading = true;
    setTimeout(() => {      
      this.inscricao = this.service.obterTodos().subscribe(res => {
        if (res != null && res.length > 0) {
          this.locais = res;        
        }
      });
      this.loading = false;
    }, 1000);
  }

  pageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
  }

  onClickAdicionarLocal(): void {
    const ref = this.dialogService.open(ModalAdicionarLocalComponent, {
      header: 'Adicionar Local',
      width: '30%',
      contentStyle: { 'max-height': '650px', overflow: 'auto' },
    });
  }

  onClickAtualizar(): void {
    this.obterLocais();
  }

  onClickGerenciar(entidade: Local): void {

  }

  onClickEditar(entidade: Local): void {
    const ref = this.dialogService.open(ModalAtualizarLocalComponent, {
      header: 'Editar Local',
      width: '30%',
      contentStyle: { 'max-height': '650px', overflow: 'auto' },
      data: {
        entidadeId: entidade.id
      }
    });
  }

  onClickDeletar(entidade: Local): void {
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

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }
}
