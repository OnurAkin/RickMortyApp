import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-character-list-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-list-detail.component.html',
  styleUrl: './character-list-detail.component.css'
})
export class CharacterListDetailComponent implements OnInit {
  character: any; // Karakter nesnesi

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService // Karakter servisi enjekte edildi
  ) { }

  ngOnInit(): void {
    this.getCharacter(); // Karakter detaylarını alma metodu çağrıldı
  }

  getCharacter(): void {
    const id = this.route.snapshot.paramMap.get('id'); // URL'den karakter ID'sini alır
    if (id) {
      this.characterService.getCharacterById(id).subscribe(
        (data: any) => {
          this.character = data; // Karakter detayları alınır
        },
        (error: any) => {
          console.error('Error fetching character details', error); // Hata durumunda konsola yazdırılır
        }
      );
    }
  }
}