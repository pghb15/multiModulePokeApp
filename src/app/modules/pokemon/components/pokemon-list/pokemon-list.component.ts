import { Component, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../../../core/models/pokemon.model';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.component.html',
  imports: [PokemonCardComponent, CommonModule, RouterLink, FormsModule, MatButtonModule, MatFormFieldModule, MatOption, MatInputModule, MatSelectModule],
  styleUrls: ['./pokemon-list.component.css'],
  providers: [PokemonService], // Proporcionar PokemonUtils aquí
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  foundPokemon: Pokemon | undefined; // Pokemon encontrado
  pokemonLimit: number = 20; // Límite inicial de Pokémon a cargar
  pokemonOffset: number = 0; // Desplazamiento inicial
  filteredPokemons: Pokemon[] | null = [];

  constructor(private pokemonService: PokemonService) {}

  async ngOnInit(): Promise<void> {
    try {
      // Fetch Pokemon and save them in pokemon array
      const fetchedPokemons = await this.pokemonService.fetchPokemons(20, 0);
      console.log('Pokemons obtenidos:', fetchedPokemons);
      this.pokemons = fetchedPokemons;
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      // Manejar el error adecuadamente, por ejemplo, mostrando un mensaje de error al usuario.
    }
  }
  // Función para cargar más pokemon con el botón Load More
  async loadMorePokemons(): Promise<void> {
    this.pokemonOffset += this.pokemonLimit; // Incrementar el desplazamiento antes de cargar más Pokémon
    const fetchedPokemons = await this.pokemonService.fetchPokemons(
      this.pokemonLimit,
      this.pokemonOffset
    );
    // Concatenar los nuevos Pokémon al arreglo existente
    this.pokemons = this.pokemons.concat(fetchedPokemons);
  }

  searchValue: string = ''; // Variable para almacenar el valor de búsqueda

  async searchPokemon(): Promise<void> {
    // Verificar si se ha ingresado un valor de búsqueda
    if (this.searchValue != '') {
      // Lógica para buscar el Pokémon correspondiente según el valor de búsqueda
      this.foundPokemon = await this.pokemonService.searchPokemonByName(
        this.searchValue
      );

      // Checkear que se ha encontrado o no
      if (this.foundPokemon) {
        console.log('Pokémon encontrado:', this.foundPokemon);
      } else {
        console.log(
          'No se encontró ningún Pokémon con ese nombre:',
          this.searchValue
        );
      }
    } else {
      console.log('Ingrese un valor de búsqueda');
    }
  }
  // RESETEAR ELEMENTOS DE FILTRADO Y BUSQUEDA
  goBack() {
    this.foundPokemon = undefined; // Limpiar el Pokémon encontrado
    this.searchValue = ''; // Limpiar el valor de búsqueda
  }

  cleanFilter() {
    this.filteredPokemons = null; // Resetear el array de pokemons filtrados
  }
  //

  filterValue: string = '';

  async filterPokemonsByType(): Promise<void> {
    this.filteredPokemons = await this.pokemonService.fetchPokemonsByType(
      this.filterValue
    );
  }
}

/*this.pokemons: Es el array actual que contiene los Pokémon que ya se han cargado previamente.
fetchedPokemons: Es el array de los nuevos Pokémon que acabamos de cargar.
El metodo concat devuelve un nuevo array que contiene los elementos de los arrays concatenados.
*/
