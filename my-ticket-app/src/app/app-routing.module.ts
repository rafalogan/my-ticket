import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule) },
  { path: 'events', loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule) },
  { path: 'event', loadChildren: () => import('./pages/event/event.module').then(m => m.EventModule) },
  {
    path: 'places',
    loadChildren: () => import('./pages/places/places.module').then(m => m.PlacesModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
