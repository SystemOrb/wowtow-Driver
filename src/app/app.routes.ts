import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { PublicComponent } from './components/pages/public/public.component';

const routes: Routes = [
    {
        path: '', component: MainComponent,
        canActivate: [],
        loadChildren: './components/pages/pages.module#PagesModule'
    },
    {
        path: 'public',
        component: PublicComponent,
        loadChildren: './components/pages/public/public.module#PublicModule'
    },
    {path: '**', component: NotFoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(routes, {useHash: false});
