import { Component } from '@angular/core';
import { Packages } from 'src/app/core/interfaces/packages';
import { PackageSelectionService } from 'src/app/core/services/package-selection-service.service';

@Component({
  selector: 'app-new-add',
  templateUrl: './new-add.component.html',
  styleUrls: ['./new-add.component.css']
})
export class NewAddComponent {
  cards: Packages[] = [];

  constructor(private packageSelectionService: PackageSelectionService) {}

  ngOnInit() {
    // Load cards from local storage
    const storedCards = localStorage.getItem('adds');
    if (storedCards) {
      this.cards = JSON.parse(storedCards);
      // Initialize selected key to false for cards that don't have it
      this.cards.forEach((card) => {
        if (card.selected === undefined) {
          card.selected = false;
        }
      });
    }

    // Check and set selected cards
    const selectedAdd = this.packageSelectionService.getSelectedAddNumber();
    if (selectedAdd) {
      const selectedCard = this.cards.find((card) => card.id === selectedAdd);
      if (selectedCard) {
        selectedCard.selected = true;
      }
    }
  }

  toggleSelection(card: Packages) {
    this.cards.forEach((c) => {
      if (c.id !== card.id) {
        c.selected = false;
      }
    });
    card.selected = !card.selected;
    if (card.selected) {
      this.packageSelectionService.updateAddSelection(card.id);
      localStorage.setItem('Add_id', JSON.stringify(card.id));
    } else {
      this.packageSelectionService.updateAddSelection(null);
      localStorage.removeItem('Add_id');
    }
  }

  

}
