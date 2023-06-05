import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { VisualizarComponent } from './visualizar/visualizar.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'visualizar', component: VisualizarComponent},
  { path: 'detalhes/:nome', component: DetalhesProdutoComponent}
];

@NgModule({

  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
  bootstrap:[VisualizarComponent, CadastroComponent]
})
export class AppRoutingModule { }
