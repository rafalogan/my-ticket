import { Component, OnInit } from '@angular/core';
import { Menu } from 'app/entities/menu.entity';
import { map, take } from 'rxjs';
import { CategoryService } from 'src/app/services';
import { onLog } from 'src/app/utils';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  categoriesMenu: Menu[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.findMenus();
    onLog('categories menu', this.categoriesMenu);
  }

  findMenus() {
    return this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe({
        next: data => {
          onLog('categories raw', data);
          this.categoriesMenu = data.map(item => new Menu(item));
          onLog('menus', this.categoriesMenu);
        },
        error: err => err
      });
  }
}
