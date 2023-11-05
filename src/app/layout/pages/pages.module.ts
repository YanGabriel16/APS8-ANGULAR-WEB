import { NgModule } from "@angular/core";
import { ListarLocaisComponent } from "./listar-locais/listar-locais.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { TagModule } from 'primeng/tag';

@NgModule({
    declarations: [
        ListarLocaisComponent,
    ],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        TagModule,
        FormsModule,
        PagesRoutingModule
    ],
    exports: [ListarLocaisComponent]
})
export class PagesModule { }