import { NgModule } from "@angular/core";
import { ListarLocaisComponent } from "./listar-locais/listar-locais.component";
import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
    declarations: [
        ListarLocaisComponent,
    ],
    imports: [
        PagesRoutingModule
    ],
    exports: [ListarLocaisComponent]
})
export class PagesModule { }