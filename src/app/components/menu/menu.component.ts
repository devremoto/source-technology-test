import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/state/category/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories!: Category[];
  $categories: Observable<Category[]> = this.categoryService.get();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }
}
