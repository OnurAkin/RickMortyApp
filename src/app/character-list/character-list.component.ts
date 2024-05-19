import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../character.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  title = 'character-list';
  characters: any[] = [];
  filteredCharacters: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  paginationRange: number = 2; 
  paginationStart: number = 1;
  paginationEnd: number = 1;
  selectedStatus: string = '';
  selectedGender: string = '';
  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters(this.currentPage);
  }

  getCharacters(page: number): void {
    this.characterService.getCharactersByPage(page).subscribe(
      (data: any) => {
        this.characters = data.results;
        this.filteredCharacters = this.characters; 
        this.totalPages = data.info.pages;


        this.updatePagination();
      },
      (error: any) => {
        console.error('Error fetching characters', error);
      }
    );
  }
  getCharacterStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'alive';
      case 'dead':
        return 'dead';
      default:
        return 'unknown';
    }
  }
  filterCharacters(): void {
   
    if (this.selectedStatus) {

  
      this.filteredCharacters = this.characters.filter(character => {
   
        return character.status.toLowerCase() === this.selectedStatus.toLowerCase();
      });
    } else if (this.selectedGender) {
 
      this.filteredCharacters = this.characters.filter(character => {
    
        return character.gender.toLowerCase() === this.selectedGender.toLowerCase();
      });
    } else {
      this.filteredCharacters = this.characters.filter(character =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getCharacters(page);
    }
  }

  updatePagination(): void {
    this.paginationStart = Math.max(1, this.currentPage - this.paginationRange);
    this.paginationEnd = Math.min(this.totalPages, this.currentPage + this.paginationRange);

    if (this.currentPage + this.paginationRange > this.totalPages) {
      this.paginationStart = Math.max(1, this.totalPages - 2 * this.paginationRange);
    }
  }
  getPaginationArray(): number[] {
    const pages = [];
    for (let i = this.paginationStart; i <= this.paginationEnd; i++) {
      pages.push(i);
    }
    return pages;
  }
}