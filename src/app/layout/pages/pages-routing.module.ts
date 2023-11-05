import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListarLocaisComponent } from './listar-locais/listar-locais.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListarLocaisComponent }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }