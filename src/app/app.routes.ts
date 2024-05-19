import { Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterListDetailComponent } from './character-list-detail/character-list-detail.component';

export const routes: Routes = [
    {path: '', component: CharacterListComponent},
{path: 'character/:id', component: CharacterListDetailComponent},
];
