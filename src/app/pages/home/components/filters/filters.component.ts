import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import  { Subject, Subscription, takeLast, takeUntil } from 'rxjs'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.components.html'
})
export class FiltersComponent implements OnInit, OnDestroy {

  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  categories: string[] | undefined;

  unsubscribe$ = new Subject()

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
  this.storeService.getAllCategories().pipe(takeUntil(this.unsubscribe$))
    .subscribe((response: Array<string>) =>{
    this.categories = response;
    });
    } 

  onShowCategory(category:string):void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void{  
    this.unsubscribe$.next('')
    this.unsubscribe$.complete()
  }

}
