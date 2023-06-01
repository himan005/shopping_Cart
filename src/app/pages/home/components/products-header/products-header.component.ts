import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',  
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort = 'desc';
  itemsShowCount =12;
  public searchTerm:string='';  

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  onSortUpdated(newSort:string):void{
    this.sort = newSort;
    this.sortChange.emit(newSort);    
  }

  onItemsUpdated(count:number):void{
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpdated(colsNum:number):void{
    this.columnsCountChange.emit(colsNum)
  }

  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

}
