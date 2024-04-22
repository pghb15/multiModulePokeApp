// import { Component, OnInit } from '@angular/core';
// import { AuthenticationService } from '../../../../core/services/authentication.service';
// import { PokemonService } from '../../../../core/services/pokemon.service';
// import { Pokemon } from '../../../../core/models/pokemon.model';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';


// @Component({
//   selector: 'app-pokemon-page',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './pokemon-page.component.html',
//   styleUrl: './pokemon-page.component.css'
// })
// export class PokemonPageComponent implements OnInit {

//   moduleName: string;
//   pokemonName: string;
//   favouritePokemons: Partial<Pokemon>[];

//   name: string;
//   counter: number;

//   fetchedPokemon: Pokemon | null;
//   error: boolean;
//   loading: boolean;
//   userToken: string | null;
//   constructor(private authenticationService: AuthenticationService, private pokemonService: PokemonService ) {
//     this.userToken = null;
//     this.moduleName = '';
//     this.pokemonName = '';
//     this.favouritePokemons = [];

//     this.name = '';
//     this.counter = 0;

//     this.fetchedPokemon = null;
//     this.error = false;
//     this.loading = false;

//   }

//   ngOnInit(): void {
//     this.authenticationService.authToken$.subscribe((value) => {
//       this.userToken = value;
//     });
//     this.pokemonService.moduleName.subscribe((value) => {
//       this.moduleName = value;
//     });

//     this.pokemonService.pokemonName.subscribe((value) => {
//       this.pokemonName = value;
//     });

//     this.pokemonService.favouritePokemons.subscribe((value) => {
//       this.favouritePokemons = value;
//     });

//   }

//   changeName(event: any) {
//     this.pokemonService.changeName(event.target.value);
//   }

//   addCharizard() {
//     this.pokemonService.addPokemonToArray({ id: 3, name: 'charizard' });
//   }

//   onSearchPokemon() {
//     this.fetchPokemonByName(this.name);
//     this.counter++;
//   }

//   fetchPokemonByName(name: string) {
//     this.fetchedPokemon = null;
//     this.error = false;
//     this.loading = true;

//     this.pokemonService.fetchPokemonByName(name).subscribe({
//       next: (value) => {
//         // Código que se ejecuta el recibir un valor
//         this.fetchedPokemon = value;
//       },
//       error: (error) => {
//         // Código de manejo de errores
//         this.error = !!error;
//       },
//       complete: () => {
//         // Código que se ejecuta pase lo que pase el recibir una respuesta
//         this.loading = false;
//       },
//     });
//   }

// }