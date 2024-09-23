import { Component } from '@angular/core';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
  testimonials: Product[] | undefined;

  responsiveOptions: any[] | undefined;

  constructor() {}
  testProducts: Product[] = [
    {
      id: '1000',
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 100,
      status: 'INSTOCK',
    },
    {
      id: '1001',
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 200,
      status: 'LOWSTOCK',
    },
  ];

  ngOnInit() {
      this.testimonials = this.testProducts;

      this.responsiveOptions = [
          {
              breakpoint: '1199px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '991px',
              numVisible: 1,
              numScroll: 1
          },
          {
              breakpoint: '767px',
              numVisible: 1,
              numScroll: 1
          }
      ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'unknown';
    }
  }
}
