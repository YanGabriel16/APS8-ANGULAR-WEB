import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListarLocaisComponent } from './listar-locais/listar-locais.component';
import { DashboardLocalComponent } from './dashboard-local/dashboard-local.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListarLocaisComponent },
        { path: 'dashboard/:id', component: DashboardLocalComponent },
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }