import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { Pokemon } from '../../../../core/models/pokemon.model';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
  imports: [CommonModule, PokemonListComponent],
})
export class PokemonCardComponent {
  @Input({required: true }) pokemon!: Pokemon;

  constructor() {
    this.pokemon = {
      id: 0,
      name: '',
      types: [],
      size: 0,
      abilities: [],
      imageUrl: '',
    }; // Inicializando como un objeto Pokemon vacío  }
  }
  //Recibe el tipo de pokemon a través del array (string)
  getBackgroundClass(type: string): string {
    switch (type) {
      case 'fire':
        return 'fire-background';
      case 'water':
        return 'water-background';
      case 'grass':
        return 'grass-background';
      case 'electric':
        return 'electric-background';
      default:
        return 'default-background';
    }
  }
}
