import { Component, OnDestroy, OnInit } from '@angular/core';
import { Local } from '../../models/local';
import { Subscription } from 'rxjs';
import { LocalService } from '../../service/local.service';
import { ModalAdicionarLocalComponent, ModalAtualizarLocalComponent, ModalExcluirLocalComponent } from '../../components';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { ClimaUtils } from '../../utils';

@Component({
  selector: 'app-listar-locais',
  templateUrl: './listar-locais.component.html'
})
export class ListarLocaisComponent implements OnInit, OnDestroy {
  locais: Local[] = [];
  first = 0;
  rows = 5;
  loading: boolean = false;

  inscricao: Subscription;

  constructor(public service: LocalService,
    private dialogService: DialogService,
    private router: Router) { }

  ngOnInit(): void {
    this.obterLocais();
  }

  obterLocais(): void {
    this.loading = true;
    setTimeout(() => {      
      this.inscricao = this.service.obterTodos().subscribe(res => {
        if (res != null && res.length > 0) {
          this.locais = res;        
          this.loading = false;
        }
      });
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

  onClickDashboard(entidade: Local): void {
    this.router.navigate([`/dashboard/${entidade.id}`]);
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
    const ref = this.dialogService.open(ModalExcluirLocalComponent, {
      header: 'Excluir Local',
      width: '30%',
      contentStyle: { 'max-height': '650px', overflow: 'auto' },
      data: {
        entidadeId: entidade.id
      }
    });
  }

  getClima(status: number) {
    return ClimaUtils.getClima(status);
  }

  getClimaIcon(status: number) {
    return ClimaUtils.getClimaIcon(status);
  }

  ngOnDestroy(): void {
    if (this.inscricao) {
      this.inscricao.unsubscribe();
    }
  }
}
